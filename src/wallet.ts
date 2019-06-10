import '@pefish/js-node-assist'
import { PrivateKey, key, NodeClient, TransactionBuilder, TransactionHelper, ops } from '@pefish/hxjs'
import { Apis } from 'hxjs-ws'
import Ws from './ws'
import Rpc from './rpc'
import * as web3Utils from 'web3-utils'

export default class Wallet {

  addressPrefix: string = `HX`
  ws: Ws
  rpc: Rpc
  mainCurrencyDecimals: 5
  chainId: string = `2e13ba07b457f2e284dcfcbd3d4a3e4d78a6ed89a61006cdb7fdad6d67ef0b12`

  getAllBySeedAndIndex (seed: string, index: number): object {
    const privateKeyObj = PrivateKey.fromSeed(seed + index)
    const publicKeyObj = privateKeyObj.toPublicKey()
    return {
      publicKey: publicKeyObj.toString(),
      wif: privateKeyObj.toWif(),
      address: publicKeyObj.toAddressString(this.addressPrefix),
    }
  }

  getAllFromWif (wif: string): object {
    const privateKeyObj = PrivateKey.fromWif(wif)
    const publicKeyObj = privateKeyObj.toPublicKey()
    return {
      publicKey: publicKeyObj.toString(),
      address: publicKeyObj.toAddressString(this.addressPrefix),
    }
  }

  async initWs (url: string): Promise<void> {
    this.ws = new Ws()
    await this.ws.connect(url)
  }

  initRpc (url: string): void {
    this.rpc = new Rpc(url)
  }

  decodeMemo (memoHex: string): string {
    return web3Utils.hexToUtf8(`0x${memoHex}`)
  }

  async buildTransferTransaction (wif: string, toAddress: string, amount: string, assetId: string, memo: string = ``, fee: string = `100`): Promise<object> {
    const tr = new TransactionBuilder()
    const privKey = PrivateKey.fromWif(wif)
    const publicKeyObj = privKey.toPublicKey()
    const pubkey = publicKeyObj.toString()
    const operation = {
      fee: {
        amount: fee,
        asset_id: assetId
      },
      from: `1.2.0`,
      to: `1.2.0`,
      from_addr: publicKeyObj.toAddressString(this.addressPrefix),
      to_addr: toAddress,
      amount: {
        amount,
        asset_id: assetId
      },
      memo: {
        from: 'HX1111111111111111111111111111111114T1Anm',
        to: 'HX1111111111111111111111111111111114T1Anm',
        nonce: 0,
        message: TransactionHelper.hex_to_bytes(TransactionHelper.utf8ToHex(memo))
      },
    }

    tr.add_type_operation(`transfer`, operation)
    tr.set_expire_seconds(60)
    tr.add_signer(privKey, pubkey)

    const blockchainInfo = (await this.rpc.callRpc(`get_object`, ['2.1.0']))[0]
    tr.ref_block_num = blockchainInfo['head_block_number'] & 0xFFFF
    tr.ref_block_prefix = new Buffer(blockchainInfo['head_block_id'], 'hex').readUInt32LE(4)
    tr.tr_buffer = ops.transaction.toBuffer(tr)
    tr.sign(this.chainId)

    const txObj = ops.signed_transaction.toObject(tr)
    return {
      txId: tr.id(),
      txObj,
      txHex: JSON.stringify(txObj)
    }
  }
}

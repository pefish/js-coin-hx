import 'js-node-assist'
import { PrivateKey, key, NodeClient, TransactionBuilder, TransactionHelper, ops } from '@pefish/hxjs'
import { Apis } from 'bitsharesjs-ws'
import HttpRequestUtil from 'js-httprequest'
import ErrorHelper from 'p-js-error'

export default class Wallet {

  addressPrefix: string = `HX`
  apisInstance: any
  rpcUrl: string
  mainCurrencyDecimals: 5

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

  async connectWs (url: string): Promise<void> {
    this.apisInstance = Apis.instance(url, true)
    await this.apisInstance.init_promise
  }

  setRpcUrl (url: string) {
    this.rpcUrl = url
  }

  async closeWs (): Promise<void> {
    this.apisInstance && await this.apisInstance.close()
  }

  async callDbApi (method: string, params: Array<any>): Promise<any> {
    return await this.apisInstance.db_api().exec(method, params)
  }

  async callNetworkApi (method: string, params: Array<any>): Promise<any> {
    return await this.apisInstance.network_api().exec(method, params)
  }

  async callHistoryApi (method: string, params: Array<any>): Promise<any> {
    return await this.apisInstance.history_api().exec(method, params)
  }

  async callCryptoApi (method: string, params: Array<any>): Promise<any> {
    return await this.apisInstance.crypto_api().exec(method, params)
  }

  async callOrdersApi (method: string, params: Array<any>): Promise<any> {
    return await this.apisInstance.orders_api().exec(method, params)
  }

  async callRpc (method: string, params: Array<any>): Promise<any> {
    const result = await HttpRequestUtil.postJson(this.rpcUrl, null, { 'jsonrpc': '2.0', 'method': method, 'params': params, 'id': 1 })
    if (result['error']) {
      throw new ErrorHelper(result['error'])
    }
    return result[`result`]
  }

  /**
   * 获取钱包内所有交易
   * @returns {Promise<any>}
   */
  async listTransactions (afterBlockHeight: number, limit: number = -1): Promise<any> {
    return await this.callRpc(`list_transactions`, [afterBlockHeight, limit])
  }

  getAssetIdByCurrency (currency: string): string {
    if (currency === `HX`) {
      return `1.3.0`
    } else {
      throw new ErrorHelper(`currency not be supported`)
    }
  }

  async sendTransactionByRpc (txObj: object) {
    return await this.callRpc(`lightwallet_broadcast`, [txObj])
  }

  async buildTransferTransaction (wif: string, toAddress: string, amount: string, currency: string, memo: string = ``, fee: string = `100`): Promise<object> {
    const tr = new TransactionBuilder()
    const privKey = PrivateKey.fromWif(wif)
    const publicKeyObj = privKey.toPublicKey()
    const pubkey = publicKeyObj.toString()
    const assetId = this.getAssetIdByCurrency(currency)
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

    const blockchainInfo = (await this.callRpc(`get_object`, ['2.1.0']))[0]
    tr.ref_block_num = blockchainInfo['head_block_number'] & 0xFFFF
    tr.ref_block_prefix = new Buffer(blockchainInfo['head_block_id'], 'hex').readUInt32LE(4)
    tr.tr_buffer = ops.transaction.toBuffer(tr)
    tr.sign()

    const txObj = ops.signed_transaction.toObject(tr)
    return {
      txId: tr.id(),
      txObj,
      txHex: JSON.stringify(txObj)
    }
  }
}

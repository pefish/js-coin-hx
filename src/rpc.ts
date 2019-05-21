import { Apis } from 'hxjs-ws'
import HttpRequestUtil from 'js-httprequest'
import ErrorHelper from 'p-js-error'

export default class Rpc {
  rpcUrl: string

  constructor (url: string) {
    this.rpcUrl = url
  }

  async callRpc (method: string, params: Array<any>): Promise<any> {
    const result = await HttpRequestUtil.postJson(this.rpcUrl, null, { 'jsonrpc': '2.0', 'method': method, 'params': params, 'id': 1 })
    if (result['error']) {
      throw new ErrorHelper(result['error'])
    }
    return result[`result`]
  }

  async getChainInfo (): Promise<string> {
    return await this.callRpc(`info`, [])
  }

  async sendTransaction (txObj: object): Promise<string> {
    return await this.callRpc(`lightwallet_broadcast`, [txObj])
  }

  async getAddressBalance (address: string, assetId: string): Promise<string> {
    const data = await this.callRpc(`get_addr_balances`, [address])
    for (const { amount, asset_id } of data) {
      if (asset_id === assetId) {
        return amount.toString()
      }
    }
    return `0`
  }

  async getAssetInfo (assetNameOrId: string): Promise<any> {
    return await this.callRpc(`get_asset`, [assetNameOrId])
  }

  /**
   * 获取钱包内所有交易
   * @returns {Promise<any>}
   */
  async listTransactions (afterBlockHeight: number, limit: number = -1): Promise<any> {
    return await this.callRpc(`list_transactions`, [afterBlockHeight, limit])
  }

  async getTransaction (txId: string) {
    return await this.callRpc(`get_transaction`, [txId])
  }
}

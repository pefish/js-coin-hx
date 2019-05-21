import { Apis } from 'hxjs-ws'

export default class Ws {
  apisInstance: any

  async connect (url: string): Promise<void> {
    this.apisInstance = Apis.instance(url, true)
    await this.apisInstance.init_promise
  }

  async close (): Promise<void> {
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
}

export default class Ws {
    apisInstance: any;
    connect(url: string): Promise<void>;
    close(): Promise<void>;
    callDbApi(method: string, params: Array<any>): Promise<any>;
    callNetworkApi(method: string, params: Array<any>): Promise<any>;
    callHistoryApi(method: string, params: Array<any>): Promise<any>;
    callCryptoApi(method: string, params: Array<any>): Promise<any>;
    callOrdersApi(method: string, params: Array<any>): Promise<any>;
}

import 'js-node-assist';
export default class Wallet {
    addressPrefix: string;
    apisInstance: any;
    rpcUrl: string;
    mainCurrencyDecimals: 5;
    getAllBySeedAndIndex(seed: string, index: number): object;
    getAllFromWif(wif: string): object;
    connectWs(url: string): Promise<void>;
    setRpcUrl(url: string): void;
    closeWs(): Promise<void>;
    callDbApi(method: string, params: Array<any>): Promise<any>;
    callNetworkApi(method: string, params: Array<any>): Promise<any>;
    callHistoryApi(method: string, params: Array<any>): Promise<any>;
    callCryptoApi(method: string, params: Array<any>): Promise<any>;
    callOrdersApi(method: string, params: Array<any>): Promise<any>;
    callRpc(method: string, params: Array<any>): Promise<any>;
    /**
     * 获取钱包内所有交易
     * @returns {Promise<any>}
     */
    listTransactions(afterBlockHeight: number, limit?: number): Promise<any>;
    getAssetIdByCurrency(currency: string): string;
    sendTransactionByRpc(txObj: object): Promise<any>;
    buildTransferTransaction(wif: string, toAddress: string, amount: string, currency: string, memo?: string, fee?: string): Promise<object>;
}

export default class Rpc {
    rpcUrl: string;
    constructor(url: string);
    callRpc(method: string, params: Array<any>): Promise<any>;
    getChainInfo(): Promise<string>;
    sendTransaction(txObj: object): Promise<string>;
    getAddressBalance(address: string, assetId: string): Promise<string>;
    getAssetInfo(assetNameOrId: string): Promise<any>;
    /**
     * 获取钱包内所有交易
     * @returns {Promise<any>}
     */
    listTransactions(afterBlockHeight: number, limit?: number): Promise<any>;
    getTransaction(txId: string): Promise<any>;
}

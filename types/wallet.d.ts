import '@pefish/js-node-assist';
import Ws from './ws';
import Rpc from './rpc';
export default class Wallet {
    addressPrefix: string;
    ws: Ws;
    rpc: Rpc;
    mainCurrencyDecimals: 5;
    chainId: string;
    getAllBySeedAndIndex(seed: string, index: number): object;
    getAllFromWif(wif: string): object;
    initWs(url: string): Promise<void>;
    initRpc(url: string): void;
    decodeMemo(memoHex: string): string;
    buildTransferTransaction(wif: string, toAddress: string, amount: string, assetId: string, memo?: string, fee?: string, expireTime?: number): Promise<object>;
}

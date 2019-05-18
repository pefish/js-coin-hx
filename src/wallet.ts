import 'js-node-assist'
import { PrivateKey, key } from 'hxjs'

export default class Wallet {

  addressPrefix: string = `HX`

  getAllBySeedAndIndex (seed: string, index: number): object {
    let privateKeyObj = PrivateKey.fromSeed(seed + index)
    let publicKeyObj = privateKeyObj.toPublicKey()
    return {
      publicKey: publicKeyObj.toString(),
      wif: privateKeyObj.toWif(),
      address: publicKeyObj.toAddressString(this.addressPrefix),
    }
  }

  getAllFromWif (wif: string): object {
    let privateKeyObj = PrivateKey.fromWif(wif)
    let publicKeyObj = privateKeyObj.toPublicKey()
    return {
      publicKey: publicKeyObj.toString(),
      address: publicKeyObj.toAddressString(this.addressPrefix),
    }
  }
}

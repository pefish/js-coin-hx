import Wallet from './wallet'
import * as assert from 'assert'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

describe('WalletHelper', () => {
  let helper

  before(async () => {
    helper = new Wallet()
    helper.initRpc(`http://35.194.244.95:9992`)
  })

  // it('getAllBySeedAndIndex', async () => {
  //   try {
  //     const result = helper.getAllBySeedAndIndex('fsfghytjetynsty', 1)
  //     // global.logger.error('result', result)
  //     assert.strictEqual(result[`wif`], `5JBAVhG6tGSnF8nKXQKXFfTFANAS9L4hVnv4kyVuyj3zieJPyVj`)
  //     assert.strictEqual(result[`address`], `HXNT5Ay4niybnM3uHUi5XT1oi375rqEiR4yf`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('getAllFromWif', async () => {
  //   try {
  //     const result = helper.getAllFromWif(`5JBAVhG6tGSnF8nKXQKXFfTFANAS9L4hVnv4kyVuyj3zieJPyVj`)
  //     // global.logger.error('result', result)
  //     assert.strictEqual(result[`address`], `HXNT5Ay4niybnM3uHUi5XT1oi375rqEiR4yf`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('callDbApi', async () => {
  //   try {
  //     await helper.initWs(`ws://35.194.244.95:9991`)
  //     const result = await helper.ws.callDbApi(`get_block`, [3039651])
  //     await helper.ws.close()
  //     // global.logger.error('result', JSON.stringify(result))
  //     assert.strictEqual(result[`previous`], `002e61a2051ef07b906247e478128c1c42e3a8c2`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('listTransactions', async () => {
  //   try {
  //     const result = await helper.rpc.listTransactions(3063330)
  //     // global.logger.error('result', result)
  //     assert.strictEqual(result.length > 0, true)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('callRpc', async () => {
  //   try {
  //     const result = await helper.rpc.callRpc(`get_transaction`, [`f4ac51bd730f0949dbf502696ee7857a4ae58b81`])
  //     // global.logger.error('result', JSON.stringify(result))
  //     assert.strictEqual(result[`trxid`], `f4ac51bd730f0949dbf502696ee7857a4ae58b81`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('getAddressBalance', async () => {
  //   try {
  //     const result = await helper.rpc.getAddressBalance(`HXNXic6fbjpohL8Pe84xha8CUYjGy6dXB97N`, `1.3.0`)
  //     // global.logger.error('result', JSON.stringify(result))
  //     assert.strictEqual(result.gt_(0), true)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('getAssetInfo', async () => {
  //   try {
  //     const result = await helper.rpc.getAssetInfo(`HX`)
  //     // global.logger.error('result', JSON.stringify(result))
  //     assert.strictEqual(result[`id`], `1.3.0`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
  //
  // it('getTransaction', async () => {
  //   try {
  //     const result = await helper.rpc.getTransaction(`b34b4dfb854f310645dba6114ea04a4e30ab56f9`)
  //     // global.logger.error('result', JSON.stringify(result))
  //     // assert.strictEqual(result[`id`], `1.3.0`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })

  it('decodeMemo', async () => {
    try {
      const result = await helper.decodeMemo(`000000003834303237353037`)
      // global.logger.error('result', result)
      assert.strictEqual(result, `84027507`)

      const result1 = await helper.decodeMemo(`6e6968616f`)
      // global.logger.error('result1', result1)
      assert.strictEqual(result1, `nihao`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  // it('buildTransferTransaction', async () => {
  //   try {
  //     const result = await helper.buildTransferTransaction(
  //       `5JBAVhG6tGSnF8nKXQKXFfTFANAS9L4hVnv4kyVuyj3zieJPyVj`,
  //       `HXNXic6fbjpohL8Pe84xha8CUYjGy6dXB97N`,
  //       `10000`,
  //       `1.3.0`,
  //       `nihao`,
  //     )
  //     // global.logger.error('result', JSON.stringify(result))
  //     // const result1 = await helper.rpc.sendTransaction(result[`txObj`])
  //     // console.log(result1)
  //     // assert.strictEqual(result[`trxid`], `f50efd416df4a3bd9fde345186de6b56caa0f326`)
  //   } catch (err) {
  //     global.logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })
})
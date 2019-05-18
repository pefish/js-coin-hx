import Wallet from "./wallet";
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
  })

  it('getAllBySeedAndIndex', async () => {
    try {
      const result = await helper.getAllBySeedAndIndex('fsfghytjetynsty', 1)
      // global.logger.error('result', result)
      assert.strictEqual(result[`wif`], `5JBAVhG6tGSnF8nKXQKXFfTFANAS9L4hVnv4kyVuyj3zieJPyVj`)
      assert.strictEqual(result[`address`], `HXNT5Ay4niybnM3uHUi5XT1oi375rqEiR4yf`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAllFromWif', async () => {
    try {
      const result = await helper.getAllFromWif(`5JBAVhG6tGSnF8nKXQKXFfTFANAS9L4hVnv4kyVuyj3zieJPyVj`)
      // global.logger.error('result', result)
      assert.strictEqual(result[`address`], `HXNT5Ay4niybnM3uHUi5XT1oi375rqEiR4yf`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})
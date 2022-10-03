import { CurrencyExchange } from './exchange';
import { CurrencyExchangeSide } from './exchange-side';

describe('CurrencyExchangeSide', () => {
  describe('constructor', () => {
    it('Creates an instance', () => {
      const side = new CurrencyExchangeSide({
        store: {
          keys: 1,
          ref: 3,
          rec: 245,
          scrap: 1,
          craftWep: 0,
        },
        inventory: {
          keys: 1,
          ref: 57,
          rec: 3,
          scrap: 7,
          craftWep: 0,
        },
        exchange: {} as CurrencyExchange,
      });

      expect(side).toBeDefined();
      expect(side.value).toEqual(0);
      expect(side.store).toEqual({
        keys: 1,
        ref: 3,
        rec: 245,
        scrap: 1,
        craftWep: 0,
      });
      expect(side.inventory).toEqual({
        keys: 1,
        ref: 57,
        rec: 3,
        scrap: 7,
        craftWep: 0,
      });
    });
  });

  describe('currencyConversion', () => {
    it('Converts currencies', () => {
      const side = new CurrencyExchangeSide({
        store: {
          keys: 1,
          ref: 10,
          rec: 10,
          scrap: 10,
          craftWep: 5,
        },
        inventory: {
          keys: 2,
          ref: 12,
          rec: 11,
          scrap: 15,
          craftWep: 5,
        },
        exchange: {} as CurrencyExchange,
      });

      side.convertCurrencies();

      expect(side.store).toEqual({
        keys: 1,
        ref: 12,
        rec: 8,
        scrap: 0,
        craftWep: 1,
      });
    });
  });
});

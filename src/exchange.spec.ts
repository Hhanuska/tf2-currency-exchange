import { CurrencyExchange } from './exchange';

describe('CurrencyExchange', () => {
  describe('constructor', () => {
    it('Creates class', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 0, metal: 0 },
        keyPrice: 50,
      });

      expect(exchange).toBeDefined();
    });
  });

  describe('trade', () => {
    it('Has enough of each currency', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 2,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.33 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 2,
        rec: 1,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Needs to only use scrap', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 50,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.33 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 21,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Needs to only use craft weapons', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 20,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 0, metal: 1 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 18,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Uses keys', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 10,
          ref: 20,
          rec: 2,
          scrap: 23,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 1, metal: 14 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 1,
        ref: 14,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Tries to change with scrap', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 3,
          rec: 4,
          scrap: 5,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 1,
        },
        price: { keys: 0, metal: 0.72 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 0,
        rec: 2,
        scrap: 1,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 1,
      });
      expect(result.missing).toEqual(0);
    });

    it('Tries to change with rec', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 3,
          rec: 4,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 5,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.44 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 2,
        rec: 2,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 2,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Tries to change with ref', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 1,
          scrap: 5,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.44 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 3,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 1,
        scrap: 2,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Tries to change with keys', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 1,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 28,
          rec: 3,
          scrap: 9,
          craftWep: 0,
        },
        price: { keys: 0, metal: 20 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 1,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 28,
        rec: 3,
        scrap: 9,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Missing because no change currency', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 28,
          rec: 3,
          scrap: 9,
          craftWep: 0,
        },
        price: { keys: 0, metal: 20 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeFalsy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 3,
        rec: 1,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(150);
      expect(result.missingChange).toEqual(0);
    });

    it('Missing with rec change', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 2,
          rec: 2,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 1,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.44 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeFalsy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 2,
        rec: 1,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 1,
        craftWep: 0,
      });
      expect(result.missing).toEqual(1);
      expect(result.missingChange).toEqual(1);
    });

    it('Missing with ref change', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 3,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 1,
          scrap: 1,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.44 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeFalsy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 2,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 1,
        scrap: 1,
        craftWep: 0,
      });
      expect(result.missing).toEqual(4);
      expect(result.missingChange).toEqual(1);
    });

    it('Missing with keys change', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 1,
          ref: 3,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 25,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 0, metal: 20 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeFalsy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 25,
        rec: 1,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(153);
      expect(result.missingChange).toEqual(42);
    });

    it('Gets same result after calling trade twice', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 2,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.33 },
        keyPrice: 50,
      });

      const result1 = exchange.trade();
      const result2 = exchange.trade();

      expect(result1.buyer).toEqual(result2.buyer);
      expect(result1.seller).toEqual(result2.seller);
      expect(result1.missing).toEqual(result2.missing);
      expect(result1.missingChange).toEqual(result2.missingChange);
    });

    it('Uses the fewest items possible', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 3,
          rec: 3,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 5,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.88 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 3,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 1,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    describe('convertByIntent', () => {
      it('Converts by intent', () => {
        const exchange = new CurrencyExchange({
          buyInventory: {
            keys: 0,
            ref: 2,
            rec: 1,
            scrap: 0,
            craftWep: 0,
          },
          sellInventory: {
            keys: 0,
            ref: 0,
            rec: 0,
            scrap: 0,
            craftWep: 0,
          },
          price: { keys: 0, metal: 2.33 },
          keyPrice: 50,
        });

        const result = exchange.trade();

        const convertedSellResult = result.convertByIntent('sell');
        expect(convertedSellResult.our).toEqual(result.seller);
        expect(convertedSellResult.their).toEqual(result.buyer);
        expect(convertedSellResult.missing).toEqual(result.missing);
        expect(convertedSellResult.missingChange).toEqual(result.missingChange);
        expect(convertedSellResult.isComplete()).toEqual(result.isComplete());

        const convertedBuyResult = result.convertByIntent('buy');
        expect(convertedBuyResult.our).toEqual(result.buyer);
        expect(convertedBuyResult.their).toEqual(result.seller);
        expect(convertedBuyResult.missing).toEqual(result.missing);
        expect(convertedBuyResult.missingChange).toEqual(result.missingChange);
        expect(convertedBuyResult.isComplete()).toEqual(result.isComplete());
      });
    });

    it('Does not contain same item on both sides', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 0,
          ref: 2,
          rec: 2,
          scrap: 1,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 0,
          scrap: 2,
          craftWep: 0,
        },
        price: { keys: 0, metal: 2.55 },
        keyPrice: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 0,
        ref: 2,
        rec: 2,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 1,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });
  });

  describe('trade with different key prices', () => {
    // We may want to use different key price for our side
    // and their side. This is useful for bots that want to
    // buy keys at a lower price than they sell them, even during
    // other item trades.
    // For example, we may want to buy keys at 50 metal and sell
    // keys at 60 metal.
    // So if we sell a 5 ref item, but the buyer only has keys,
    // then we want to only add 45 ref plus our item for their 1 key.
    // Similarly, if we buy a 5 ref item, but we only have keys
    // then we want to add 55 ref plus the item for our 1 key.
    it('Tries to change with key, we are selling', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 15,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 28,
          rec: 3,
          scrap: 9,
          craftWep: 0,
        },
        price: { keys: 14, metal: 20 },
        keyPrice: 60,
        keyPriceChange: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 15,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 28,
        rec: 3,
        scrap: 9,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);

      const exchange2 = new CurrencyExchange({
        buyInventory: {
          keys: 1,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 28,
          rec: 3,
          scrap: 9,
          craftWep: 0,
        },
        price: { keys: 0, metal: 20 },
        keyPrice: 60,
        keyPriceChange: 50,
      });

      const result2 = exchange2.trade();

      expect(result2.isComplete()).toBeTruthy();
      expect(result2.buyer).toEqual({
        keys: 1,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result2.seller).toEqual({
        keys: 0,
        ref: 28,
        rec: 3,
        scrap: 9,
        craftWep: 0,
      });
      expect(result2.missing).toEqual(0);
    });

    it('Tries to change with keys, we are buying', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 15,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 38,
          rec: 3,
          scrap: 9,
          craftWep: 0,
        },
        price: { keys: 14, metal: 20 },
        // keyPrice: { buyer: 50, seller: 60 },
        keyPrice: 60,
        keyPriceChange: 60,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 15,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 38,
        rec: 3,
        scrap: 9,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);

      const exchange2 = new CurrencyExchange({
        buyInventory: {
          keys: 1,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 38,
          rec: 3,
          scrap: 9,
          craftWep: 0,
        },
        price: { keys: 0, metal: 20 },
        // keyPrice: { buyer: 50, seller: 60 },
        keyPrice: 60,
        keyPriceChange: 60,
      });

      const result2 = exchange2.trade();

      expect(result2.isComplete()).toBeTruthy();
      expect(result2.buyer).toEqual({
        keys: 1,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result2.seller).toEqual({
        keys: 0,
        ref: 38,
        rec: 3,
        scrap: 9,
        craftWep: 0,
      });
      expect(result2.missing).toEqual(0);
    });

    it('Tries to change with ref', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 1,
          ref: 3,
          rec: 1,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 0,
          ref: 0,
          rec: 1,
          scrap: 5,
          craftWep: 0,
        },
        price: { keys: 1, metal: 2.44 },
        keyPrice: 60,
        keyPriceChange: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 1,
        ref: 3,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 1,
        scrap: 2,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });

    it('Does not convert metal to keys', () => {
      const exchange = new CurrencyExchange({
        buyInventory: {
          keys: 3,
          ref: 75,
          rec: 0,
          scrap: 0,
          craftWep: 0,
        },
        sellInventory: {
          keys: 234,
          ref: 342,
          rec: 3,
          scrap: 5,
          craftWep: 0,
        },
        price: { keys: 1, metal: 55 },
        keyPrice: 60,
        keyPriceChange: 50,
      });

      const result = exchange.trade();

      expect(result.isComplete()).toBeTruthy();
      expect(result.buyer).toEqual({
        keys: 1,
        ref: 55,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.seller).toEqual({
        keys: 0,
        ref: 0,
        rec: 0,
        scrap: 0,
        craftWep: 0,
      });
      expect(result.missing).toEqual(0);
    });
  });
});

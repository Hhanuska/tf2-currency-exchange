import { CurrencyExchange } from './exchange';
import { ICurrencyStore, CurrencyName } from './types';

export class CurrencyExchangeSide {
  public value: number;
  public store: ICurrencyStore;
  public inventory: ICurrencyStore;
  public missingBeforeClean = 0;
  private exchange: CurrencyExchange;

  constructor({
    value = 0,
    store = {
      keys: 0,
      ref: 0,
      rec: 0,
      scrap: 0,
      craftWep: 0,
    },
    inventory,
    exchange,
  }: {
    value?: number;
    store?: ICurrencyStore;
    inventory: ICurrencyStore;
    exchange: CurrencyExchange;
  }) {
    this.value = value;
    this.store = store;
    this.inventory = inventory;
    this.exchange = exchange;
  }

  isComplete() {
    return this.value === 0;
  }

  fillCurrencySide() {
    const currencies: CurrencyName[] = [
      'keys',
      'ref',
      'rec',
      'scrap',
      'craftWep',
    ];
    currencies.forEach((currency) => {
      const amount = this.getAmountToFill(currency);

      this.store[currency] += amount;
      this.value -= amount * this.exchange.getCurrencyValue(currency);
    });

    return this;
  }

  selectChange() {
    const currencies: CurrencyName[] = ['scrap', 'rec', 'ref', 'keys'];

    return currencies.find((currency) => {
      const currencyValue = this.exchange.getCurrencyValue(currency);

      if (this.value >= currencyValue) {
        return false;
      }

      return this.inventory[currency] - this.store[currency] > 0;
    });
  }

  clean(changeCurrency: CurrencyName) {
    this.missingBeforeClean = this.value;

    const curreniesToClean = this.getCurrenciesToClean(changeCurrency);

    curreniesToClean.forEach((currency) => {
      const amount = this.store[currency];
      const value = amount * this.exchange.getCurrencyValue(currency);
      this.store[currency] = 0;
      this.value += value;
    });

    return this;
  }

  getCurrenciesToClean(changeCurrency: CurrencyName) {
    const changeValue = this.exchange.getCurrencyValue(changeCurrency);
    const currencies: CurrencyName[] = [
      'keys',
      'ref',
      'rec',
      'scrap',
      'craftWep',
    ];
    const thresholdIndex = currencies.findIndex((currency) => {
      return this.exchange.getCurrencyValue(currency) < changeValue;
    });

    return currencies.slice(thresholdIndex);
  }

  private getAmountToFill(currency: CurrencyName): number {
    const currencyValue = this.exchange.getCurrencyValue(currency);
    if (currencyValue > this.value) {
      return 0;
    }

    const howManyCanFit = Math.trunc(this.value / currencyValue);
    const amount = this.inventory[currency];

    return amount > howManyCanFit ? howManyCanFit : amount;
  }

  convertCurrencies() {
    const conversions = <const>[2, 3, 3];
    const canBeConverted = <const>['craftWep', 'scrap', 'rec', 'ref'];

    for (let i = 0; i < conversions.length; i++) {
      let changedSomething = false;

      conversions.forEach((conversionRate, j) => {
        const currency = canBeConverted[j];
        const convertTo = canBeConverted[j + 1];

        while (
          conversionRate <= this.store[currency] &&
          this.store[convertTo] < this.inventory[convertTo]
        ) {
          this.store[currency] -= conversionRate;
          this.store[convertTo] += 1;
          changedSomething = true;
        }
      });

      if (!changedSomething) {
        break;
      }
    }

    return this;
  }
}

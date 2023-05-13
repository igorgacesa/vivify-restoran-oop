class Meal {
  type: string;
  name: string;
  price: number;

  constructor(mealType: string, mealName: string) {
    this.type = mealType;
    this.name = mealName;
    this.price = this.generateMealPrice();
  }

  generateMealPrice(min: number = 300, max: number = 600) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

class Drink extends Meal {
  volume: number;

  constructor(mealType: string, mealName: string, drinkVolume: number) {
    super(mealType, mealName);
    this.volume = drinkVolume;
    this.price = this.generatePrice();
  }

  generatePrice(min: number = 150, max: number = 500) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

class Extra {
  name: string;
  price: number;

  constructor(extraName: string) {
    this.name = extraName;
    this.price = this.generateExtraPrice();
  }

  generateExtraPrice(min: number = 20, max: number = 100) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

// ---------------------------------------------------------------------------------------------

class Table {
  id: number;
  name: string;
  order: any;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.order = null;
  }

  makeOrder(array: any[]) {
    if (this.order === null) {
      this.order = new Order(this.id, array);
    } else {
      throw "Porudžbina postoji!";
    }
  }

  payOrder() {
    this.order.print();
    this.order = null;
  }
}

class Order {
  tableId: number;
  items: any;
  total: any;

  constructor(tableId: number, arr: Array<any>) {
    this.tableId = tableId;
    this.items = arr;
    this.total = this.calculateTotal();
  }

  calculateTotal() {
    let values;
    if (this.items !== null) {
      values = Object.values(this.items.map((obj: any) => obj.price));
      let initialValue = 0;
      const sum = values.reduce(
        (acc: any, curValue: any) => acc + curValue,
        initialValue
      );
      return sum;
    }
  }

  print() {
    console.log(
  `Porudžbina: 
    Datum: ${new Date().toLocaleString()} - sto broj ${this.tableId}
  Račun: 
    Datum: ${new Date().toLocaleString()} - sto broj ${this.tableId}, naplata: ${
      this.total
    } dinara.
    `);
  }
}

const t1 = new Table(1, "tbl1");
const t2 = new Table(2, "tbl2");
const t3 = new Table(3, "tbl3");
const t4 = new Table(4, "tbl4");

//-------------------------------------------------------------------------------

const pizza1 = new Meal("pizza", "capriciossa");
const pizza2 = new Meal("pizza", "siciliana");
const pizza3 = new Meal("pizza", "vulcano");
const pizza4 = new Meal("pizza", "margherita");

//-------------------------------------------------------------------------------

const pasta1 = new Meal("pasta", "italiana");
const pasta2 = new Meal("pasta", "carbonara");

//-------------------------------------------------------------------------------

const drink1 = new Drink("gazirano", "koka-kola", 0.5);
const drink2 = new Drink("gazirano", "juice", 0.3);
const drink3 = new Drink("negazirano", "juice", 0.5);
const drink4 = new Drink("negazirano", "juice", 0.25);
const drink5 = new Drink("negazirano", "water", 0.5);

//-------------------------------------------------------------------------------

const extra1 = new Extra("ketchup");
const extra2 = new Extra("origano");
const extra3 = new Extra("extra cheese");

//-------------------------------------------------------------------------------

t1.makeOrder([pizza1, extra1, extra2, pasta2, extra3, drink1, drink1]);
t2.makeOrder([pizza2, pasta2, drink4]);
t3.makeOrder([pizza1, pizza1, pizza1, extra1, extra1, drink2, drink3, drink5]);
console.log(t1.order);
console.log(t3.order);
t1.payOrder();
t3.payOrder();
t2.makeOrder([pizza1]);
// t2.payOrder();
// t2.makeOrder([pizza1]);

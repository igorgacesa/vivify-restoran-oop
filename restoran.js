"use strict";
class Meal {
    constructor(mealType, mealName) {
        this.type = mealType;
        this.name = mealName;
        this.price = this.generateMealPrice();
    }
    generateMealPrice(min = 300, max = 600) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
class Drink extends Meal {
    constructor(mealType, mealName, drinkVolume) {
        super(mealType, mealName);
        this.volume = drinkVolume;
        this.price = this.generatePrice();
    }
    generatePrice(min = 150, max = 500) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
class Extra {
    constructor(extraName) {
        this.name = extraName;
        this.price = this.generateExtraPrice();
    }
    generateExtraPrice(min = 20, max = 100) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
// ---------------------------------------------------------------------------------------------
class Table {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.order = null;
    }
    makeOrder(array) {
        if (this.order === null) {
            this.order = new Order(this.id, array);
        }
        else {
            throw "Porudžbina postoji!";
        }
    }
    payOrder() {
        this.order.print();
        this.order = null;
    }
}
class Order {
    constructor(tableId, arr) {
        this.tableId = tableId;
        this.items = arr;
        this.total = this.calculateTotal();
    }
    calculateTotal() {
        let values;
        if (this.items !== null) {
            values = Object.values(this.items.map((obj) => obj.price));
            let initialValue = 0;
            const sum = values.reduce((acc, curValue) => acc + curValue, initialValue);
            return sum;
        }
    }
    print() {
        console.log(`Porudžbina: 
    Datum: ${new Date().toLocaleString()} - sto broj ${this.tableId}
  Račun: 
    Datum: ${new Date().toLocaleString()} - sto broj ${this.tableId}, naplata: ${this.total} dinara.
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

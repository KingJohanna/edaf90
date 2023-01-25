'use strict';
/**
 * Reflection question 1
 * We don't need to store false values since it is the default value for booleans in js
 */
const { v4: uuidv4 } = require("uuid");
const imported = require("./inventory.js");

console.log('Sallad:', imported.inventory['Sallad']);

console.log('Object.keys():')
const names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n\nfor ... in:')
for (const name in imported.inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * the outputs are the same since the properties are enumerable and own
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv)
    .filter(k => inv[k][prop])
    .map(k => `<option value="${k}">${k}, ${inv[k].price} kr</option>`)
    .reduce((acc, curr) => acc + "\n" + curr, "")
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')

class Salad {
  static instanceCounter = 0;

  constructor(salad) {
    this.id = "salad_" + Salad.instanceCounter++;
    this.uuid = uuidv4();
    this.ingredients = {};

    if (typeof salad !== "undefined") {
      Object.assign(this.ingredients, 
        typeof salad === "string" ? JSON.parse(salad)['ingredients'] : salad['ingredients']
      );
    }
  }

  add(name, properties) { 
    this.ingredients[name] = properties;
    return this;
  }
  
  remove(name) {
    delete this.ingredients[name];
    return this;
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients)
    .reduce((acc, curr) => acc + curr.price, 0);
}

Salad.prototype.count = function (property) {
  return Object.values(this.ingredients)
    .filter(v => v[property]).length;
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

/* Reflection question 3

A class is represented as a function. Every object has a prototype which points to a map where 
attributes can be assigned that should be able to be accessed from all objects created 
with that function as the constructor. The prototype chain ends with Object.prototype (null). 

*/

console.log('\n--- Assignment 4 ---------------------------------------')

const objectCopy = new Salad(myCaesarSalad);
const json = JSON.stringify(myCaesarSalad);
const jsonCopy = new Salad(json);
console.log('myCesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('copy from object\n' + JSON.stringify(objectCopy));
console.log('copy from json\n' + JSON.stringify(jsonCopy));
objectCopy.add('Gurka', imported.inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('med gurka kostar den ' + objectCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad {
  
  add(name, properties, size=1) {
    let propCopy = Object.assign({}, properties);
    propCopy['size'] = size + (this.ingredients[name] ? this.ingredients[name]['size'] : 0); 
    this.ingredients[name] = propCopy;
    return this;
  }

  getPrice() {
    return Object.values(this.ingredients)
      .reduce((acc, curr) => acc + curr.price * curr.size, 0);
  }
}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
 * Reflection question 4
 * Static properties are stored in the class and not the prototype
 */
/**
 * Reflection question 5
 * We can use Object.defineProperty and set writable to false
 */
/**
 * Reflection question 6
 * Hashtag before the property makes it private
 */

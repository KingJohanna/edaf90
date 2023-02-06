const { v4: uuidv4 } = require("uuid");

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

  Salad.prototype.getPrice = function () {
    return Object.values(this.ingredients)
      .reduce((acc, curr) => acc + curr.price, 0);
  }
  
  Salad.prototype.count = function (property) {
    return Object.values(this.ingredients)
      .filter(v => v[property]).length;
  }

  export default Salad;
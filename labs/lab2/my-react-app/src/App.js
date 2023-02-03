import inventory from "./inventory.ES6";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import "font-awesome/css/font-awesome.min.css";

// export NODE_OPTIONS=--openssl-legacy-provider

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <span className="fs-4">Min egen salladsbar</span>
        </header>

        <div className="vstack gap-3">
          <ComposeSalad inventory={inventory} updateCart={setCart} />
          <ViewOrder cart={cart} />
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          EDAF90 - Webbprogrammering
        </footer>
      </div>
    </div>
  );
}

export default App;

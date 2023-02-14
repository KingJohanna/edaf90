// import oldInventory from "./inventory.ES6";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import NotFound from "./NotFound";
import ViewIngredient from "./ViewIngredient";

// export NODE_OPTIONS=--openssl-legacy-provider

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Grönt & Rått</span>
    </header>
  );
}

function NavBar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="">
          Beställ
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="cart">
          Kundkorg
        </NavLink>
      </li>
    </ul>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - Webbprogrammering
    </footer>
  );
}

async function fetchIngredient(type, name = "") {
  let url = "http://localhost:8080/" + type + "/" + name;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}

function App() {
  const [inventory, setInventory] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const types = ["foundations", "proteins", "extras", "dressings"];

  useEffect(() => {
    Promise.all(
      types.map(type => fetchIngredient(type)
        .then(category => Promise.all(
          category.map(ingredient => fetchIngredient(type, ingredient)
            .then(data => ({ [ingredient]: { ...data } })) // use ingredient as key
          ))
        )
      )
    ).then(allIngredients => {
      setInventory(allIngredients.reduce( // unpack into single dictionary
        (acc, curr) => ({ ...acc, ...Object.assign({}, ...curr) }), // Object.assign merges into single object
        {}
      ));
    });
  }, []); // empty dependency array arg in the end so that the effect will only run once

  return (
    <div className="App">
      <div className="container py-4">
        <div className="vstack gap-3">
          <Header />
          <NavBar />
          <Routes>
            <Route
              path=""
              element={
                <ComposeSalad
                  inventory={inventory}
                  updateCart={setCart}
                  navigate={navigate}
                />
              }
            />
            <Route path="cart" element={<ViewOrder cart={cart} />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="view-ingredient/:name"
              element={<ViewIngredient inventory={inventory} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

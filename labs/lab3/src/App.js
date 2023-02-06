import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';
import { Link } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4"> Gott & Blått </span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
    </footer>
  );
}

function Navbar() {
  return(
    <ul className='nav nav-bar' >
      <li className='nav-item' >
        <Link className='nav-link' to='/view-order' >
          <Icon.Cart/>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/compose-salad' >
          Komponera sallad
        </Link>
      </li>
    </ul>
  );
}

function App()
{
  const [cart, setCart] = useState([]);

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <ViewOrder cart={cart} setCart={setCart} />
      <ComposeSalad inventory={inventory} setCart={setCart} />
      <Footer />
    </div>
  );
  }

export default App;

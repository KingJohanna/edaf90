import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';
import { Link, Route, Routes, useParams } from "react-router-dom";
import * as CiIcon from 'react-icons/ci';
import * as IoIcon from 'react-icons/io5';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";

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
  return (
    <ul className='nav nav-bar' >
      <li className='nav-item' >
        <Link className='nav-link' to='/view-order' >
          <Icon.Cart />
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

function ViewIngredient(props) {
  let { name } = useParams();

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3 my-3">
        <h3 className='d-flex flex-row'>
          <div className='justify-content-left'>{name}</div>
          <div className='px-3'>
            {props.inventory[name].vegan ? <IoIcon.IoLeafOutline /> : <></>}
            {props.inventory[name].gluten ? < CiIcon.CiWheat /> : <></>}
            {props.inventory[name].lactose ? < CiIcon.CiGlass /> : <></>}
          </div>
        </h3>
        <div>
          <ul style={{ listStyle: "none" }}>
            <li>
              <IoIcon.IoLeafOutline />
              = Veganskt
            </li>
            <li>
              <CiIcon.CiWheat />
              = Innehåller gluten
            </li>
            <li>
              <CiIcon.CiGlass />
              = Innehåller laktos
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Routes >
        <Route path="" element={<p className='p-5'>Välkommen till Gott & Blått! Börja komponera en sallad.</p>} />
        <Route path="view-order" element={<ViewOrder cart={cart} setCart={setCart} />} />
        <Route path="compose-salad" element={<ComposeSalad inventory={inventory} setCart={setCart} navigate={navigate} />} />
        <Route path="/view-ingredient/:name" element={<ViewIngredient inventory={inventory} />} />
        <Route path="*" element={<p>:(</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

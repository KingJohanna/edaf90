import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';

function App()
{
  const [cart, setCart] = useState([]);

  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4"> Gott & Blått </span>
    </header>

    <ViewOrder cart={cart} setCart={setCart} />
    <div className='mb-5'>
      <ComposeSalad inventory={inventory} setCart={setCart} />
    </div>

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
  );
  }

export default App;

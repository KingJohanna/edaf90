import { useState } from 'react';
import Salad from './Salad';

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [foundation, setFoundation] = useState('Sallad + Pasta'); 
  const [protein, setProtein] = useState('Kycklingfilé');
  const [extra, setExtra] = useState({});
  const [dressing, setDressing] = useState('Pesto');

  const handleSelectedFoundation = e => {
    setFoundation(e.target.value);
    console.log(e.target.value + " vald som bas.");
  };

  const handleSelectedProtein = e => {
    setProtein(e.target.value);
    console.log(e.target.value + " vald som protein.");
  };

  const handleSelectedExtra = e => { 
    setExtra(oldState => copyAndUpdate(oldState, e.target.value, e.target.checked))
    console.log(e.target.value + " är" + (e.target.checked ? "" : " ej") + " tillagd i salladen");
    console.log(extra);
  }

  const handleSelectedDressing = e => {
    setDressing(e.target.value);
    console.log(e.target.value + " vald som dressing.");
  }

  const handleOrder = e => {
    e.preventDefault();

    let salad = new Salad();
    salad.add(foundation, props.inventory[foundation]);
    salad.add(protein, props.inventory[protein]);
    Object.keys(extra).map(ingredient => extra[ingredient] ? salad.add(ingredient, props.inventory[ingredient]) : {});
    salad.add(dressing, props.inventory[dressing]);

    props.setCart(oldState => [...oldState, salad]);

    restore();
  }

  function copyAndUpdate(oldState, name, checked) {
    let temp = {};
    Object.assign(temp, oldState);
    temp[name] = checked;
    return temp;
  }

  function restore() {
    setFoundation("Sallad + Pasta");
    setProtein("Kycklingfilé");
    setExtra({});
    setDressing("Pesto");
  }

  return (
    
    <div className="container col-12">
      <form onSubmit={handleOrder}>
        <div className="row h-200 p-5 bg-light border rounded-3 my-3">
        <h2> Gör din sallad </h2>
          <div className='py-3 d-flex flex-row justify-content-left'>
            <div>
              <h4>Välj bas</h4>
              <select id="selectFoundation" onChange={handleSelectedFoundation} required={true} value={foundation}>
                {foundations.map(name => <option key={name} value={name} className="col-4">{name}</option>)}
              </select>
            </div>
            <div className='px-4'>
              <h4>Välj protein</h4>
              <select id="selectProtein" onChange={handleSelectedProtein} required={true} value={protein}>
                {proteins.map(name => <option key={name} value={name} className="col-4">{name}</option>)}
              </select>
            </div>
          </div>

          <h4>Välj tillbehör</h4>
            {extras.map(name => <div key={name} className="col-4">
              <label>
                <input type='checkbox' onChange={handleSelectedExtra} value={name} checked={extra[name] | false}/>
                {name}
              </label>
            </div>)}

          <div className='d-flex justify-content-left'>
            <div className='py-3'>
              <h4>Välj dressing</h4>
              <select id="selectDressing" onChange={handleSelectedDressing} required={true} value={dressing}>
                {dressings.map(name => <option key={name} value={name} className="col-4">{name}</option>)}
              </select>
            </div>
          </div>

          <div className='d-flex justify-content-center pt-2'>
            <input type='submit' value="Lägg till i varukorg"></input>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ComposeSalad;
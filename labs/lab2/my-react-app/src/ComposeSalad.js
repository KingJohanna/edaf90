import React, { useState, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Salad from "./Salad";
import { NavLink } from "react-router-dom";

function SelectForm({ ingredients, prompt, set, startVal }) {
  return (
    <div className="form-group">
      <select
        className="form-select"
        onChange={event => {
          set(event.target.value); // setFoundation is async so this will print the last value
          event.target.parentElement.classList.add("was-validated");
        }}
        required
        value={startVal}
      >
        <option value="">{prompt}</option>
        {ingredients.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">Välj en giltig ingrediens!</div>
      <div className="valid-feedback">Mums!</div>
    </div>
  );
}

function copyAndUpdate(oldState, v, b) {
  let temp = {};
  temp = Object.assign(temp, oldState);
  temp[v] = b;
  return temp;
}

function ComposeSalad(props) {
  let foundations = useMemo(() => {
    return Object.keys(props.inventory).filter(
      name => props.inventory[name].foundation
    );
  });
  let proteins = useMemo(() => {
    return Object.keys(props.inventory).filter(
      name => props.inventory[name].protein
    );
  });
  let extras = useMemo(() => {
    return Object.keys(props.inventory).filter(
      name => props.inventory[name].extra
    );
  });
  let dressings = useMemo(() => {
    return Object.keys(props.inventory).filter(
      name => props.inventory[name].dressing
    );
  });

  const [foundation, setFoundation] = useState();
  const [protein, setProtein] = useState();
  const [extra, setExtra] = useState({});
  const [dressing, setDressing] = useState();

  const composeSalad = useRef(null);

  return (
    <div className="container col-12">
      <form
        ref={composeSalad}
        noValidate={true}
        onSubmit={e => {
          if (e.target.checkValidity()) {
            let salad = new Salad();
            salad.add(foundation, props.inventory[foundation]);
            salad.add(protein, props.inventory[protein]);
            Object.keys(extra).map(ingredient => {
              if (extra[ingredient]) {
                salad.add(ingredient, props.inventory[ingredient]);
              }
              return null; // return value required by map
            });
            salad.add(dressing, props.inventory[dressing]);
            props.updateCart(oldCart => [...oldCart, salad]);
            props.navigate("/cart");
            e.target.classList.add("was-validated");
            composeSalad.current.reset();
          } else {
            alert("Välj giltiga ingredienser!");
          }
          e.preventDefault();
        }}
      >
        <div className="row h-200 p-5 bg-light border rounded-3">
          <div className="vstack gap-3">
            <h2>Välj innehåll</h2>
            <SelectForm
              ingredients={foundations}
              prompt="Välj bas"
              set={setFoundation}
              startVal={foundation}
            />
            <SelectForm
              ingredients={proteins}
              prompt="Välj protein"
              set={setProtein}
              startVal={protein}
            />
            <h6>Välj tillbehör</h6>
            <div className="form-check">
              {extras.map(name => (
                <div
                  key={"div-" + name}
                  className="form-check form-check-inline"
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                    value={name}
                    checked={extra[name] | false}
                    onChange={event => {
                      setExtra(oldState =>
                        copyAndUpdate(
                          oldState,
                          event.target.value,
                          event.target.checked
                        )
                      );
                    }}
                  />
                  <NavLink to={`/view-ingredient/${name}`}>
                    <label className="form-check-label">{name}</label>
                  </NavLink>
                </div>
              ))}
            </div>
            <SelectForm
              ingredients={dressings}
              prompt="Välj dressing"
              set={setDressing}
              startVal={dressing}
            />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-25">
                Lägg till i kundkorg
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComposeSalad;

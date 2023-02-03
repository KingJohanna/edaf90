import React, { useState, useMemo, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Salad from "./Salad";

function SelectForm({ ingredients, prompt, set }) {
  return (
    <select
      className="form-select"
      onChange={event => {
        set(event.target.value); // setFoundation is async so this will print the last value
      }}
    >
      <option defaultValue={false}>{prompt}</option>
      {ingredients.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
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

  const [foundation, setFoundation] = useState("");
  const [protein, setProtein] = useState("");
  const [extra, setExtra] = useState({});
  const [dressing, setDressing] = useState("");

  const composeSalad = useRef(null);

  return (
    <div className="container col-12">
      <form
        ref={composeSalad}
        onSubmit={e => {
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
          e.preventDefault();
          setFoundation("");
          setProtein("");
          setExtra({});
          setDressing("");
          composeSalad.current.reset();
        }}
      >
        <div className="row h-200 p-5 bg-light border rounded-3">
          <div className="vstack gap-3">
            <h2>Välj innehåll</h2>
            <SelectForm
              ingredients={foundations}
              prompt="Välj bas"
              set={setFoundation}
            />
            <SelectForm
              ingredients={proteins}
              prompt="Välj protein"
              set={setProtein}
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
                  <label className="form-check-label">{name}</label>
                </div>
              ))}
            </div>
            <SelectForm
              ingredients={dressings}
              prompt="Välj dressing"
              set={setDressing}
            />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-25">
                Beställ
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ComposeSalad;

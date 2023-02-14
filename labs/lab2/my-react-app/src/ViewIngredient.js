import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";

function ViewIngredient(props) {
  let { name } = useParams();
  if (!props.inventory[name]) {
    return (
        <div className="container py-4">
            <h2>Kunde inte hitta sidan!</h2>
        </div>
    );
  }
  let lactose = props.inventory[name].lactose;
  let vegan = props.inventory[name].vegan;
  let gluten = props.inventory[name].gluten;

  return (
    <div className="container py-4">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <div className="d-flex flex-column gap-3">
          <h5>{name}</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Laktos
              {lactose ? <span className="badge bg-danger">Innehåller</span> : <span className="badge bg-success">Innehåller ej</span>}
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Gluten 
              {gluten ? <span className="badge bg-danger">Innehåller</span> : <span className="badge bg-success">Innehåller ej</span>}
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Veganskt
              {vegan ? <span className="badge bg-success">Ja</span> : <span className="badge bg-danger">Nej</span>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewIngredient;
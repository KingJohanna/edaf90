import React from "react";

function SaladCard(uuid, price, foundation, protein, extras, dressing) {
  return (
    <div key={uuid} className="card">
      <div className="card-header">{uuid}, {price} SEK</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{foundation}</li>
        <li className="list-group-item">{protein}</li>
        <li className="list-group-item">{extras.join(", ")}</li>
        <li className="list-group-item">{dressing}</li>
      </ul>
    </div>
  );
}

function ViewOrder(props) {
  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <div className="vstack gap-3">
          <h2>Din kundkorg</h2>
          {props.cart.map(salad => {
            let foundation = Object.keys(salad.ingredients).filter(
              name => salad.ingredients[name].foundation
            );
            let protein = Object.keys(salad.ingredients).filter(
              name => salad.ingredients[name].protein
            );
            let dressing = Object.keys(salad.ingredients).filter(
              name => salad.ingredients[name].dressing
            );
            let extras = Object.keys(salad.ingredients).filter(
              name => salad.ingredients[name].extra
            );

            return SaladCard(salad.uuid, salad.getPrice(), foundation, protein, extras, dressing);
          })}
          <h4>
            Pris: {props.cart.reduce((acc, salad) => acc + salad.getPrice(), 0)}{" "}
            SEK
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;

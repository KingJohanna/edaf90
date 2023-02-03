import React from "react";

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

            return (
              <div key={salad.uuid}>
                <h6>
                  Bas: {foundation} <br />
                  Protein: {protein} <br />
                  Tillbehör: {extras.join(", ")} <br />
                  Dressing: {dressing} <br />
                </h6>
                <hr className="rounded" />
              </div>
            );
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

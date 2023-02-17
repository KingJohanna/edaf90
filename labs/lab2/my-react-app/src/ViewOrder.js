import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function OrderConfirm(order_nr, stat, time, salad_nr, price) {
  return (
    <div key={order_nr} className="card">
      <div className="card-header">Bekräftelse: {order_nr}</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Status: {stat}</li>
        <li className="list-group-item">Tid: {time}</li>
        <li className="list-group-item">Antal sallader: {salad_nr}</li>
        <li className="list-group-item">Pris: {price}</li>
      </ul>
    </div>
  );
}

function SaladCard(uuid, price, foundation, protein, extras, dressing) {
  return (
    <div key={uuid} className="card">
      <div className="card-header">
        {uuid}, {price} SEK
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{foundation}</li>
        <li className="list-group-item">{protein}</li>
        <li className="list-group-item">{extras.join(", ")}</li>
        <li className="list-group-item">{dressing}</li>
      </ul>
    </div>
  );
}

async function orderSalads(order) {
  const url = "http://localhost:8080/orders";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order)
  };
  return fetch(url, requestOptions).then(response => {
    if (!response.ok) {
      throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
  });
}

function ViewOrder(props) {
  const [order, setOrder] = useState(null);

  const handleButtonClick = () => {
    let salads = props.cart.map(salad => {
      return Object.keys(salad.ingredients);
    });

    orderSalads(salads).then(response => {
      setOrder(
        OrderConfirm(
          response.uuid,
          response.status,
          response.timestamp,
          response.order.length,
          response.price
        )
      );
      props.updateCart([]);
    });
  };

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

            return SaladCard(
              salad.uuid,
              salad.getPrice(),
              foundation,
              protein,
              extras,
              dressing
            );
          })}
          {props.cart.length > 0 ? (
            <h4>
              Pris:{" "}
              {props.cart.reduce((acc, salad) => acc + salad.getPrice(), 0)} SEK
            </h4>
          ) : (
            <p>Din kundkorg är tom</p>
          )}

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary w-25"
              disabled={props.cart.length === 0}
              onClick={handleButtonClick}
            >
              Beställ
            </button>
          </div>
          {order}
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;

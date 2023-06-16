import React from "react";

function Card(props) {
  return (
    <div key={props.id} className="container">
      <div className="secondary">
        <img src={props.image} alt="ImageNotFound" />
        <p>{props.title}</p>
      </div>
    </div>
  );
}

export default Card;

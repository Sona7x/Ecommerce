import React from "react";

const ProductCard = (props) => {
  return (
    <div key={props.id} className="bg-red-300 m-7">
      <img src={props.item.images[0]} alt={props.item.title} />
      {props.item.title}
      {props.item.description}
      {props.item.price}
    </div>
  );
};

export default ProductCard;

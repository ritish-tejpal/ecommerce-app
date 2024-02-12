import React, { Component } from 'react';
import axios from 'axios';

function Product(props) {
  const getProducts = () => {
    axios.post("http://127.0.0.1:8000/products/")
    .then( 

    )
  }

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <p>{props.price}</p>
      <p>{props.quantity}</p>
      <p>{props.category}</p>
    </div>
  );
}



export default Product;
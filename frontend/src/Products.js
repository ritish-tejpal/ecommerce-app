// Create a page for products that will show all products in the database

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Product(props) {
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
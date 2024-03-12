import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([{}]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const increaseQuantity = (id, quantity) => {
      const token = localStorage.getItem("token");
      axios.post('http://127.0.0.1:8000/shop/cart/items/', {
        product: id,
        quantity: quantity + 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const decreaseQuanity = (id, quantity) => {
      if(quantity === 1) return deleteItem(id);

      const token = localStorage.getItem("token");
      axios.post('http://127.0.0.1:8000/shop/cart/items/', {
        product: id,
        quantity: quantity - 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteItem = (id) => {
      const token = localStorage.getItem("token");
      axios.delete('http://127.0.0.1:8000/shop/cart/items/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          product: id,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    }

    // const getUserCart = async (token) => {
    //     axios.get("http://127.0.0.1:8000/shop/cart/", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((response) => {
    //             setCart(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const getCartItems = async (token) => {
      axios.get("http://127.0.0.1:8000/shop/cart/items/", {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          })
          .then((response) => {
              setProducts(response.data);
              localStorage.setItem("cart", JSON.stringify(response.data));
          })
          .catch((error) => console.log(error));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            navigate("/auth/login");
        }
        // getUserCart(token);
        getCartItems(token);
    }, [navigate]);

    return (
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold my-4 text-center">Your Cart</h1>
        <ul className="divide-y divide-gray-200 max-w-4xl mx-auto">
          <li className="py-4 flex font-bold">
            <div className="flex-1">Item</div>
            <div className="flex-1">Subtotal</div>
            <div>Quantity</div>
          </li>
          {products.map((product) => {
            return (
              <li key={product.id} className="py-4 flex items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                  <p className="text-green-600">
                    Price: ${product.price}
                  </p>
                </div>
                <p className="flex-1">${product.subtotal}</p>
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-full mr-2"
                    onClick={() => decreaseQuanity(product.id, product.quantity)}
                  >
                    -
                  </button>
                  <p className="text-gray-600">
                    {product.quantity}
                  </p>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-full ml-2"
                    onClick={() => increaseQuantity(product.id, product.quantity)}
                  >
                    +
                  </button>
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold mx-2 py-2 px-4 rounded object-right"
                    onClick={() => deleteItem(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
          <li>
            <div className="flex items-center justify-between py-2">
              <h2 className="text-lg font-semibold">Total</h2>
              <p className="text-green-600 font-semibold mx-auto">
                ${
                  products.reduce((acc, product) => acc + product.subtotal, 0)
                }
              </p>
            </div>
            <div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/user/checkout")}
              >
                Checkout
              </button>
            </div>
          </li>
        </ul>
      </div>
    );
};

export default Cart;

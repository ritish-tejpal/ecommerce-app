import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Cart = () => {
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([{}])
  const navigate = useNavigate()
  const { id, quantity } = useParams()



  const getUserCart = async(token) => {
    axios.get("http://127.0.0.1:8000/shop/cart/", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setCart(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const getCartItems = async(token) => {
    axios.get("http://127.0.0.1:8000/shop/cart/items/", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => setProducts(response.data))
      .catch(error => console.log(error))
  }

  // const createCartItem = async(token) => {
  //   axios.post("http://127.0.0.1:8000/shop/cart/items/", {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   },
  //   {
  //     'product': id,
  //     'quantity': (quantity === undefined ? 1 : quantity)
  //   }, )
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error))
  // }

  // const updateCartItem = async() => {
  //   // access token, cart id 
  // }

  // const deleteCartItem = async() => {
  //   // requires product_id
  // }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token === null){
      navigate('/login')
    }
    getUserCart(token)
    getCartItems(token)

  }, [navigate])
    
  return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Cart Items</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            products.map((product, index) => {
              return (
                <div key={index} className="border p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p>Quantity: {product.quantity}</p>
                  <p>Subtotal: ${product.subtotal}</p>
                </div>
              )
            })}
          </div>
      </div>
    )
  }

export default Cart

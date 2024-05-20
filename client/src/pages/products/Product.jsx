import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Product = () => {
    
    const { name } = useParams()
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([{}])
    const [quantity, setQuantity] = useState(1)
    const [success, setSuccess] = useState(false)

    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const addToCart = () => {
        const token = localStorage.getItem('token')
        if(!token){
            window.location.href = '/auth/login'
        }
        axios.post('http://127.0.0.1:8000/shop/cart/items/', {
            product: product.id,
            quantity: quantity
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            if(response.status === 201){
                setSuccess(true)
            }
        })
        .catch((error) => console.log(error))
    }
    
    const fetchData = async (name) => {
        axios.get(`http://127.0.0.1:8000/products/${name}/`)
        .then((response) => {
            setProduct(response.data)
        })
        .catch((error) => console.log(error))
    }

    const fetchReviews = async (name) => {
        axios.get(`http://127.0.0.1:8000/products/reviews/${name}/`)
        .then((response) => {
            setReviews(response.data)
        })
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchData(name)
        fetchReviews(name)
    }, [name])

  return (
    <div className='container mx-auto px-4'>
        <div className='flex flex-wrap -mx-1 lg:-mx-4'>
            <div className='my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-1/2'>
                {success && (
                    <div id="alert-3" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                      A simple info alert with an <a href="#" className="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                      <span className="sr-only">Close</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </div>
                )}
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h2 className='text-2xl font-bold mb-2'>{product.name}</h2>
                    <p className='text-gray-700'>{product.description}</p>
                    <p className='text-gray-700'>₹{product.price}</p>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded object-right' onClick={addToCart}>Add to cart</button>
                </div>
            </div>
            <div className='my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-1/2'>
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h2 className='text-2xl font-bold mb-2'>Reviews</h2>
                    <ul>
                        {reviews.map((review) => (
                            <li key={review.id}>
                                <h3 className='font-bold'>{review.title}</h3>
                                <p>{review.comment}</p>
                                <p>{review.rating}</p>
                                <p>⭐{review.stars}/5</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-1/2'>
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h3 className='text-xl font-bold p-2'>Quantity</h3>
                    <div className='flex items-center px-3'>
                        <button className='bg-green-500 text-white px-2 py-1 rounded-full mr-2' onClick={decrement}>
                            -
                        </button>
                        <div className='px-2'>
                            {quantity}
                        </div>
                        <button className='bg-green-500 text-white px-2 py-1 rounded-full mr-2' onClick={increment}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default Product

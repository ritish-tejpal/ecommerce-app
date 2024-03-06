import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Product = (props) => {
    
    const { name } = useParams()
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([{}])
    
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
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h2 className='text-2xl font-bold mb-2'>{product.name}</h2>
                    <p className='text-gray-700'>{product.description}</p>
                    <p className='text-gray-700'>₹{product.price}</p>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded object-right'>Add to cart</button>
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
        </div>      
    </div>
  )
}

export default Product

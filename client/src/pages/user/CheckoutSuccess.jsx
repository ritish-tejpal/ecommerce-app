import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import checkmark from '../../assets/checkmark.png'

const CheckoutSuccess = () => {
    const params = new URLSearchParams(window.location.search)
    const session_id = params.get('session_id')
    const [invoice, setInvoice] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCheckoutSession = async () => {
            axios.post('http://127.0.0.1:8000/orders/invoice/', {
                session_id: session_id
            })
            .then(response => {
                setInvoice(response.data)
                setLoading(false)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }

        getCheckoutSession()
    }, [session_id])

    return (
        <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg my-10 mx-auto">
            <div className="p-4 flex justify-center items-center">
                {/* <img src={checkmark} alt="checkmark" className="w-16 h-16" /> */}
                image placeholder
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                    Your order has been successfully placed!
                </h5>

                {!loading && 
                <div>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-sm text-gray-700">Order ID</p>
                        <p className="text-sm text-gray-900 font-bold">{invoice.order.id}</p>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-sm text-gray-700">Amount</p>
                        <p className="text-sm text-gray-900 font-bold">${invoice.order.total}</p>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-sm text-gray-700">Payment Status</p>
                        <p className="text-sm text-gray-900 font-bold">{invoice.payment_status}</p>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-sm text-gray-700">Payment Method</p>
                        <p className="text-sm text-gray-900 font-bold">{invoice.order_payment.payment_type}</p>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-sm text-gray-700">Order Date</p>
                        <p className="text-sm text-gray-900 font-bold">{invoice.order.date}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default CheckoutSuccess

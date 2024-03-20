import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CheckoutSuccess = () => {
    const params = new URLSearchParams(window.location.search)
    const session_id = params.get('session_id')
    const [invoice, setInvoice] = useState({})

    useEffect(() => {
        const getCheckoutSession = async () => {
            axios.post('http://127.0.0.1:8000/orders/invoice/', {
                session_id: session_id
            })
            .then(response => {
                setInvoice(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }

        getCheckoutSession()
    }, [session_id])

    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg my-5 mx-auto">
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        
    </div>
</div>
    )
}

export default CheckoutSuccess

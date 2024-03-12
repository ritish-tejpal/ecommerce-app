import React from 'react';

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-8">Payment Information</h1>
      <div className="bg-white shadow-md rounded-md p-8 w-96">
        <form>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">Card Number</label>
            <input type="text" id="cardNumber" name="cardNumber" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500" placeholder="Enter your card number" />
          </div>
          <div className="mb-4">
            <label htmlFor="expiry" className="block text-gray-700 font-semibold mb-2">Expiration Date</label>
            <input type="text" id="expiry" name="expiry" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500" placeholder="MM/YY" />
          </div>
          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">CVV</label>
            <input type="text" id="cvv" name="cvv" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500" placeholder="CVV" />
          </div>
          <button type="submit" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

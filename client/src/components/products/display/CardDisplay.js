import React from "react";

const CardDisplay = ({product}) => {    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={product.image} alt={product.name} />
          <div className="px-6 py-4">
            <a href={'/products/'+product.name} className="font-bold bg-green-500 rounded py-1 w-28 text-xl text-green-200 mb-2">{product.name}</a>
            <p className="text-gray-700 text-base">{product.description}</p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{product.category}</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{product.price}</span>
          </div>
        </div>
      );
    
}

export default CardDisplay;
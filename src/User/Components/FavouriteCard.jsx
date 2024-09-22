/* eslint-disable no-unused-vars */
import React from "react";

const FavouriteCard = ({ item, handleAddToCart, handleToggleFavourite }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden p-4">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <h3 className="font-semibold mt-2">{item.title}</h3>
      <p className="text-sm text-gray-600">Price: {item.price} EGP</p>
      <p className="text-sm text-gray-600">In stock</p>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handleAddToCart(item)}
          className="bg-btncolor text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Add to cart
        </button>
        <button
          onClick={() => handleToggleFavourite(item.id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          &#10005; Remove
        </button>
      </div>
    </div>
  );
};

export default FavouriteCard;

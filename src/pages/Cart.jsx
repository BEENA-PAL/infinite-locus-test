import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  selectCartItems,
} from "../redux/cartSlice.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  if (cartItems.length === 0) {
    return <div className="text-center mt-8 text-gray-600">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map(({ recipe, quantity }) => (
          <div key={recipe.id} className="flex items-center bg-white shadow rounded-lg p-4">
            <img src={recipe.image} alt={recipe.name} className="h-20 w-16 object-contain mr-4" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold mb-0">{recipe.name}</h3>
                <span className="flex items-center text-yellow-500 text-sm font-semibold">
                  ★ {recipe.rating}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{recipe.cuisine}</p>
              <p className="text-gray-600 text-sm">{recipe.caloriesPerServing} cal/serving</p>
            </div>
            <div className="flex items-center mr-4">
              <button
                onClick={() => handleDecrement(recipe.id)}
                className="bg-gray-200 px-2 py-1 rounded-l text-lg"
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="px-3">{quantity}</span>
              <button
                onClick={() => handleIncrement(recipe.id)}
                className="bg-gray-200 px-2 py-1 rounded-r text-lg"
              >
                +
              </button>
            </div>
            <Link to={`/recipe/${recipe.id}`} className="text-green-600 hover:underline mr-4">View</Link>
            <button onClick={() => handleRemove(recipe.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart; 
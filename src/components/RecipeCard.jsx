import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, selectCartItems } from "../redux/cartSlice.jsx";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((item) => item.recipe && item.recipe.id === recipe.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(recipe));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(recipe.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(recipe.id));
  };

  return (
    <div className="bg-white gap-4 shadow rounded-lg m-4 border-solid p-4 flex flex-col justify-between h-full">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-40 w-full object-contain mb-2"
      />
      <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
      <p className="text-gray-700 text-base mb-1 font-semibold">{recipe.caloriesPerServing} cal/serving</p>
      <p className="text-gray-600 text-sm mb-2">{recipe.cuisine}</p>
      <div className="flex justify-between mt-auto items-center">
        <Link
          to={`/recipe/${recipe.id}`}
          className="text-green-600 hover:underline"
        >
          View
        </Link>
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="bg-gray-200 px-2 py-1 rounded-l text-lg"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-200 px-2 py-1 rounded-r text-lg"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;

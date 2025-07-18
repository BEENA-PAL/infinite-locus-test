import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RECIPE_API_BASE_URL } from "../constants";

const InfoCard = ({ label, value, icon }) => (
  <div className="flex flex-col items-center bg-gray-50 rounded-lg shadow px-4 py-2 min-w-[90px]">
    {icon && <span className="text-2xl mb-1">{icon}</span>}
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-semibold text-base text-gray-800">{value}</span>
  </div>
);

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${RECIPE_API_BASE_URL}/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError("Failed to fetch recipe details.");
      }
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Main Image and Header */}
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6">
        <div className="flex-shrink-0 flex flex-col items-center w-full md:w-1/3">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="rounded-xl w-full h-64 object-cover shadow mb-4 border border-gray-100"
          />
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {recipe.tags &&
              recipe.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              {recipe.name}
            </h1>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="font-semibold text-lg text-gray-800">
                {recipe.rating}
              </span>
              <span className="text-gray-500 text-sm">
                ({recipe.reviewCount} reviews)
              </span>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {recipe.mealType &&
                recipe.mealType.map((type, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium"
                  >
                    {type}
                  </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <InfoCard
                label="Prep Time"
                value={recipe.prepTimeMinutes + " min"}
                icon="⏱️"
              />
              <InfoCard
                label="Cook Time"
                value={recipe.cookTimeMinutes + " min"}
                icon="🍳"
              />
              <InfoCard label="Servings" value={recipe.servings} icon="🍽️" />
              <InfoCard
                label="Calories"
                value={recipe.caloriesPerServing}
                icon="🔥"
              />
              <InfoCard
                label="Difficulty"
                value={recipe.difficulty}
                icon="🎯"
              />
              <InfoCard label="Cuisine" value={recipe.cuisine} icon="🌎" />
            </div>
          </div>
        </div>
      </div>
      {/* Ingredients & Instructions */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-800 text-base leading-relaxed space-y-1">
            {recipe.ingredients &&
              recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-800 text-base leading-relaxed space-y-2">
            {recipe.instructions &&
              recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

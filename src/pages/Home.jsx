import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { RECIPE_API_BASE_URL } from "../constants/api";
import { ITEMS_PER_PAGE } from "../constants/pagination";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const fetchRecipes = useCallback(async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${RECIPE_API_BASE_URL}`);
      let items = res.data.recipes || [];
      if (query) {
        const q = query.toLowerCase();
        items = items.filter((item) => item.name.toLowerCase().includes(q));
      }
      setRecipes(items);
    } catch (err) {
      setError("Failed to fetch recipes.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setSearchQuery("");
    fetchRecipes("");
    setCurrentPage(1);
  }, [location, fetchRecipes]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchRecipes(query);
  };

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} placeholder="Search for recipes..." />
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {paginatedRecipes.length === 0 && !loading && !error ? (
        <div className="text-center text-gray-500 my-8 text-lg">
          No recipes found. Try a different search or check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

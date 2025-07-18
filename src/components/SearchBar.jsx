import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };
  function onchange(e) {
    setQuery(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        value={query}
        onChange={onchange}
        placeholder="Search for recipes..."
        className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

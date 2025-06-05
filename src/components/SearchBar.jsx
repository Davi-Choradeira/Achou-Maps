import React, { useState } from "react";
import "../styles.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container fade-in">
      <input
        type="text"
        className="search-input"
        placeholder="Digite um endereço ou local..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;

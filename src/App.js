import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <h1>ACHOU - Buscador de Mapas</h1>
      <SearchBar onSearch={setSearchQuery} />
      <MapComponent searchQuery={searchQuery} />
    </div>
  );
}

export default App;
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MapComponent from "./components/MapComponent";
import SideMenu from "./components/SideMenu";
import "./styles.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <h1>ACHOU - Buscador de Mapas</h1>

      <button className="toggle-button" onClick={toggleDarkMode}>
        {darkMode ? "Modo Claro 🌞" : "Modo Escuro 🌙"}
      </button>

      <button className="toggle-button" onClick={toggleMenu}>
        {menuOpen ? "Fechar Menu" : "Abrir Menu"}
      </button>

      <SearchBar onSearch={setSearchQuery} />
      <MapComponent searchQuery={searchQuery} setLocationInfo={setLocationInfo} />

      <div className={menuOpen ? "side-menu active" : "side-menu"}>
        <SideMenu
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          locationInfo={locationInfo}
        />
      </div>
    </div>
  );
}

export default App;

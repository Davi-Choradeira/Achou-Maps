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

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="app-header">
        <h1>🌍 ACHOU Mapas </h1>
        <div className="controls">
          <button className="toggle-button" onClick={toggleDarkMode}>
            {darkMode ? "🌞" : "🌙"}
          </button>
          <button className="toggle-button" onClick={toggleMenu}>
            {menuOpen ? "Menu Fechar" : "Menu"}
          </button>
        </div>
      </header>

      <SearchBar onSearch={setSearchQuery} />

      <MapComponent
        searchQuery={searchQuery}
        setLocationInfo={setLocationInfo}
      />

      {menuOpen && (
        <div className="side-menu">
          <SideMenu
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            locationInfo={locationInfo}
          />
        </div>
      )}
    </div>
  );
}

export default App;

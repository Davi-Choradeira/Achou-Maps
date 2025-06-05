import React from "react";
import "../styles.css";

const SideMenu = ({ darkMode, toggleDarkMode, locationInfo }) => {
  return (
    <div className="side-menu active">
      <h2>Configurações</h2>
      <button className="menu-button" onClick={toggleDarkMode}>
        {darkMode ? "Modo Claro 🌞" : "Modo Escuro 🌙"}
      </button>

      <hr />

      {locationInfo ? (
        <div className="location-info">
          <h3>Local Buscado</h3>
          <p><strong>Endereço:</strong> {locationInfo.address || "Não disponível"}</p>
          <p><strong>Coordenadas:</strong> {locationInfo.lat}, {locationInfo.lon}</p>
        </div>
      ) : (
        <p className="placeholder-text">Busque um local para ver detalhes!</p>
      )}
    </div>
  );
};

export default SideMenu;

import React from "react";
import "../styles.css";

const SideMenu = ({ darkMode, toggleDarkMode, locationInfo }) => {
  return (
    <div className="side-menu-content">
      <h2>📍 Informações</h2>
      {locationInfo ? (
        <div>
          <p><strong>Endereço:</strong> {locationInfo.address}</p>
          <p><strong>Latitude:</strong> {locationInfo.lat}</p>
          <p><strong>Longitude:</strong> {locationInfo.lon}</p>
        </div>
      ) : (
        <p>Nenhuma localização selecionada.</p>
      )}
    </div>
  );
};

export default SideMenu;
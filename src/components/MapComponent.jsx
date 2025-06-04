import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MoveMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 }); // Move o mapa com animação
    }
  }, [position, map]);

  return null;
};

const MapComponent = ({ searchQuery }) => {
  const [position, setPosition] = useState([38.736946, -9.142685]); // Lisboa

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          }
        })
        .catch((err) => console.error("Erro ao buscar localização:", err));
    }
  }, [searchQuery]);

  return (
    <MapContainer center={position} zoom={12} style={{ width: "100%", height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={L.icon({ iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png", iconSize: [38, 38] })} />
      <MoveMap position={position} />
    </MapContainer>
  );
};

export default MapComponent;
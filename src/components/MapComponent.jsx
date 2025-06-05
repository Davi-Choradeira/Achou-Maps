import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MoveMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const MapComponent = ({ searchQuery, setLocationInfo }) => {
  const [position, setPosition] = useState([38.736946, -9.142685]); // Lisboa

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setPosition([lat, lon]);
            setLocationInfo({
              lat,
              lon,
              address: data[0].display_name
            });
          }
        })
        .catch((err) => console.error("Erro ao buscar localização:", err));
    }
  }, [searchQuery]);

  return (
    <MapContainer center={position} zoom={12} style={{ width: "100%", height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
          iconSize: [38, 38],
        })}
      />
      <MoveMap position={position} />
    </MapContainer>
  );
};

export default MapComponent;

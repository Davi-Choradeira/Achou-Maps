import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { debounce } from "lodash";


const neonIcon = L.divIcon({
  className: "marker-neon",
  iconSize: [24, 24],
});

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
  const [position, setPosition] = useState([38.736946, -9.142685]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
        },
        (err) => console.error("Erro de geolocalização:", err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watcher);
    }
  }, []);

  useEffect(() => {
    const fetchLocation = debounce(() => {
      if (searchQuery) {
        setLoading(true);
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
          .then((res) => res.json())
          .then((data) => {
            if (data?.length > 0) {
              const lat = parseFloat(data[0].lat);
              const lon = parseFloat(data[0].lon);
              setPosition([lat, lon]);
              setLocationInfo({
                address: data[0].display_name,
                lat,
                lon,
              });
            }
          })
          .catch((err) => console.error("Erro ao buscar localização:", err))
          .finally(() => setLoading(false));
      }
    }, 500);

    fetchLocation();
  }, [searchQuery]);

  return (
    <div className="map-wrapper">
      {loading && <div className="loading-overlay">Buscando localização...</div>}
      <MapContainer center={position} zoom={12} style={{ width: "100%", height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={neonIcon} />
        <MoveMap position={position} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;

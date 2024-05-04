import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { MapOverlay } from "./MapOverlay";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.7.1/dist/images/";

export const Map = () => {
  return (
    <MapContainer
      center={[55.702868, 37.530865]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
      <MapOverlay />
    </MapContainer>
  );
};

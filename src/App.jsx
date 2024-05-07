import { MapContainer } from "react-leaflet";
import "./App.css";

import { MapOverlay } from "./components/MapOverlay";

function App() {
  return (
    <MapContainer center={[55.7, 37.53]} zoom={10} scrollWheelZoom={true}>
      <MapOverlay />
    </MapContainer>
  );
}

export default App;

import { FeatureGroup, MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import { MapOverlay } from "./MapOverlay";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.7.1/dist/images/";

// L.Draw.Polygon.include({
//   _updateFinishHandler: function () {
//     console.log("updated!!!");
//     var markerCount = this._markers.length;
//     if (markerCount > 1) {
//       this._markers[markerCount - 1].on("click", this._finishShape, this);
//     }
//     if (markerCount > 2) {
//       this._markers[markerCount - 2].off("click", this._finishShape, this);
//     }
//   },
// });

export const Map = () => {
  return (
    <MapContainer
      center={[55.702868, 37.530865]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <MapOverlay />
    </MapContainer>
  );
};

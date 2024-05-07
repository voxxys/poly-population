import { useCallback, useRef, useState } from "react";
import { SavedPolyOverlay } from "./SavedPolyOverlay";
import { FeatureGroup, TileLayer, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { API_GUID } from "../client";

const mapTileUrl = `http://tile.digimap.ru/rumap/{z}/{x}/{y}.png?guid=${API_GUID}`;

export const MapOverlay = () => {
  const editRef = useRef();
  const map = useMap();
  const [savedPolygon, setSavedPolygon] = useState([]);

  const handleMount = useCallback((e) => {
    editRef.current = e;

    const but = document.querySelector(".leaflet-draw-edit-remove");

    but.addEventListener("click", function (e) {
      editRef.current._toolbars.edit._modes.remove.handler.disable();
    });
  }, []);

  const handleCreate = (e) => {
    setSavedPolygon(...e.layer.getLatLngs());
  };

  const handleEditStart = () => {
    setSavedPolygon([]);
  };

  const deleteShapes = () => {
    map.eachLayer((layer) => {
      if (typeof layer._latlngs !== "undefined" && layer._latlngs.length > 0) {
        layer.remove();
      }
    });
    setSavedPolygon([]);
  };

  const handleEditStop = (e) => {
    for (let i in e.target._layers) {
      if (e.target._layers[i]?._latlngs) {
        setSavedPolygon(...e.target._layers[i]?._latlngs);
      }
    }
  };

  const handleDrawStart = () => {
    deleteShapes();
  };

  const handleDeleteStart = () => {
    deleteShapes();
    editRef.current._toolbars.edit._modes.remove.handler.disable();
  };

  return (
    <>
      <SavedPolyOverlay savedPolygon={savedPolygon} />

      <FeatureGroup>
        <EditControl
          position="topleft"
          draw={{
            rectangle: false,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polygon: true,
          }}
          edit={{
            edit: true,
            remove: true,
          }}
          onCreated={handleCreate}
          onMounted={handleMount}
          onDrawStart={handleDrawStart}
          onEditStart={handleEditStart}
          onEditStop={handleEditStop}
          onDeleteStart={handleDeleteStart}
        />
      </FeatureGroup>

      <TileLayer url={mapTileUrl} />
    </>
  );
};

import { useCallback, useMemo, useRef, useState } from "react";
import { SavedPolyOverlay } from "./SavedPolyOverlay";
import { FeatureGroup, TileLayer, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

export const MapOverlay = () => {
  const editRef = useRef();
  const map = useMap();
  const [savedPolygon, setSavedPolygon] = useState([]);
  const polygonExists = savedPolygon.length > 0;

  const handleCreate = useCallback((e) => {
    setSavedPolygon(...e.layer.getLatLngs());
  }, []);

  const handleEditStart = (e) => {
    setSavedPolygon([]);
    // if (polygonExists) {
    //   editRef.current._toolbars.draw._modes.polygon.handler.disable();
    //   console.log("!!!!!");
    // }
  };

  const handleEditStop = (e) => {
    // setSavedPolygon([]);

    for (let i in e.target._layers) {
      if (e.target._layers[i]?._latlngs) {
        setSavedPolygon(...e.target._layers[i]?._latlngs);
      }
    }
  };

  const handleDrawStart = () => {
    map.eachLayer((layer) => {
      if (typeof layer._latlngs !== "undefined" && layer._latlngs.length > 0) {
        layer.remove();
      }
    });
    setSavedPolygon([]);
  };

  const handleDelete = () => {
    setSavedPolygon([]);
    map.eachLayer((layer) => {
      if (typeof layer._latlngs !== "undefined" && layer._latlngs.length > 0) {
        layer.remove();
      }
    });
  };

  return (
    <>
      <SavedPolyOverlay
        savedPolygon={savedPolygon}
        setSavedPolygon={setSavedPolygon}
      />
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
          onMounted={(e) => {
            editRef.current = e;

            const but = document.querySelector(".leaflet-draw-edit-remove");

            but.removeAttribute("title");
            but.addEventListener("click", function (e) {
              editRef.current._toolbars.edit._modes.remove.handler.disable();
            });
          }}
          onDrawStart={handleDrawStart}
          onEditStart={handleEditStart}
          onEditStop={handleEditStop}
          onDeleteStart={() => {
            handleDelete();
            editRef.current._toolbars.edit._modes.remove.handler.disable();
          }}
        />
      </FeatureGroup>

      <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
    </>
  );
};

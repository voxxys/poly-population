import { useEffect, useRef, useState } from "react";
import { Marker, Polygon, Popup, Tooltip, useMap } from "react-leaflet";
import { getAreaStats } from "../client";

// const examplePol = [
//   [
//     [37.513675689697266, 56.34542024730709],
//     [37.53702163696288, 56.34551537930329],
//     [37.53547668457031, 56.33504943733644],
//     [37.51230239868164, 56.331909094890676],
//     [37.513675689697266, 56.34542024730709],
//   ],
// ];

const closePoly = (polygon) => [...polygon, polygon[0]];
const invertLatLng = (polygon) => polygon.map((item) => [item.lng, item.lat]);

const PolyTooltip = ({ popLabel, setSavedPolygon }) => {
  return (
    <>
      <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
        {`Population: ${popLabel ?? "?"}`}
      </Tooltip>
    </>
  );
};

export const SavedPolyOverlay = ({ savedPolygon, setSavedPolygon }) => {
  const map = useMap();

  const [popLabel, setPopLabel] = useState(null);

  const polygonExists = savedPolygon.length > 0;

  useEffect(() => {
    if (polygonExists) {
      console.log("EXISTS: ");
      console.log(polygonExists);
      const closedPoly = closePoly(savedPolygon);
      const invertedLatLng = invertLatLng(closedPoly);

      console.log({ savedPolygon, closedPoly, invertedLatLng });
      // debugger;
      getAreaStats([invertLatLng(closePoly(savedPolygon))]).then((population) =>
        setPopLabel(population)
      );
    } else {
      console.log("DOES NOT EXIST: ");
      console.log(polygonExists, savedPolygon);
    }
  }, [polygonExists, savedPolygon]);

  const polyRef = useRef();

  return (
    <>
      {polygonExists ? (
        <Polygon ref={polyRef} color="#1d59ad" positions={savedPolygon}>
          <PolyTooltip
            popLabel={popLabel}
            setSavedPolygon={setSavedPolygon}
            key={savedPolygon}
          />
        </Polygon>
      ) : null}
    </>
  );
};

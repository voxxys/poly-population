import { useEffect, useState } from "react";
import { Polygon, Tooltip } from "react-leaflet";
import { getAreaStats } from "../client";

const closePoly = (polygon) => [...polygon, polygon[0]];
const invertLatLng = (polygon) => polygon.map((item) => [item.lng, item.lat]);

const PolyTooltip = ({ popLabel }) => {
  return (
    <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
      {`Population: ${popLabel ?? "?"}`}
    </Tooltip>
  );
};

export const SavedPolyOverlay = ({ savedPolygon }) => {
  const [popLabel, setPopLabel] = useState(null);

  const polygonExists = savedPolygon.length > 0;

  useEffect(() => {
    if (polygonExists) {
      const closedPoly = closePoly(savedPolygon);
      const invertedLatLng = invertLatLng(closedPoly);

      getAreaStats([invertedLatLng]).then((population) =>
        setPopLabel(population)
      );
    }
  }, [polygonExists, savedPolygon]);

  if (!polygonExists) {
    return null;
  }

  return (
    <Polygon color="#1d59ad" positions={savedPolygon}>
      <PolyTooltip popLabel={popLabel} key={savedPolygon} />
    </Polygon>
  );
};

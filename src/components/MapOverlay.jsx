import { useEffect, useState } from "react";
import { Polygon, Tooltip } from "react-leaflet";
import { getAreaStats } from "../client";

const examplePol = [
  [
    [37.513675689697266, 56.34542024730709],
    [37.53702163696288, 56.34551537930329],
    [37.53547668457031, 56.33504943733644],
    [37.51230239868164, 56.331909094890676],
    [37.513675689697266, 56.34542024730709],
  ],
];

const polygon = [
  [55.702868, 37.530865],
  [55.702868, 37.65],
  [55.79, 37.530865],
  [55.702868, 37.530865],
];

const invertLatLng = (polygon) => polygon.map((item) => [item[1], item[0]]);

export const MapOverlay = () => {
  const [popLabel, setPopLabel] = useState(null);

  useEffect(() => {
    getAreaStats([invertLatLng(polygon)]).then((population) =>
      setPopLabel(population)
    );
  }, []);

  // const polyRef = useRef();
  // const polCentre = polyRef.current?.getCenter() ?? [0, 0];

  return (
    <>
      <Polygon color="purple" positions={polygon}>
        <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
          {`Население: ${popLabel ?? "?"}`}
          {/* <br></br> */}
          {/* <button onClick={null}>Удалить</button> */}
        </Tooltip>
      </Polygon>
    </>
  );
};

import { Polygon, Tooltip } from "react-leaflet";

export const MapOverlay = () => {
  const polygon = [
    [55.702868, 37.530865],
    [55.702868, 37.65],
    [55.79, 37.530865],
  ];

  // const polyRef = useRef();
  // const polCentre = polyRef.current?.getCenter() ?? [0, 0];

  return (
    <>
      <Polygon color="purple" positions={polygon}>
        <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent>
          {"Население: 1"}
          {/* <br></br> */}
          {/* <button onClick={null}>Удалить</button> */}
        </Tooltip>
      </Polygon>
    </>
  );
};

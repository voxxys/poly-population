export const API_GUID = "93BC6341-B35E-4B34-9DFE-26796F64BBB7";
const API_URL = "https://gis01.rumap.ru/4898/areaStatistics";

export const getAreaStats = async (polygon) => {
  const raw = JSON.stringify({
    features: [
      {
        geometry: {
          coordinates: polygon,
          type: "Polygon",
        },
        properties: {},
        type: "Feature",
      },
    ],
    type: "FeatureCollection",
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(`${API_URL}?guid=${API_GUID}`, requestOptions);

  if (res.ok) {
    const data = await res.json();
    return data.population_rsv;
  } else {
    return null;
  }
};

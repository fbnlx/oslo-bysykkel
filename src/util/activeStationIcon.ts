import L from 'leaflet';

const activeStationIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [24, 36],
  iconAnchor: [14, 43],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default activeStationIcon;

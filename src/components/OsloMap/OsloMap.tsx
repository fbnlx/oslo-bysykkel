import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Station, StationState } from '../../types/Station';

import stationIcon from '../../util/stationIcon';
import { setActiveStation, setStations, setStationStatus } from '../../actions/stationActions';
import activeStationIcon from '../../util/activeStationIcon';
import './OsloMap.scss';

const OsloMap = (props: { activeStation: Station | null }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState({ lat: 59.9139, lon: 10.7522, zoom: 15 });
  const stationMarkers = useSelector<StationState, Station[]>((state) => state.stations);

  useEffect(() => {
    getStations();
  }, []);

  const getStations = async (): Promise<void> => {
    try {
      const stations = await axios.get(
        'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json'
      );
      dispatch(setStations(stations.data.data.stations));
    } catch (e) {
      console.log(e);
    }
  };

  const getStationInformation = async (): Promise<void> => {
    try {
      const stations = await axios.get('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json');
      dispatch(setStationStatus(stations.data.data.stations));
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (id: string): void => {
    const activeStation = stationMarkers.find((station) => station.station_id === id);
    if (activeStation) {
      dispatch(setActiveStation(activeStation));
      getStationInformation();
    }
  };

  return (
    <Map center={[position.lat, position.lon]} zoom={position.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      {stationMarkers &&
        stationMarkers.map((station) => (
          <Marker
            key={station.station_id}
            position={[station.lat, station.lon]}
            icon={
              props.activeStation && props.activeStation.station_id === station.station_id
                ? activeStationIcon
                : stationIcon
            }
            onclick={() => handleClick(station.station_id)}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
    </Map>
  );
};

export default OsloMap;

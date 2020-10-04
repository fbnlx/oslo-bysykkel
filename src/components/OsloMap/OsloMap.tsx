import React, { useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Station } from '../../types/Station';
import { MapPosition } from '../../types/Map';

import stationIcon from '../../util/stationIcon';
import { setActiveStation, setStations, setStationStatus } from '../../actions/stationActions';
import activeStationIcon from '../../util/activeStationIcon';

import './OsloMap.scss';

interface MapProps {
  activeStation: Station | null;
  stationList: Station[];
  position: MapPosition;
}

const OsloMap = ({ activeStation, stationList, position }: MapProps) => {
  const dispatch = useDispatch();

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
    const activeStation = stationList.find((station) => station.station_id === id);
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
      {stationList &&
        stationList.map((station) => (
          <Marker
            key={station.station_id}
            position={[station.lat, station.lon]}
            icon={
              activeStation && activeStation.station_id === station.station_id
                ? activeStationIcon
                : stationIcon
            }
            onclick={() => handleClick(station.station_id)}
          ></Marker>
        ))}
    </Map>
  );
};

export default OsloMap;

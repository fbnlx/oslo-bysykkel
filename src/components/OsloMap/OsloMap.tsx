import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import axios, { AxiosPromise, AxiosResponse } from 'axios';

import './OsloMap.scss';
import stationIcon from '../../util/stationIcon';

type Station = {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
};

const OsloMap = () => {
  const [position, setPosition] = useState({ lat: 59.9139, lon: 10.7522, zoom: 15 });
  const [stationMarkers, setStationMarkers] = useState<Station[]>([]);

  useEffect(() => {
    getStations();
  }, []);

  const getStations = async (): Promise<void> => {
    try {
      const stations = await axios.get(
        'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json'
      );
      setStationMarkers(stations.data.data.stations);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (id: string): void => {
    console.log('clicked ', id);
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
            icon={stationIcon}
            onclick={() => handleClick(station.station_id)}
          ></Marker>
        ))}
    </Map>
  );
};

export default OsloMap;

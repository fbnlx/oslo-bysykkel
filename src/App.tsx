import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './index';
import Header from './components/Header';
import OsloMap from './components/OsloMap';
import StationDetails from './components/StationDetails';
import { MapPosition } from './types/Map';
import { Station } from './types/Station';

import './App.scss';

function App() {
  const activeStation = useSelector<AppState, Station | null>((state) => state.station.activeStation);
  const stationList = useSelector<AppState, Station[]>((state) => state.station.stations);
  const mapPosition = useSelector<AppState, MapPosition>((state) => state.map.position);

  return (
    <div className="App">
      <Header stationList={stationList} />
      <div className="App__body">
        <div className="App__body-left">
          <OsloMap position={mapPosition} activeStation={activeStation} stationList={stationList} />
        </div>
        <div className="App__body-right">{<StationDetails station={activeStation} />}</div>
      </div>
    </div>
  );
}

export default App;

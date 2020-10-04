import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Header from './components/Header';
import OsloMap from './components/OsloMap';
import StationDetails from './components/StationDetails';
import { Station, StationState } from './types/Station';

function App() {
  const activeStation = useSelector<StationState, Station | null>((state) => state.activeStation);
  return (
    <div className="App">
      <Header />
      <div className="App__body">
        <div className="App__body-left">
          <OsloMap activeStation={activeStation}/>
        </div>
        <div className="App__body-right">{activeStation && <StationDetails station={activeStation} />}</div>
      </div>
    </div>
  );
}

export default App;

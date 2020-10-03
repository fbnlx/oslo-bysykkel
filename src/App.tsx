import React from 'react';
import './App.scss';
import Header from './components/Header';
import OsloMap from './components/OsloMap';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__body">
        <div className="App__body-left">
          <OsloMap />
        </div>
        <div className="App__body-right"></div>
      </div>
    </div>
  );
}

export default App;

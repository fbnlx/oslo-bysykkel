import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, Reducer } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import { stationReducer } from './reducers/stationReducer';

import { mapReducer } from './reducers/mapReducer';
import { StationState } from './types/Station';
import { MapState } from './types/Map';

import './index.scss';

export interface AppState {
  station: StationState;
  map: MapState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  station: stationReducer,
  map: mapReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

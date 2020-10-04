import { StationActionTypes, StationState } from '../types/Station';

const initialState: StationState = {
  stations: [],
  activeStation: null,
};

export function stationReducer(state = initialState, action: StationActionTypes): StationState {
  switch (action.type) {
    case 'SET_STATIONS':
      return { ...state, stations: action.payload };
    case 'SET_ACTIVE_STATION':
      return { ...state, activeStation: action.payload };
    case 'SET_STATION_STATUS':
      if (state.activeStation) {
        let newActiveStation = { ...state.activeStation };
        const stationStatus = action.payload.find(
          (station) => station.station_id === newActiveStation!.station_id
        );
        if (stationStatus) {
          newActiveStation.last_reported = stationStatus.last_reported;
          newActiveStation.num_bikes_available = stationStatus.num_bikes_available;
          newActiveStation.num_docks_available = stationStatus.num_docks_available;
          return { ...state, activeStation: newActiveStation };
        }
      }
    default:
      return state;
  }
}

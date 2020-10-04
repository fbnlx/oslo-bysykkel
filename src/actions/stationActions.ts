import {
  SET_STATION_STATUS,
  Station,
  StationActionTypes,
  StationStatus,
  SET_STATIONS,
  SET_ACTIVE_STATION,
} from '../types/Station';

export function setStations(stations: Station[]): StationActionTypes {
  return {
    type: SET_STATIONS,
    payload: stations,
  };
}

export function setActiveStation(station: Station): StationActionTypes {
  return {
    type: SET_ACTIVE_STATION,
    payload: station,
  };
}

export function setStationStatus(stationStatuses: StationStatus[]): StationActionTypes {
  return {
    type: SET_STATION_STATUS,
    payload: stationStatuses,
  };
}

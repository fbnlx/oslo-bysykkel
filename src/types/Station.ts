export const SET_STATIONS = 'SET_STATIONS';
export const SET_ACTIVE_STATION = 'SET_ACTIVE_STATION';
export const SET_STATION_STATUS = 'SET_STATION_STATUS';

export interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
  last_reported?: number;
  num_bikes_available?: number;
  num_docks_available?: number;
}

export interface StationStatus {
  station_id: string;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
}

interface SetStationsAction {
  type: typeof SET_STATIONS;
  payload: Station[];
}

interface SetActiveStationAction {
  type: typeof SET_ACTIVE_STATION;
  payload: Station;
}

interface SetStationStatusAction {
  type: typeof SET_STATION_STATUS;
  payload: StationStatus[];
}

export interface StationState {
  stations: Station[];
  activeStation: Station | null;
}

export type StationActionTypes = SetStationsAction | SetActiveStationAction | SetStationStatusAction;

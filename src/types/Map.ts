export const SET_POSITION = 'SET_POSITION';

export interface MapPosition {
  lat: number;
  lon: number;
  zoom?: number;
}

export interface SetPositionAction {
  type: typeof SET_POSITION;
  payload: MapPosition;
}

export interface MapState {
  position: MapPosition;
}

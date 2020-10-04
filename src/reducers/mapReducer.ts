import { MapState, SetPositionAction } from '../types/Map';

const initialState: MapState = {
  position: { lat: 59.9139, lon: 10.7522, zoom: 15 },
};

export function mapReducer(state = initialState, action: SetPositionAction): MapState {
  switch (action.type) {
    case 'SET_POSITION':
      const newPosition = { ...action.payload };
      return { ...state, position: newPosition };
    default:
      return state;
  }
}

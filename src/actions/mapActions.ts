import { MapPosition, SetPositionAction, SET_POSITION } from '../types/Map';

export function setPosition(position: MapPosition): SetPositionAction {
  return {
    type: SET_POSITION,
    payload: position,
  };
}

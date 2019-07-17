import {
  SELECT_PICTURE,
  OFFSET_VALUE,
  SELECT_COUNTY,
  LOAD_IMAGE
} from "./actionTypes.js";

export function selectPictureAction(picture) {
  return {
    type: SELECT_PICTURE,
    payload: picture
  };
}

export function setOffsetValueAction(val) {
  return {
    type: OFFSET_VALUE,
    payload: val
  };
}

export function setCountyAction(val) {
  return {
    type: SELECT_COUNTY,
    payload: val
  };
}

export function loadImageAction(val) {
  return {
    type: LOAD_IMAGE,
    payload: val
  };
}

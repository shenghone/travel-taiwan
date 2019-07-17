import {
  SELECT_PICTURE,
  OFFSET_VALUE,
  SELECT_COUNTY,
  LOAD_IMAGE
} from "./actionTypes";
import { createStore } from "redux";

const initialState = {
  selectedPictures: null,
  offset: 0,
  selectedCounty: null,
  percentage: 0
};

export const store = createStore(reducer, initialState);

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PICTURE:
      return {
        ...state,
        selectedPictures: action.payload
      };
    case OFFSET_VALUE:
      return {
        ...state,
        offset: action.payload
      };
    case SELECT_COUNTY:
      return {
        ...state,
        selectedCounty: action.payload
      };
    case LOAD_IMAGE:
      return {
        ...state,
        percentage: (state.percentage += action.payload)
      };
    default:
      return state;
  }
}

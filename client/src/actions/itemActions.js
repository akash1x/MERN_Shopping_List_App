import { ADD_ITEM, GET_ITEMS, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//This is where thunk comes in to make asynchronous request, using dispatch
export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());

  try {
    const res = await axios.get("/api/items");

    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const addItem = (newItem) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify(newItem);
    const res = await axios.post("/api/items", body, tokenConfig(getState));
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(`/api/items/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

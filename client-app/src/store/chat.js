import { createSlice } from "@reduxjs/toolkit";
import { url } from "../utils/url";
import { removeRoomId, setRoomId } from "../utils/roomId";

const initialState = { messages: [] };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateMessages(state, { payload }) {
      state.messages = [...payload];
    },
  },
});

export const { updateMessages, updateRoomId } = chatSlice.actions;

export const getSessionAction = (roomId, cb) => {
  return async (dispatch) => {
    try {
      const res = await fetch(url + "/client/session/" + roomId);

      if (res.status === 200) {
        const data = await res.json();
        await dispatch(updateMessages(data));
        cb();
      }

      if (res.status === 404) {
        removeRoomId();
        dispatch(updateMessages([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addSessionAction = (message) => {
  return async (dispatch) => {
    try {
      const res = await fetch(url + "/client/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.status === 201) {
        const data = await res.json();
        dispatch(getSessionAction(data.roomId));
        setRoomId(data.roomId);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateSessionAction = (roomId, message, cb) => {
  return async (dispatch) => {
    try {
      const res = await fetch(url + "/client/session/" + roomId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.status === 201) {
        const data = await res.json();
        dispatch(getSessionAction(data.roomId, cb));
      }

      if (res.status === 404) {
        removeRoomId();
        dispatch(updateMessages([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteChatSession = (roomId) => {
  return async (dispatch) => {
    try {
      const res = await fetch(url + "/client/session/" + roomId, {
        method: "DELETE",
      });

      if (res.status === 201) {
        removeRoomId();
        dispatch(updateMessages([]));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const chatReducer = chatSlice.reducer;

export default chatReducer;

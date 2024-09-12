import { createSlice } from "@reduxjs/toolkit";
import { url } from "../utils/url";
import { getToken } from "../utils/token";

const initialState = { contacts: [], session: null };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getContacts(state, { payload }) {
      state.contacts = [...payload];
    },

    getSession(state, { payload }) {
      state.session = payload;
    },
  },
});

export const { getContacts, getSession } = chatSlice.actions;

export const getContactsAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Not found token.");
      }

      const res = await fetch(url + "/admin/session", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 200) {
        const data = await res.json();
        dispatch(getContacts(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSessionAction = (roomId, cb) => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Not found token.");
      }

      const res = await fetch(url + "/admin/session/" + roomId, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 200) {
        const data = await res.json();
        await dispatch(getSession(data));
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateSessionAction = (roomId, message, cb) => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Not found token.");
      }

      const res = await fetch(url + "/admin/session/" + roomId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ message }),
      });

      if (res.status === 201) {
        const data = await res.json();
        dispatch(getSessionAction(data.roomId, cb));
      }

      if (res.status === 404) {
        dispatch(getSessionAction(null));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteChatSession = (roomId) => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Not found token.");
      }

      const res = await fetch(url + "/admin/session/" + roomId, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 201) {
        dispatch(getContactsAction());
        dispatch(getSession(null));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const chatReducer = chatSlice.reducer;

export default chatReducer;

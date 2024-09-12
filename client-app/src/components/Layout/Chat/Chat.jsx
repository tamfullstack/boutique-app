import React, { useEffect, useRef, useState } from "react";
import classes from "./Chat.module.css";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getRoomId, removeRoomId } from "../../../utils/roomId";
import {
  addSessionAction,
  deleteChatSession,
  getSessionAction,
  updateMessages,
  updateSessionAction,
} from "../../../store/chat";
import { url } from "../../../utils/url";

const socket = io(url);

export default function Chat() {
  const messagesRef = useRef();
  const { messages } = useSelector((state) => state.chat);
  const [enteredMessage, setEnteredMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const roomId = getRoomId();

    if (roomId) {
      dispatch(getSessionAction(roomId, scrollToClosestMessage));
    }

    socket.on("admin chat", (data) => {
      const roomId = getRoomId();

      if (data.action === "send") {
        if (roomId && roomId.toString() === data.roomId.toString()) {
          dispatch(getSessionAction(roomId, scrollToClosestMessage));
        }
      }

      if (data.action === "end") {
        if (roomId && roomId.toString() === data.roomId.toString()) {
          dispatch(updateMessages([]));
          removeRoomId();
        }
      }
    });
  }, [dispatch]);

  function scrollToClosestMessage() {
    if (
      messagesRef &&
      messagesRef.current &&
      messagesRef.current.scrollHeight
    ) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  const handleEnterMessage = (e) => {
    setEnteredMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = enteredMessage.trim();

    if (!message) {
      return;
    }

    const roomId = getRoomId();

    if (message === "/end") {
      if (roomId) {
        dispatch(deleteChatSession(roomId));
      }
    } else {
      if (!roomId) {
        dispatch(addSessionAction(message));
      } else {
        dispatch(updateSessionAction(roomId, message, scrollToClosestMessage));
      }
    }

    setEnteredMessage("");
  };

  const renderMessages = () => {
    return messages.map((message, index) => {
      if (message.sender === "admin") {
        return (
          <div
            className={`${classes["chat-message"]} ${classes.admin}`}
            key={index}
          >
            <i
              className="fa-solid fa-user-tie"
              style={{ fontSize: 30, margin: "0px 10px" }}
            />
            <div className={classes["chat-message-content"]}>
              ADMIN: {message.content}
            </div>
          </div>
        );
      }

      return (
        <div
          className={`${classes["chat-message"]} ${classes.client}`}
          key={index}
        >
          <div className={classes["chat-message-content"]}>
            {message.content}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.chat}>
      <div className={classes["chat-header"]}>
        <div className="row">
          <div className="col-8">
            <h5 className={classes["chat-header-title"]}>Customer Support</h5>
          </div>
          <div className="col-4">
            <button className={classes["chat-header-button"]}>
              Let's chat app
            </button>
          </div>
        </div>
      </div>
      <div className={classes["chat-body"]}>
        <div className="row">
          <div className="col-9">
            <div className={classes["chat-messages"]} ref={messagesRef}>
              {renderMessages()}
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes["chat-footer"]} app-background`}>
        <div className="row">
          <div className="col-9">
            <form onSubmit={handleSubmit} className={classes["chat-input"]}>
              <i className="fa-solid fa-user-tie" style={{ fontSize: 30 }} />
              <input
                type="text"
                placeholder="Enter Message!"
                style={{ border: "none" }}
                value={enteredMessage}
                onChange={handleEnterMessage}
              />
              <i className="fa-solid fa-paperclip" />
              <i className="fa-solid fa-face-smile" />
              <i className="fa-solid fa-paper-plane app-primary-color" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

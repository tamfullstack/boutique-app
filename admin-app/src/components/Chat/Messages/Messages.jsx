import React from "react";
import { useDispatch } from "react-redux";
import classes from "./Messages.module.css";
import { useState } from "react";
import { deleteChatSession, updateSessionAction } from "../../../store/chat";

export default function Messages({
  session,
  messagesRef,
  scrollToClosestMessage,
}) {
  const [enteredMessage, setEnteredMessage] = useState("");
  const dispatch = useDispatch();

  const handleEnterMessage = (e) => {
    setEnteredMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = enteredMessage.trim();

    if (!message) {
      return;
    }

    if (message === "/end") {
      dispatch(deleteChatSession(session._id));
    } else {
      dispatch(
        updateSessionAction(session._id, message, scrollToClosestMessage)
      );
      setEnteredMessage("");
    }
  };

  const renderMessages = () => {
    return session?.messages.map((message, index) => {
      if (message.sender === "client") {
        return (
          <div className={`${classes.message} ${classes.client}`} key={index}>
            <i className="fa-solid fa-user-tie" />
            <div className={classes["message-content"]}>
              Client: {message.content}
            </div>
          </div>
        );
      }

      return (
        <div className={`${classes.message} ${classes.admin}`} key={index}>
          <div className={classes["message-content"]}>
            You: {message.content}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={classes.messages}>
      <div className={classes["message-list"]} ref={messagesRef}>
        {renderMessages()}
      </div>
      <form onSubmit={handleSubmit} className={classes["message-input"]}>
        <input
          type="text"
          placeholder="Type and enter"
          value={enteredMessage}
          onChange={handleEnterMessage}
        />
        <i className="fa-solid fa-paper-plane app-primary-color" />
      </form>
    </div>
  );
}

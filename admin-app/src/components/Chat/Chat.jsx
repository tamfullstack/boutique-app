import React, { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Chat.module.css";
import Messages from "./Messages/Messages";
import {
  getContactsAction,
  getSession,
  getSessionAction,
} from "../../store/chat";
import { useRef } from "react";
import io from "socket.io-client";
import { useState } from "react";
import { url } from "../../utils/url";

const socket = io(url);

export default function Chat() {
  const currentUser = useRouteLoaderData("root");
  const navigate = useNavigate();
  const { contacts, session } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const messagesRef = useRef();
  const [contactQuery, setContactQuery] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(getContactsAction());
      scrollToClosestMessage();

      socket.on("client chat", (data) => {
        if (data.action === "send") {
          dispatch(getContactsAction());

          if (session && session._id.toString() === data.roomId.toString()) {
            dispatch(getSessionAction(session._id, scrollToClosestMessage));
          }
        }

        if (data.action === "end") {
          dispatch(getContactsAction());

          if (session && session._id.toString() === data.roomId.toString()) {
            dispatch(getSession(null));
          }
        }
      });
    }
  }, [session, currentUser, navigate, dispatch]);

  function scrollToClosestMessage() {
    if (
      messagesRef &&
      messagesRef.current &&
      messagesRef.current.scrollHeight
    ) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  const handleChangeContactQuery = (e) => {
    setContactQuery(e.target.value);
  };

  const handleSelectContact = async (roomId) => {
    dispatch(getSessionAction(roomId, scrollToClosestMessage));
  };

  const renderContacts = () => {
    return contacts
      .filter((contact) =>
        contact.toLowerCase().includes(contactQuery.trim().toLowerCase())
      )
      .map((contact, index) => {
        return (
          <div
            className={classes["chat-contact"]}
            key={index}
            onClick={() => {
              handleSelectContact(contact);
            }}
          >
            <i className="fa-solid fa-user-tie" />
            <span>{contact}</span>
          </div>
        );
      });
  };

  return (
    <>
      <h5>Chat</h5>
      <p>Apps / Chat</p>
      <div className={classes.chat}>
        <div className={classes["chat-contacts"]}>
          <div className={classes["chat-contacts-search"]}>
            <input
              type="text"
              placeholder="Search Contact"
              value={contactQuery}
              onChange={handleChangeContactQuery}
            />
          </div>
          <div className={classes["chat-contacts-list"]}>
            {renderContacts()}
          </div>
        </div>
        <div className={classes["chat-messages"]}>
          {session && (
            <Messages
              session={session}
              messagesRef={messagesRef}
              scrollToClosestMessage={scrollToClosestMessage}
            />
          )}
        </div>
      </div>
    </>
  );
}

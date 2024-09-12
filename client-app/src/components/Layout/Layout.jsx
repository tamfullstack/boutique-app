import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Chat from "./Chat/Chat";
import Loading from "./Loading/Loading";
import { useNavigation } from "react-router-dom";

export default function Layout({ children }) {
  const [showingChat, setShowingChat] = useState(false);
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const handleToggleChat = () => {
    setShowingChat(!showingChat);
  };

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <i
        className="fa-brands fa-facebook-messenger app-primary-color"
        style={{
          position: "fixed",
          top: "85%",
          left: "90%",
          fontSize: 50,
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={handleToggleChat}
      />
      {showingChat && <Chat />}
      {isLoading && <Loading />}
    </>
  );
}

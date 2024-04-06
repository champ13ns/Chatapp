// context API
import { createContext, useContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [selectedChat, setSelectedChat] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const userJSON = JSON.parse(userInfo);
    console.log("GLobal userstate ",userJSON)
    if (userJSON) {
      setUser(JSON.stringify(userJSON));
    }
  }, []);  

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats , setChats }}
    >
      {" "}
      {children}{" "}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

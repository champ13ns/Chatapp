// context API
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  console.log("First Line ChatProvider ")
  const [user, setUser] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");  
    const userJSON = JSON.parse(userInfo);
    console.log("GLobal userstate ",userJSON)
    if (userJSON) {
      setUser(JSON.stringify(userJSON));
    }
  }, [navigate]);  

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats , setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

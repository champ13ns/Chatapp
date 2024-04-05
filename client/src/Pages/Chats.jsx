import React from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/SideDrawer";
import MyChats from "../components/MyChats";
import { ChatBox } from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";
const Chats = () => {
  const x = ChatState();
  return (
    <>
        <SideDrawer/> 
        <Box d="flex" justifyContent="space-between" w={"100%"} h="90vh" p="10px" >
            <MyChats />
            <ChatBox />
        </Box>
        </>
  );
};

export default Chats;

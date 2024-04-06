import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Stack, Toast, useToast, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
const MyChats = () => {
  const [loggedUser, setloggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();
  const toast = useToast();

  function getSender(loggedUser , users){
    console.log(users)
    console.log("loggedUser ",loggedUser)
    let str =  users[0]._id === loggedUser.id ? users[1].username : users[0].username
    console.log("Sender ", str);
    return str;
  }

  const fetchChats = async function () {
    try {
      let userJSON = JSON.parse(user);
      const res = await fetch("http://localhost:5000/api/chats", {
        headers: {
          Authorization: `Bearer ${userJSON.token}`,
        },
      });
      let jsonRes;
      if (res.status === 200) {
        jsonRes = await res.json();
        setChats(jsonRes.allChats)
      }
      console.log("allChtas are ",chats)
    } catch (error) {
      console.log(error)
      toast({
        title: "Failed to load the chats!",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    let x = async () => {
      await fetchChats();
    }
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")))
    x()
  },[]);

  useEffect(()=>{
    console.log("selectedChat ",selectedChat)
    
  },[selectedChat])

  useEffect(()=>{
    console.log("all chats  ",chats)
    
  },[chats])

  return (
       selectedChat && 
    <Box
      display={"flex" }
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        d="flex"
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
      <Box
      >
        {
          chats ? (
            <Stack overflowY={"scroll"}  >
              {
                chats?.map((chat) => {
                  return(
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor={ 'pointer'}
                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat == chat ? "white" : "black"}
                    px={3}
                    py={4}
                    borderRadius={"lg"}
                    key={chat._id}
                  >
                    <Text  >
                      {!chat.isGroupChat ? (getSender(loggedUser , chat.users) ) : chat.chatName }
                    </Text>
                  </Box>)
                })
              }
            </Stack>
          ) : (
            <ChatLoading />
          )
        }
        </Box> 
    </Box>
  );
  
};

export default MyChats;

// import React from 'react'

// const MyChats = () => {
//   return (
//     <div>MyChats</div>
//   )
// }

// export default MyChats
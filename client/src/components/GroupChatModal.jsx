import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalHeader,
  Button,
  FormControl,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ChatContext, ChatState } from "../Context/ChatProvider";
import UserListItem from "./UserListItem.jsx";
import UserBadgeItem  from './UserBadgeItem.jsx';

const GroupChatModal = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [loading, setLoading] = useState();
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const JSONUser = JSON.parse(user);

  const handleGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast({
        title: "User already added",
        isClosable: true,
        duration: 3000,
        position: "top",
      });
      return;
    }
    setSelectedUser([...selectedUser, userToAdd]);
  };

  const handleDelete = (userToBeDeleted) => {
    console.log("del called");
    setSelectedUser(
      selectedUser?.filter((sel) => sel._id !== userToBeDeleted._id)
    );
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/users?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSONUser.token}`,
          },
        }
      );
      setLoading(false);
      if (res.status == 200) {
        const jsonRes = await res.json();
        setSearchRes(jsonRes.users);
        console.log("Users are ",jsonRes)
      } else {
        toast({
          message : "Cannot Fetch user",
          isClosable : true,
          duration : 3000
        })
      }
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUser) {
      toast({
        status: "warning",
        title: "Please fill all the fields",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      const res = await fetch(
        "http://localhost:5000/api/chats/createGroupChat",
        {
          method: "POST",
          headers : {
            'Authorization' : `Bearer ${JSON.parse(user).token}`,
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({
            chatName: groupChatName,
            users: JSON.stringify(selectedUser),
          }),
        }
      );
      if (res.status == 200) {
        const fullGroupChat = await res.json();
        setChats(fullGroupChat, [...chats]);  
        onClose();
        toast({
          title: "New Groupt Chat created",
          status: "Success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Error creating new group chat",
        status: "Error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        message: error.message,
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            display={"flex"}
            justifyContent={"center"}
          >
            Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="ChatName"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Input
                placeholder="Search User eg:Sachin"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
              {selectedUser?.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (
              <div>Loading : </div>
            ) : (
              searchRes?.slice(0,5).map((user) => 
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Creat Chat
            </Button>
            <Button></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;



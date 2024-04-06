import {
  Button,
  Box,
  Tooltip,
  Text,
  MenuButton,
  Menu,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Toast,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SearchIcon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { ChatContext, ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

const SideDrawer = () => {
  const toast = useToast();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  let x;
  if (user.length != 0) {
    x = JSON.parse(user);
  }
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchRes, setSearchRes] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logOutHandler = function () {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  async function accessChat(id) {
    try {
      setLoadingChat(true);
      const res = await fetch(`http://localhost:5000/api/chats/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${x.token}`,
        },
      });

      setLoadingChat(true);
      if (res.status === 200) {
        const chatjsonRes = await res.json();
        console.log(chatjsonRes);
        // if( chats &&  !chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(chatjsonRes);
        setLoadingChat(false);
        onClose();
      }
    } catch (err) {
      toast({
        title: "Cannot set chat",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  async function handleSearch() {
    if (!search) {
      toast({
        title: "Username/email can't be empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    }
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/users?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${x.token}`,
            "Content-type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        const resJson = await res.json();
        setSearchRes(resJson.users);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        status: "error",
        title: "Something wrrong happened",
        isClosable: true,
        position: "bottom-left",
        duration: 4000,
      });
    }
  }
  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        bg="white"
        w="100%"
        borderWidth={"4px solid black"}
      >
        <Tooltip label="Search user" hasArrow placement="bottom-end">
          <Button onClick={onOpen}>
            <SearchIcon />
            <Text display={{ base: "none", md: "flex" }} px="10px">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          {" "}
          संवाद{" "}
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon boxSize={8} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size={"sm"} cursor={"pointer"} name="Sachin Fuloria" />
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay></DrawerOverlay>
        <DrawerContent>
          <DrawerHeader onClick={onOpen}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                mr={2}
                placeholder="Search by email or username"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button isLoading={loading} onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              <>
                {searchRes &&
                  searchRes?.map((user, index) => (
                    <React.Fragment key={index}>
                      <UserListItem
                        user={user}
                        handleFunction={() => {
                          accessChat(user._id);
                        }}
                      />
                    </React.Fragment>
                  ))}
              </>
            )}
              {loadingChat && <Spinner ml="auto" display={"flex"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

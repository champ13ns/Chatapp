import React from "react";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { ChatState } from "./../Context/ChatProvider.jsx";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={2}
      borderRadius={"lg"}
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.username}
      <CloseIcon
        pl={1}
        onClick={() => {
          handleFunction
        }}
      />
    </Box>
  );
};

export default UserBadgeItem;

import React from 'react'
import { Avatar, Box , Text} from '@chakra-ui/react'

const UserListItem = ({user , handleFunction,  }) => {


  console.log("UserListItem")
  return (
    <Box onClick={handleFunction} cursor={"pointer"} bg={"#E8E8E8"} w={"100%"} display={"flex"} mb={2} p={3} alignItems={"center"}  _hover={
        {
            background : "#38B2AC",
            color : "white"
        }
    } color={"black"} px={3} py={4} borderRadius={"lg"} >
        <Avatar mr={2} src={user.pic} name={user.name} m={1} cursor={"pointer"} size={"sm"} />
        <Box>
            <Text fontSize={"xl"}  >{user.username}</Text> 
            <Text fontSize={"sm"} > <b>Email:</b> {user.email}</Text>    
        </Box>
    </Box>
  )
}

export default UserListItem
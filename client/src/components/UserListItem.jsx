import React from 'react'
import { Avatar, Box } from '@chakra-ui/react'

const UserListItem = ({user , handleFunction,  }) => {
  return (
    <Box onClick={handleFunction} cursor={"pointer"} bg={"#E8E8E8"} w={"100%"} display={"flex"} alignItems={"center"} color={"black"} px={3} py={4} borderRadius={"lg"} >
        <Avatar src={user.pic} name={user.name} cursor={"pointer"} size={"sm"} />
        <Box>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>    
        </Box>
    </Box>
  )
}

export default UserListItem
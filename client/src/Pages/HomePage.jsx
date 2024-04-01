import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { TabList, Tabs, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const HomePage = () => {
  return (
    <Container centerContent  >
      <Box m="2rem" bg="white" w="100%" display="flex" justifyContent="center" alignItems="center" >
        <Text fontSize="4xl"  >
        संवाद
        </Text>
      </Box>
      <Box  w="100%" bg="white" >
        <Tabs p={3} variant="soft-rounded">
          <TabList w="100%"  >
            <Tab w={"50%"} fontWeight="bold" ><h4>Login</h4></Tab>
            <Tab w={"50%"} >Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                <Login />
            </TabPanel>
            <TabPanel>
                <SignUp />  
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;

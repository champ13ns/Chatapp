import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TabList, Tabs, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import HomePage from "./Pages/HomePage";
import Chats from "./Pages/Chats";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<HomePage/>} />
      <Route path="/chats" element={<Chats />} />
      <Route />
    </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TabList, Tabs, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import HomePage from "./Pages/HomePage";

const App = () => {
  return (
    <div className="App" >
   <HomePage />
   </div>
  );
};

export default App;

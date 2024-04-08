import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Chats from "./Pages/Chats";


const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" exact element={<HomePage/>} />
      <Route path="/chats" element={<Chats />} />
      </Routes>
      </div>  
  );
};

export default App;

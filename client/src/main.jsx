import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter , RouterProvider  } from 'react-router-dom'
import Chats from './Pages/Chats.jsx'
import { ChatProvider } from './Context/ChatProvider.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <ChatProvider>
      <App  />
    </ChatProvider>
    </ChakraProvider>
  </React.StrictMode>,
)

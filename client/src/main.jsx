import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter , RouterProvider  } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={router} />
    {/* <App /> */}
    </ChakraProvider>
  </React.StrictMode>,
)

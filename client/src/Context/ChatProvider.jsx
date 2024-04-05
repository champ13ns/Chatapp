// context API
import { createContext, useContext, useState, useEffect } from "react";


export const ChatContext = createContext();

export const  ChatProvider = ({children}) => {
    const [user , setUser] = useState('');    
    useEffect(()=> {
        const userInfo = localStorage.getItem("userInfo")
        const userJSON = JSON.parse(userInfo);
        if(userJSON){
            setUser(JSON.stringify(userJSON));
        }
    },[user])

    return <ChatContext.Provider value={{user ,setUser}} > {children} </ChatContext.Provider>  
}

export const ChatState = ()=>{
    return useContext(ChatContext)
}

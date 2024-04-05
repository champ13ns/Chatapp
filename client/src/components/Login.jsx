import React , {useState} from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  VStack,
  StackDivider,
  Toast, useToast
} from "@chakra-ui/react";
import {json, useNavigate} from 'react-router-dom'


const Login = () => {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [loading ,setLoading] = useState(false)
  const [showToast , setShowToast] = useState(false)
  const navigate = useNavigate();
  const toast = useToast();
  

  const handleLogin = async function(){
    console.log(email, password)
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/users/login',{
      method : 'POST',
      body :   JSON.stringify({
        email : email,
        password : password
      }),
      headers:{
        "Content-type" : "application/json" 
      }
    });
    const jsonRes = await res.json();
    console.log("jsonRes is ",jsonRes)
      if(res.status == 200){
     localStorage.setItem('userInfo',JSON.stringify(jsonRes))
      navigate('/chats');

    } else{
      toast({
        title: "Wrong Credentials",
        status: "Error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
    console.log(jsonRes)
  }
  return (
    <VStack spacing={3} >
      <FormControl>
        <FormLabel  >Email</FormLabel>
        <Input  onChange={(e)=> setEmail(e.target.value)} value={email}  type="email" />

        <FormLabel>Password</FormLabel>
        <Input onChange={(e) => setPassword(e.target.value)} value={password} type="email" />

      </FormControl>

      <Button marginTop="4px" w="100%" colorScheme="blue" isLoading={loading} onClick={handleLogin}   >
          Login
        </Button>
        <Button marginTop="4px" w="100%" type="password" isLoading={loading}  colorScheme="green" onClick={()=> {
          setLoading(true)
          setEmail('a@a.com')
           setPassword('12345678')
           setLoading(false)
        }} >
          Get Guest Credentials
        </Button>
        {
          showToast &&   <Alert  status='error'>
          <AlertIcon />
          Wrong Credentials
        </Alert>
        }
    </VStack>
  );
};

export default Login;

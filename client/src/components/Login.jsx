import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <VStack spacing={3} >
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" />

        <FormLabel>Password</FormLabel>
        <Input type="email" />

      </FormControl>

      <Button marginTop="4px" w="100%" colorScheme="blue">
          Login
        </Button>
        <Button marginTop="4px" w="100%" colorScheme="green">
          Get Guest Credentials
        </Button>
    </VStack>
  );
};

export default Login;

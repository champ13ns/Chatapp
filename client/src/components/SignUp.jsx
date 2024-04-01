import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  VStack,
} from "@chakra-ui/react";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const profileImageDetails = (img) => {

  }

  return (
    <VStack spacing={3}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          onChange={(e) => setUserName(e.target.value)}
          required
          type="text"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input value={password}  onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormControl>
      <FormControl>
        <FormLabel>Upload Profile Image</FormLabel>
        <Input
        type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </FormControl>
      <Button w="100%" colorScheme="blue">
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;

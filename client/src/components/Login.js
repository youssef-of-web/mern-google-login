import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { AiFillGoogleCircle, AiFillCheckCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Login() {
  let [searchParams] = useSearchParams();
  const [user, setUser] = useState({});
  const email = searchParams.get("email");
  const fullname = searchParams.get("fullname");
  const secret = searchParams.get("secret");
  useEffect(() => {
    if (email && fullname && secret) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          fullname,
          secret,
        })
      );
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  return (
    <div style={{ background: "url('/background.jpg')", height: "100vh" }}>
      <Container maxW={"2xl"} centerContent>
        <Box w={"100%"} mt="4" bg={"white"} p="4" rounded={"md"}>
          {user && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle> welcome {user.email}</AlertTitle>
            </Alert>
          )}
          {!user && (
            <form action="http://localhost:5000/auth/google">
              <VStack w={"100%"}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Button
                  leftIcon={<AiFillCheckCircle />}
                  colorScheme="blue"
                  variant="solid"
                  w={"100%"}
                >
                  Submit
                </Button>
                <Button
                  leftIcon={<AiFillGoogleCircle />}
                  colorScheme="red"
                  variant="solid"
                  w={"100%"}
                  type="submit"
                >
                  Google
                </Button>
              </VStack>
            </form>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default Login;

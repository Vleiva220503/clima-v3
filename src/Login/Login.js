import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const Login = ({ onRegister, onResetPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("¡Acceso concedido!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.800")}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        rounded="lg"
        shadow="md"
        w="full"
        maxW="md"
      >
        <Heading mb={6} textAlign="center">
          Iniciar Sesión
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" w="full">
              Iniciar Sesión
            </Button>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              ¿No tienes una cuenta?{" "}
              <Button variant="link" colorScheme="blue" onClick={onRegister}>
                Regístrate aquí
              </Button>
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              ¿Olvidaste tu contraseña?{" "}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={onResetPassword}
              >
                Restablecer contraseña
              </Button>
            </Text>
          </VStack>
        </form>
        {message && (
          <Text mt={4} color="red.500" textAlign="center">
            {message}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Login;

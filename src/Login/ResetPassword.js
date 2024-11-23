import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
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

const ResetPassword = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "¡Correo enviado! Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
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
          Restablecer Contraseña
        </Heading>
        <form onSubmit={handlePasswordReset}>
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
            <Button type="submit" colorScheme="blue" w="full">
              Enviar Correo
            </Button>
            <Button variant="link" colorScheme="blue" onClick={onLogin}>
              Volver a Iniciar Sesión
            </Button>
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

export default ResetPassword;

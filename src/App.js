import React, { useState } from "react";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

//import Login from "../"
import Login from "./Login/Login";
import Register from "./Login/Register";
import ResetPassword from "./Login/ResetPassword";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("login");
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box>
      <IconButton
        position="absolute"
        top={4}
        right={4}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        aria-label="Toggle Theme"
      />
      {currentScreen === "login" && (
        <Login
          onRegister={() => setCurrentScreen("register")}
          onResetPassword={() => setCurrentScreen("reset")}
        />
      )}
      {currentScreen === "register" && (
        <Register onLogin={() => setCurrentScreen("login")} />
      )}
      {currentScreen === "reset" && (
        <ResetPassword onLogin={() => setCurrentScreen("login")} />
      )}
    </Box>
  );
};

export default App;

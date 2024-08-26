import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Flex, useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactCountryFlag from "react-country-flag";
import { BiMoon, BiSun } from "react-icons/bi"; 
import WeatherPanel from "./components/WeatherPanel";

const App = () => {
  const { t, i18n } = useTranslation("global");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  }, [i18n]);

  useEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  const queryClient = new QueryClient();

  // Modo oscuro
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Flex justify="space-between" p={4} align="center">
          <Flex>
            <IconButton
              icon={
                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{
                    width: '2em',
                    height: '1.5em',
                  }}
                />
              }
              aria-label="Change to English"
              onClick={() => changeLanguage("en")}
              variant="ghost"
              mr={2}
            />
            <IconButton
              icon={
                <ReactCountryFlag
                  countryCode="ES"
                  svg
                  style={{
                    width: '2em',
                    height: '1.5em',
                  }}
                />
              }
              aria-label="Cambiar a Español"
              onClick={() => changeLanguage("es")}
              variant="ghost"
            />
          </Flex>
          <IconButton
            icon={colorMode === "light" ? <BiMoon size="1.5em" /> : <BiSun size="1.5em" />}
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
        <Box textAlign="center">
          <h1>{t("Weather")}</h1>
          <WeatherPanel />
        </Box>
      </Box>
    </QueryClientProvider>
  );
};

export default App;

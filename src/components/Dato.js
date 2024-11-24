import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18next from "i18next";
import { ChakraProvider, Box, IconButton, Flex, useColorMode } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactCountryFlag from "react-country-flag";
import { BiMoon, BiSun } from "react-icons/bi";
import global_en from "../i18next/en/global.json";
import global_es from "../i18next/en/global.json";
import WeatherPanel from "./WeatherPanel";
import "../assets/css/index.css";

// Configuración de i18next
i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("language") || "en",
  resources: {
    en: { global: global_en },
    es: { global: global_es },
  },
});

const Dato = () => {
  const { t, i18n } = useTranslation("global");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  const changeLanguage = useCallback(
    (lang) => {
      setLanguage(lang);
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    },
    [i18n]
  );

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
                    width: "2em",
                    height: "1.5em",
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
                    width: "2em",
                    height: "1.5em",
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

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ChakraProvider>
        <Dato />
      </ChakraProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export default Dato;

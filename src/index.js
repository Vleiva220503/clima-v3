import ReactDOM from "react-dom";
import React from "react";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

import global_en from "./i18next/en/global.json";
import global_es from "./i18next/es/global.json";
import "./assets/css/index.css";

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

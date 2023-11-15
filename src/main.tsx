import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import QueueProvider from "./contexts/QueueContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueueProvider>
        <App />
      </QueueProvider>
    </ChakraProvider>
  </React.StrictMode>
);

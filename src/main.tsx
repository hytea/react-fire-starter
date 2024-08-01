import { CookieConsentProvider } from "@use-cookie-consent/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <CookieConsentProvider>
        <App />
      </CookieConsentProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

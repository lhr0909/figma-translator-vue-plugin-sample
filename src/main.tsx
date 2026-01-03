import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import { App } from "@/App";
import { StoreProvider } from "@/store/StoreContext";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
);

import React from "react";
import keycloak from "./keycloak";
import { useAppDispatch } from "./app/hook";
import { login } from "./features/auth/authSlice";
import axios from "axios";
// routes
import Router from "./routes";
//components
import ScrollToTop from "./components/ScrollToTop";

function App() {
  
  return (
    <>
      <ScrollToTop />
      <Router />
    </>
  );
}

export default App;

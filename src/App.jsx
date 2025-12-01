import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import AuthProvider from "./contexts/auth";
import "./App.css";

export default function App() {
  const [count] = useState(0)

  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

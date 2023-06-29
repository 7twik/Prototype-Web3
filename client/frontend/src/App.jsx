import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { EthProvider } from "./contexts/EthContext";

function App() {
  return (
    <>
    <EthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </EthProvider>
    </>
  );
}

export default App;

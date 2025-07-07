import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MorseEncoder from "./components/MorseEncoder";
import MorseReference from "./components/MorseReference";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MorseEncoder />} />
        <Route path="/reference" element={<MorseReference />} />
      </Routes>
    </div>
  );
}

export default App;

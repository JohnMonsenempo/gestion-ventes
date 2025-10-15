import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Produits from "./pages/Produits";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Produits />} />
        </Routes>
      </div>
    </>
  );
}

export default App;


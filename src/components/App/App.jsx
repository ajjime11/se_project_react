import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "../../index.css";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/defaultClothingItems";

// TODO - apply all styles from the Figma to all the components
// TODO - set up the fonts
// TODO - implement footer
// TODO - modals

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  return (
    <div className="app">
      <Header />
      <Main clothingItems={clothingItems} />
      <Footer />
    </div>
  );
}

export default App;

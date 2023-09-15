import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Fragment } from "react";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";

const App = () => {
  return (
    <ContactState>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    </ContactState>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import ContributeLayout from "./layout/ContributeLayout";
import ExploreLayout from "./layout/ExploreLayout";
import Assessment from "./pages/Assessment";
import Stories from "./pages/Stories";
import SingleResponse from "./pages/SingleResponse";
import Contact from "./pages/Contact";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const themeColorMeta = document.querySelector("meta[name='theme-color']");
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", "#ffffff");
    }
  }, []);
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreLayout />} />
          <Route path="/feedback" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contribute" element={<ContributeLayout />} /> */}
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/response/:responseId" element={<SingleResponse />} />
        </Routes>
      </main>
    </>
  );
}

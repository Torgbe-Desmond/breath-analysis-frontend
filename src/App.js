import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Header from "./Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Assessment from "./pages/Assessment";
import Stories from "./pages/Stories";
import SingleResponse from "./pages/SingleResponse";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import ExploreLayout from "./layout/ExploreLayout";
import ContributeLayout from "./layout/ContributeLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

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
          {/* 🔓 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Contact />} />
          <Route path="/response/:responseId" element={<SingleResponse />} />

          {/* 🔒 Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/explore" element={<ExploreLayout />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/contribute" element={<ContributeLayout />} />
          </Route>

          {/* ❌ 404 fallback (optional) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

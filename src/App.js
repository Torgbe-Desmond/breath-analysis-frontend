import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ExploreLayout from "./layout/ExploreLayout";
import Assessment from "./pages/Assessment";
import SingleResponse from "./pages/SingleResponse";
import Contact from "./pages/Contact";
import { useTheme } from "@emotion/react";
import SuccessStoryView from "./pages/SuccessStoryView";
import SuccessStoryForm from "./pages/SuccessStoryForm";

export default function App() {
  const theme = useTheme();
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme.palette.primary.main);
    }
  }, [theme.palette.primary.main]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<ExploreLayout />} />
          <Route path="feedback" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="response/:responseId" element={<SingleResponse />} />
          <Route path="stories" element={<SuccessStoryView />} />
          <Route path="stories/form" element={<SuccessStoryForm />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

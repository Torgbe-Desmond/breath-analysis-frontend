import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Explore from "./pages/Explore";
import Placeholder from "./pages/Placeholder";
import "./App.css";
import ContributeLayout from "./layout/ContributeLayout";
import ExploreLayout from "./layout/ExploreLayout";
import Assessment from "./pages/Assessment";
import Stories from "./pages/Stories";
import SingleResponse from "./pages/SingleResponse";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreLayout />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contribute" element={<ContributeLayout />} /> */}
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/response/:responseId" element={<SingleResponse />} />
        </Routes>
      </main>
    </>
  );
}

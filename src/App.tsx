import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import React, { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./components/HomePage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const CoursesPage = lazy(() => import("./components/CoursesPage"));
const VideosPage = lazy(() => import("./components/VideosPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
import { AdminPanel } from "./components/AdminPanel";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const getInitialTab = () => {
  const path = window.location.pathname.replace("/", "");

  if (path === "contact") return "contact";
  if (path === "courses") return "courses";
  if (path === "about") return "about";
  if (path === "videos") return "videos";

  return "home";
};

const [activeTab, setActiveTab] = useState(getInitialTab());

  const [showAdmin, setShowAdmin] = useState(false);

  // ADMIN MODE CHECK
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("admin") === "true") {
      setShowAdmin(true);
    }
  }, []);

// 🔥 Sync tab when URL changes (back/forward/manual URL)
useEffect(() => {
  const handlePopState = () => {
    const path = window.location.pathname.replace("/", "");

    if (path === "contact") setActiveTab("contact");
    else if (path === "courses") setActiveTab("courses");
    else if (path === "about") setActiveTab("about");
    else if (path === "videos") setActiveTab("videos");
    else setActiveTab("home");
  };

  window.addEventListener("popstate", handlePopState);
  handlePopState(); // run on load

  return () => window.removeEventListener("popstate", handlePopState);
}, []);

  // ✅ SEO META + TITLE PER COURSE URL
  useEffect(() => {
    const path = window.location.pathname;

    if (path.includes("200-hour-yoga-teacher-training-rishikesh")) {
      document.title =
        "200 Hour Yoga Teacher Training in Rishikesh | Shivaya Yogashala";
      setMeta(
        "Join 200 Hour Multi-style Yoga Teacher Training in Rishikesh, India. Hatha, Ashtanga, Philosophy, Meditation & Certification at Shivaya Yogashala."
      );
    }

    if (path.includes("300-hour-yoga-teacher-training-rishikesh")) {
      document.title =
        "300 Hour Yoga Teacher Training in Rishikesh | Advanced TTC";
      setMeta(
        "Advance your journey with 300 Hour Yoga Teacher Training in Rishikesh. Deep practice, alignment, philosophy and Yoga Alliance certification."
      );
    }

    if (path.includes("500-hour-yoga-teacher-training-rishikesh")) {
      document.title =
        "500 Hour Yoga Teacher Training in Rishikesh | Complete Course";
      setMeta(
        "Complete 500 Hour Yoga Teacher Training in Rishikesh combining 200 + 300 hours. Master Hatha, Ashtanga and meditation at Shivaya Yogashala."
      );
    }
  }, []);

  function setMeta(description: string) {
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }

  if (showAdmin) {
    return (
      <div className="min-h-screen">
        <AdminPanel />
        <Toaster />
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={setActiveTab} />;
      case "about":
        return <AboutPage />;
      case "courses":
        return <CoursesPage onNavigate={setActiveTab} />;
      case "videos":
        return <VideosPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
  activeTab={activeTab}
  onTabChange={(tab) => {
    setActiveTab(tab);
    window.history.pushState({}, "", tab === "home" ? "/" : `/${tab}`);
  }}
/>

      <main className="flex-1">
  <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
    <AnimatePresence mode="wait">
      <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
</AnimatePresence>
</Suspense>
</main>
      <Footer
  onTabChange={(tab) => {
    setActiveTab(tab);
    window.history.pushState({}, "", tab === "home" ? "/" : `/${tab}`);
  }}
/>

      <Toaster />
    </div>
  );
}
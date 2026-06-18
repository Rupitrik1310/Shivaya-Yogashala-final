import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import React, { lazy, Suspense } from "react";
import { getNavItemById, getNavItemByPath, type PageKey } from "./navigation";

const HomePage = lazy(() => import("./components/HomePage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const CoursesPage = lazy(() => import("./components/CoursesPage"));
const GalleryPage = lazy(() => import("./components/GalleryPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));
import { AdminPanel } from "./components/AdminPanel";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const getInitialTab = () => {
    return getNavItemByPath(window.location.pathname).id;
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
    setActiveTab(getNavItemByPath(window.location.pathname).id);
  };

  window.addEventListener("popstate", handlePopState);
  handlePopState(); // run on load

  return () => window.removeEventListener("popstate", handlePopState);
}, []);

useEffect(() => {
  if (window.location.pathname === "/contact" || window.location.pathname === "/apply") {
    window.history.replaceState({}, "", "/apply-now");
  }
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

  const activeNavItem = getNavItemById(activeTab);
  const activePage: PageKey = activeNavItem.page;

  const navigateTo = (tab: string) => {
    const navItem = getNavItemById(tab);
    setActiveTab(navItem.id);
    window.history.pushState({}, "", navItem.path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage onNavigate={navigateTo} />;
      case "about":
        return <AboutPage />;
      case "courses":
        return <CoursesPage activeTab={activeTab} onNavigate={navigateTo} />;
      case "gallery":
        return <GalleryPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeTab={activeTab}
        activePage={activePage}
        onTabChange={navigateTo}
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
        onTabChange={navigateTo}
      />

      <Toaster />
    </div>
  );
}

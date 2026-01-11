import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { CoursesPage } from "./components/CoursesPage";
import { VideosPage } from "./components/VideosPage";
import { ContactPage } from "./components/ContactPage";
import { AdminPanel } from "./components/AdminPanel";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Check if admin mode should be shown (when URL has ?admin=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdmin(true);
    }
  }, []);

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
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
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
      </main>
      <Footer onTabChange={setActiveTab} />
      <Toaster />
    </div>
  );
}
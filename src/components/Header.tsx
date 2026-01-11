import { Menu } from "lucide-react";
import { useState } from "react";
import shivaLogo from 'figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png';
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "courses", label: "Courses & TTC" },
    { id: "videos", label: "Asana Library" },
    { id: "contact", label: "Apply Now" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-primary shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={() => onTabChange("home")}
            >
              <img 
                src={shivaLogo} 
                alt="Shiva Logo" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain logo-no-bg transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-3xl md:text-4xl tracking-wider text-primary" 
                    style={{ fontWeight: 600, letterSpacing: '0.15em' }}
                  >
                    SYS
                  </span>
                </div>
                <p 
                  className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5" 
                  style={{ letterSpacing: '0.2em' }}
                >
                  Yogashala
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-4 py-2 rounded-md transition-all ${
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="flex md:hidden items-center justify-center w-12 h-12 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all shadow-lg active:scale-95"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </>
  );
}

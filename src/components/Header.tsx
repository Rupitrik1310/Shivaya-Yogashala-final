import { ChevronDown, Mail, MapPin, Menu, Phone } from "lucide-react";
import { useState } from "react";
import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import { MobileMenu } from "./MobileMenu";
import { isNavGroupActive, primaryNavItems, type PageKey } from "../navigation";

interface HeaderProps {
  activeTab: string;
  activePage: PageKey;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, activePage, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="site-top-strip">
          <div className="container mx-auto px-4">
            <div className="site-top-strip-inner">
              <span className="site-top-strip-item">
                <MapPin size={14} />
                Upper Tapovan, Rishikesh
              </span>
              <span className="site-top-strip-item">
                Yoga Alliance TTC: 100, 200, 300 & 500 Hours
              </span>
              <a href="tel:+919693054028" className="site-top-strip-item site-top-strip-link">
                <Phone size={14} />
                +91 9693054028
              </a>
              <a
                href="mailto:shivayayogashala09@gmail.com"
                className="site-top-strip-item site-top-strip-link"
              >
                <Mail size={14} />
                shivayayogashala09@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="site-header-main">
            <button className="site-brand" onClick={() => onTabChange("home")} aria-label="Go to home page">
              <img src={shivaLogo} alt="Shiva Logo" className="site-brand-logo logo-no-bg" />
              <span className="site-brand-text">
                <span>SYS</span>
                <small>Yogashala</small>
              </span>
            </button>

            <nav className="desktop-nav" aria-label="Primary navigation">
              {primaryNavItems.map((item) => {
                const active = isNavGroupActive(item, activePage) && !item.highlight;
                const hasChildren = Boolean(item.children?.length);

                if (hasChildren) {
                  return (
                    <div className="desktop-nav-group" key={item.id}>
                      <button
                        className={`desktop-nav-link ${active ? "is-active" : ""}`}
                        onClick={() => onTabChange(item.id)}
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {item.label}
                        <ChevronDown size={15} />
                      </button>
                      <div className="desktop-dropdown" role="menu">
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            className={`desktop-dropdown-link ${activeTab === child.id ? "is-active" : ""}`}
                            onClick={() => onTabChange(child.id)}
                            role="menuitem"
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`desktop-nav-link ${active ? "is-active" : ""} ${
                      item.highlight ? "is-highlighted" : ""
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              className="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        activePage={activePage}
        onTabChange={onTabChange}
      />
    </>
  );
}

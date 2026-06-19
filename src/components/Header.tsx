import { ChevronDown, Mail, MapPin, Menu, Phone } from "lucide-react";
import { useState } from "react";
import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import { MobileMenu } from "./MobileMenu";
import { SkipLink } from "./SkipLink";
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
      {/* Skip to main content link for keyboard navigation */}
      <SkipLink 
        href="#main-content" 
        targetId="main-content"
        label="Skip to main content"
      />

      <header className="site-header" role="banner">
        <div className="site-top-strip">
          <div className="container mx-auto px-4">
            <div className="site-top-strip-inner">
              <span className="site-top-strip-item" aria-label="Location">
                <MapPin size={14} aria-hidden="true" />
                <span>Upper Tapovan, Rishikesh</span>
              </span>
              <span className="site-top-strip-item" aria-label="Yoga Alliance certification">
                Yoga Alliance TTC: 100, 200, 300 & 500 Hours
              </span>
              <a 
                href="tel:+919693054028" 
                className="site-top-strip-item site-top-strip-link"
                aria-label="Call +91 9693054028"
              >
                <Phone size={14} aria-hidden="true" />
                <span>+91 9693054028</span>
              </a>
              <a
                href="mailto:shivayayogashala09@gmail.com"
                className="site-top-strip-item site-top-strip-link"
                aria-label="Email shivayayogashala09@gmail.com"
              >
                <Mail size={14} aria-hidden="true" />
                <span>shivayayogashala09@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="site-header-main">
            <button 
              className="site-brand" 
              onClick={() => onTabChange("home")} 
              aria-label="Shivaya Yogashala - Go to home page"
              aria-current={activePage === 'home' ? 'page' : undefined}
            >
              <img 
                src={shivaLogo} 
                alt="Shivaya Yogashala logo" 
                className="site-brand-logo logo-no-bg" 
              />
              <span className="site-brand-text">
                <span>SYS</span>
                <small>Yogashala</small>
              </span>
            </button>

            <nav className="desktop-nav" aria-label="Main navigation">
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
                        aria-label={item.label}
                      >
                        {item.label}
                        <ChevronDown 
                          size={15} 
                          aria-hidden="true"
                          className="ml-1"
                        />
                      </button>
                      <div className="desktop-dropdown" role="menu" aria-label={`${item.label} submenu`}>
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            className={`desktop-dropdown-link ${activeTab === child.id ? "is-active" : ""}`}
                            onClick={() => onTabChange(child.id)}
                            role="menuitem"
                            aria-label={child.label}
                            aria-current={activeTab === child.id ? 'page' : undefined}
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
                    aria-label={item.label}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <button
              className="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              title="Toggle navigation menu"
            >
              <Menu 
                size={28} 
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        activePage={activePage}
        onTabChange={onTabChange}
      />
    </>
  );
}

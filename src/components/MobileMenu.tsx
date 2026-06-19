import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import shivaLogo from "../assets/shivaya-yoga-logo.webp";
import { isNavGroupActive, primaryNavItems, type PageKey } from "../navigation";

interface MobileMenuProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  activePage: PageKey;
  onTabChange: (tab: string) => void;
}

export function MobileMenu({ id = 'mobile-menu', isOpen, onClose, activeTab, activePage, onTabChange }: MobileMenuProps) {
  const [openGroup, setOpenGroup] = useState<string | null>(
    activePage === "about" ? "about" : activePage === "courses" ? "courses" : null
  );

  if (!isOpen) return null;

  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    onClose();
  };

  return (
    <>
      <div className="mobile-menu-backdrop" onClick={onClose} aria-hidden="true" />

      <aside 
        id={id}
        className="mobile-menu-panel" 
        role="dialog" 
        aria-modal="true" 
        aria-label="Navigation menu"
      >
        <div className="mobile-menu-header">
          <button className="mobile-menu-brand" onClick={() => handleItemClick("home")}>
            <img src={shivaLogo} alt="Shivaya Yogashala Logo" className="logo-no-bg" />
            <span>
              <strong>Shivaya Yogashala</strong>
              <small>International Yoga School</small>
            </span>
          </button>

          <button className="mobile-menu-close" onClick={onClose} aria-label="Close navigation menu">
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        <nav className="mobile-menu-nav" aria-label="Mobile navigation">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const active = isNavGroupActive(item, activePage) && !item.highlight;
            const hasChildren = Boolean(item.children?.length);
            const expanded = openGroup === item.id;

            if (hasChildren) {
              return (
                <div className="mobile-menu-group" key={item.id}>
                  <button
                    className={`mobile-menu-link ${active ? "is-active" : ""}`}
                    onClick={() => setOpenGroup(expanded ? null : item.id)}
                    aria-expanded={expanded}
                  >
                    {Icon && <Icon size={20} />}
                    <span>{item.label}</span>
                    <ChevronDown size={18} className={expanded ? "is-rotated" : ""} />
                  </button>

                  {expanded && (
                    <div className="mobile-submenu">
                      <button className="mobile-submenu-link" onClick={() => handleItemClick(item.id)}>
                        Overview
                      </button>
                      {item.children?.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.id}
                            className={`mobile-submenu-link ${activeTab === child.id ? "is-active" : ""}`}
                            onClick={() => handleItemClick(child.id)}
                          >
                            {ChildIcon && <ChildIcon size={17} />}
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`mobile-menu-link ${active ? "is-active" : ""} ${
                  item.highlight ? "is-highlighted" : ""
                }`}
                aria-current={active ? "page" : undefined}
              >
                {Icon && <Icon size={20} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

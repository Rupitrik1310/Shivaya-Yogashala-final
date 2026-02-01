import { X, Home, Users, BookOpen, Video, Send } from 'lucide-react';
import shivaLogo from '../assets/shivaya-yoga-logo.webp';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Us', icon: Users },
  { id: 'courses', label: 'Courses & TTC', icon: BookOpen },
  { id: 'videos', label: 'Asana Library', icon: Video },
  { id: 'contact', label: 'Apply Now', icon: Send },
];

export function MobileMenu({ isOpen, onClose, activeTab, onTabChange }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleItemClick = (id: string) => {
    onTabChange(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop - Lighter so homepage is visible */}
      <div
        className="fixed inset-0 bg-black/20 z-[100] md:hidden transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel - Mirror-like transparent glass effect */}
      <div 
        className="fixed top-0 right-0 bottom-0 w-[320px] z-[101] md:hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Glass mirror background - transparent with blur */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/70">
          {/* Teal tint overlay - very subtle */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5" />
          
          {/* Mirror shine effect - top to bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/20" />
          
          {/* Glass edge highlight */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-white/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header - Following UX: Clear visual hierarchy */}
          <div className="px-6 py-5 border-b border-primary/15 backdrop-blur-sm bg-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-primary" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '1.3' }}>
                  Navigation
                </h2>
                <p className="text-muted-foreground mt-1" style={{ fontSize: '13px' }}>
                  Shivaya Yogashala
                </p>
              </div>
              
              {/* Close button - UX: Minimum 44x44px touch target */}
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 flex items-center justify-center transition-all duration-200 active:scale-95 border border-primary/20"
                aria-label="Close navigation menu"
              >
                <X size={24} className="text-primary" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Menu Items - UX: Generous spacing, clear touch targets */}
          <nav className="flex-1 py-3 overflow-y-auto" role="navigation">
            <div className="px-3 space-y-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full px-4 py-4 rounded-xl flex items-center gap-4 
                      transition-all duration-200 group backdrop-blur-sm
                      ${isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-white/50 hover:bg-white/70 text-foreground border border-white/60'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Icon container - UX: Visual grouping with background */}
                    <div 
                      className={`
                        p-2.5 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-white/20' 
                          : 'bg-primary/15 group-hover:bg-primary/20 backdrop-blur-sm'
                        }
                      `}
                    >
                      <Icon 
                        size={22} 
                        className={isActive ? 'text-white' : 'text-primary'}
                        strokeWidth={2}
                      />
                    </div>
                    
                    {/* Label - UX: Clear, readable text */}
                    <span style={{ 
                      fontSize: '15px',
                      fontWeight: isActive ? 600 : 500,
                      lineHeight: '1.4'
                    }}>
                      {item.label}
                    </span>

                    {/* Active indicator - UX: Additional visual feedback */}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer - UX: Branded closure with visual hierarchy */}
          <div className="px-6 py-6 border-t border-primary/15 backdrop-blur-sm bg-white/20">
            <div className="text-center">
              {/* Shiva Logo - UX: Brand identity with proper spacing */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/60 backdrop-blur-sm mb-3 border border-primary/20 shadow-md p-2">
                <img 
                  src={shivaLogo} 
                  alt="Shivaya Yogashala Logo" 
                  className="w-full h-full object-contain logo-no-bg"
                />
              </div>
              
              {/* Text hierarchy - UX: Primary and secondary information clearly distinguished */}
              <p className="text-primary" style={{ fontSize: '15px', fontWeight: 600 }}>
                Shivaya Yogashala
              </p>
              <p className="text-muted-foreground mt-1" style={{ fontSize: '12px' }}>
                सर्वे भवन्तु सुखिनः
              </p>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: '11px' }}>
                May all beings be happy
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

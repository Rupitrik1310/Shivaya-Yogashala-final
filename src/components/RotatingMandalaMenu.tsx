import { motion, AnimatePresence } from 'motion/react';
import { X, Home, Users, BookOpen, Video, Send } from 'lucide-react';

interface RotatingMandalaMenuProps {
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

export function RotatingMandalaMenu({ 
  isOpen, 
  onClose, 
  activeTab, 
  onTabChange 
}: RotatingMandalaMenuProps) {
  const handleItemClick = (id: string) => {
    onTabChange(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-[300px] shadow-2xl overflow-hidden"
          >
            {/* Mirror-like gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              
              {/* Glossy reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
              
              {/* Bottom shadow for depth */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-white/20">
                <div>
                  <h2 className="text-white text-xl">Navigation</h2>
                  <p className="text-white/80 text-sm mt-1">Menu</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-4 overflow-y-auto">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full px-6 py-4 flex items-center gap-4 transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/25 backdrop-blur-sm border-l-4 border-white shadow-lg' 
                          : 'hover:bg-white/10 backdrop-blur-sm border-l-4 border-transparent'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-white/20' : 'bg-white/10'
                      }`}>
                        <Icon 
                          size={22} 
                          className="text-white"
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>
                      <span 
                        className="text-white"
                        style={{ fontWeight: isActive ? 'bold' : 'normal' }}
                      >
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer with Om Symbol */}
              <div className="p-6 border-t border-white/20">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                    <span className="text-3xl text-white">ॐ</span>
                  </div>
                  <p className="text-white/90 text-sm">Shivaya Yogashala</p>
                  <p className="text-white/70 text-xs mt-1">सर्वे भवन्तु सुखिनः</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

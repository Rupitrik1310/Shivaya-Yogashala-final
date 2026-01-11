import { ChakraBar } from "./ChakraBar";
import {
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import shivaLogo from "figma:asset/dda3bf9d206010d15993d348fc449c47e604a2d7.png";

interface FooterProps {
  onTabChange?: (tab: string) => void;
}

export function Footer({ onTabChange }: FooterProps) {
  const handleNavigation = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal text-off-white">
      {/* Chakra Bar */}
      <div className="bg-primary/10">
        <div className="container mx-auto px-4">
          <ChakraBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={shivaLogo}
                alt="Shiva Logo"
                className="w-12 h-12 object-contain logo-no-bg"
              />
              <h3 className="text-secondary">
                Shivaya Yogashala
              </h3>
            </div>
            <p className="text-sm text-ash-grey mb-4">
              Traditional Indian Yoga & Teacher Training Center.
              Rooted in Rishikesh - The Yoga Capital of the
              World.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="hover:text-secondary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-secondary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-ash-grey">
              <li>
                <button
                  onClick={() => handleNavigation("about")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("courses")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  Teacher Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("courses")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("videos")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  Asana Library
                </button>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-secondary mb-4">Courses</h4>
            <ul className="space-y-2 text-sm text-ash-grey">
              <li>
                <button
                  onClick={() => handleNavigation("courses")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  Yoga Retreat in Rishikesh
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("courses")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  200 Hour Multi-style Yoga TTC
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("courses")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  300 Hour Multi-style Yoga TTC
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("courses")}
                  className="hover:text-secondary transition-colors text-left"
                >
                  500 Hour Multi-style Yoga TTC
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-secondary mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-ash-grey">
              <li className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="mt-1 flex-shrink-0"
                />
                <span>
                  Upper Tapovan, Rishikesh, Uttarakhand 249192,
                  India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>
                  +91 92886 63019 (WhatsApp Available)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:shivayayogashala09@gmail.com"
                  className="hover:text-secondary transition-colors"
                >
                  shivayayogashala09@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sanskrit Shloka 4 - Sacred Mantras */}
        <div className="border-t border-ash-grey/20 pt-8 text-center space-y-3">
          <p className="text-secondary italic text-lg">
            ॐ नमः शिवाय
          </p>
          <p className="text-sm text-ash-grey">
            Om Namaḥ Śivāya - I bow to Shiva, the inner Self
          </p>
          <p className="text-sm text-ash-grey italic mt-4">
            लोकाः समस्ताः सुखिनो भवन्तु
          </p>
          <p className="text-xs text-ash-grey">
            Lokāḥ Samastāḥ Sukhino Bhavantu - May all beings be
            happy and free
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-ash-grey/20 mt-8 pt-6 text-center text-sm text-ash-grey">
          <p>
            &copy; {new Date().getFullYear()} Shivaya Yogashala.
            All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <span className="text-primary text-xl">ॐ</span>
            <span>Honoring the lineage of Lord Shiva</span>
            <span className="text-primary text-xl">ॐ</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
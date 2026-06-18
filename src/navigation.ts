import {
  BookOpen,
  CalendarDays,
  GalleryHorizontal,
  GraduationCap,
  HeartHandshake,
  Home,
  Hotel,
  Image,
  Landmark,
  Leaf,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";

export type PageKey =
  | "home"
  | "about"
  | "courses"
  | "gallery"
  | "contact";

export type NavItem = {
  id: string;
  label: string;
  path: string;
  page: PageKey;
  highlight?: boolean;
  children?: NavItem[];
  icon?: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

export const aboutNavItems: NavItem[] = [
  { id: "our-story", label: "Our Story", path: "/about/our-story", page: "about", icon: HeartHandshake },
  { id: "why-rishikesh", label: "Why Rishikesh", path: "/about/why-rishikesh", page: "about", icon: Landmark },
  { id: "our-team", label: "Our Team", path: "/about/our-team", page: "about", icon: Users },
  {
    id: "accommodation-facilities",
    label: "Accommodation & Facilities",
    path: "/about/accommodation-facilities",
    page: "about",
    icon: Hotel,
  },
];

export const courseNavItems: NavItem[] = [
  { id: "100-hour-yoga-ttc", label: "100 Hour Yoga TTC", path: "/courses/100-hour-yoga-ttc", page: "courses", icon: GraduationCap },
  { id: "200-hour-yoga-ttc", label: "200 Hour Yoga TTC", path: "/courses/200-hour-yoga-ttc", page: "courses", icon: GraduationCap },
  { id: "300-hour-yoga-ttc", label: "300 Hour Yoga TTC", path: "/courses/300-hour-yoga-ttc", page: "courses", icon: GraduationCap },
  { id: "500-hour-yoga-ttc", label: "500 Hour Yoga TTC", path: "/courses/500-hour-yoga-ttc", page: "courses", icon: GraduationCap },
  { id: "aerial-yoga-ttc", label: "Aerial Yoga TTC", path: "/courses/aerial-yoga-ttc", page: "courses", icon: Sparkles },
  { id: "sound-healing-ttc", label: "Sound Healing TTC", path: "/courses/sound-healing-ttc", page: "courses", icon: Music },
  { id: "yoga-retreat", label: "Yoga Retreat", path: "/courses/yoga-retreat", page: "courses", icon: Leaf },
  { id: "course-schedule", label: "Course Schedule", path: "/courses/course-schedule", page: "courses", icon: CalendarDays },
];

export const primaryNavItems: NavItem[] = [
  { id: "home", label: "Home", path: "/", page: "home", icon: Home },
  { id: "about", label: "About Us", path: "/about", page: "about", icon: Users, children: aboutNavItems },
  { id: "courses", label: "Courses", path: "/courses", page: "courses", icon: BookOpen, children: courseNavItems },
  { id: "gallery", label: "Gallery", path: "/gallery", page: "gallery", icon: GalleryHorizontal },
  { id: "apply-now", label: "Apply Now", path: "/apply-now", page: "contact", highlight: true, icon: Image },
];

export const allNavItems = [
  ...primaryNavItems,
  ...aboutNavItems,
  ...courseNavItems,
];

const navAliases: Record<string, string> = {
  apply: "apply-now",
  contact: "apply-now",
};

export function getNavItemById(id: string) {
  const normalizedId = navAliases[id] ?? id;
  return allNavItems.find((item) => item.id === normalizedId) ?? primaryNavItems[0];
}

export function getNavItemByPath(pathname: string) {
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  if (cleanPath === "/apply") {
    return getNavItemById("apply-now");
  }

  if (cleanPath === "/contact") {
    return getNavItemById("apply-now");
  }

  return allNavItems.find((item) => item.path === cleanPath) ?? primaryNavItems[0];
}

export function isNavGroupActive(item: NavItem, activePage: PageKey) {
  return item.page === activePage;
}

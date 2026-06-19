# Implementation Checklist: Device Accessibility & Responsiveness

Quick reference for making all components accessible and responsive across devices.

---

## 📋 Before Starting Any Component

### For Every New Component
- [ ] Plan mobile-first (320px minimum width)
- [ ] Use semantic HTML elements
- [ ] Include proper ARIA labels
- [ ] Test with keyboard navigation
- [ ] Test on mobile device

### Required Imports
```tsx
// For accessibility utilities
import a11y from '../utils/accessibility';

// For responsive styling
import '../styles/responsive-accessibility.css';

// For responsive images
import { ResponsiveImage } from './ResponsiveImage';
```

---

## 📱 Mobile Responsiveness Checklist

### Breakpoint Strategy
```css
/* Mobile first! */
.component { /* defaults for mobile */ }

@media (min-width: 480px) { /* Small phones */ }
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktops */ }
@media (min-width: 1280px) { /* Large screens */ }
```

### Touch Targets (Mobile)
- [ ] All buttons: ≥44x44px
- [ ] All links: ≥44x44px
- [ ] Form inputs: ≥44px height
- [ ] Spacing between targets: ≥8px
- [ ] Click/tap area includes padding

### Font Sizing (Mobile)
- [ ] Base font: 16px (prevents iOS zoom)
- [ ] Body text: `clamp(0.875rem, 2vw, 1rem)`
- [ ] Headings: `clamp(1.5rem, 5vw, 3rem)`
- [ ] Never use fixed sizes for readability

### Spacing (Mobile)
```css
/* Mobile (xs-sm: <768px) */
padding: 16px;
gap: 12px;

/* Tablet (md: 768px+) */
@media (min-width: 768px) {
  padding: 24px;
  gap: 16px;
}

/* Desktop (lg+: 1024px+) */
@media (min-width: 1024px) {
  padding: 32px;
  gap: 20px;
}
```

### Images
- [ ] All images responsive (100% width, auto height)
- [ ] Use `<picture>` for art direction
- [ ] Lazy load below-fold images
- [ ] Provide `srcSet` and `sizes`
- [ ] Use modern formats (WebP)

---

## ♿ Accessibility Checklist

### Semantic HTML
- [ ] Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`
- [ ] Use `<button>` for clickable actions (not `<div>`)
- [ ] Use `<a>` for navigation (not `<button>`)
- [ ] Proper heading hierarchy (H1, H2, H3... no jumps)
- [ ] Use `<form>` for form elements
- [ ] Use `<label>` for form inputs

### ARIA Labels
```tsx
// For icon buttons
<button aria-label="Close menu">
  <X size={24} aria-hidden="true" />
</button>

// For navigation
<nav aria-label="Main navigation">
  <button aria-current={isActive ? 'page' : undefined}>
    {label}
  </button>
</nav>

// For form inputs
<label htmlFor="email">Email Address</label>
<input id="email" type="email" aria-describedby="email-help" />
<small id="email-help">Enter a valid email</small>

// For expandable content
<button aria-expanded={isOpen} aria-controls="menu">
  Menu
</button>
<div id="menu" hidden={!isOpen}>
  {/* menu content */}
</div>
```

### Focus Management
- [ ] All interactive elements focusable
- [ ] Focus indicators visible (3px outline)
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] Skip links provided

### Color & Contrast
- [ ] Text contrast ≥4.5:1 (AA)
- [ ] Not relying on color alone for info
- [ ] Focus indicators visible
- [ ] Support for high contrast mode

### Motion & Animation
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Form Accessibility
```tsx
// Label all form inputs
<label htmlFor="username">Username</label>
<input id="username" type="text" required />

// Mark required fields
<label htmlFor="email">
  Email <span aria-label="required">*</span>
</label>

// Provide error messages
{errors.email && (
  <div role="alert" aria-live="polite">
    {errors.email.message}
  </div>
)}
```

### Images & Media
- [ ] All images have descriptive `alt` text
- [ ] Decorative images have `alt=""` and `aria-hidden="true"`
- [ ] Videos have captions
- [ ] Provide transcripts for audio

---

## 🔑 Keyboard Navigation Checklist

### Basic Navigation
- [ ] Tab moves through elements (forward)
- [ ] Shift+Tab moves backward
- [ ] Enter activates buttons
- [ ] Space activates buttons/checkboxes
- [ ] Arrow keys work in menus/lists

### Focus Indicators
```css
:focus-visible {
  outline: 3px solid #1a6b5c;
  outline-offset: 2px;
}
```

### Skip Links
```tsx
import { SkipLink } from './SkipLink';

// Add at top of page
<SkipLink href="#main-content" />

// Add main content ID
<main id="main-content">
  {/* content */}
</main>
```

---

## 📸 Responsive Image Implementation

### Simple Responsive Image
```tsx
import { ResponsiveImage } from './ResponsiveImage';

<ResponsiveImage
  src="/image-md.webp"
  alt="Yoga practice in Rishikesh"
  srcSet="/image-sm.webp 480w, /image-md.webp 768w, /image-lg.webp 1024w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, 100vw"
  lazy={true}
/>
```

### Picture Element
```tsx
import { ResponsivePicture } from './ResponsiveImage';

<ResponsivePicture
  sources={[
    { srcSet: '/sm.webp', media: '(max-width: 480px)', sizes: '100vw' },
    { srcSet: '/md.webp', media: '(max-width: 768px)', sizes: '90vw' },
    { srcSet: '/lg.webp', media: '(max-width: 1024px)', sizes: '85vw' },
  ]}
  src="/image.webp"
  alt="Yoga scene"
/>
```

---

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Device Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] Galaxy S10 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px+)
- [ ] Desktop (1280px+)

### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Shift+Tab backward
- [ ] Keyboard-only navigation
- [ ] Screen reader (NVDA/JAWS/VoiceOver)
- [ ] High contrast mode
- [ ] Zoom to 200%

### Responsive Testing
- [ ] Mobile: 320px - 480px
- [ ] Tablet: 480px - 768px
- [ ] Desktop: 768px - 1280px
- [ ] Large: 1280px+
- [ ] Landscape orientation
- [ ] Portrait orientation

### Performance Testing
- [ ] Lighthouse accessibility score ≥95
- [ ] Lighthouse performance score ≥85
- [ ] Largest Contentful Paint <2.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] First Input Delay <100ms

---

## 🎯 Quick Wins (Low Effort, High Impact)

### Easy Improvements (1-5 minutes each)
- [ ] Add `aria-label` to icon buttons
- [ ] Add `alt` text to all images
- [ ] Add `role="button"` to clickable divs (better: use `<button>`)
- [ ] Add focus styles with `:focus-visible`
- [ ] Add `aria-hidden="true"` to decorative icons

### Medium Improvements (15-30 minutes each)
- [ ] Make all touch targets 44x44px
- [ ] Implement responsive image component
- [ ] Add skip link to header
- [ ] Make all form inputs properly labeled
- [ ] Add keyboard navigation to custom components

### Larger Improvements (1-2 hours each)
- [ ] Implement mobile-first CSS throughout
- [ ] Add `prefers-reduced-motion` support
- [ ] Create responsive navigation menu
- [ ] Implement accessibility utilities
- [ ] Accessibility audit and fixes

---

## 📚 Utility Usage Examples

### Check Device Type
```tsx
import a11y from '../utils/accessibility';

if (a11y.isMobile()) {
  // Mobile-specific logic
}

const breakpoint = a11y.getBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

### Announce to Screen Readers
```tsx
a11y.announceToScreenReader('Form submitted successfully', 'assertive');
```

### Debounce Resize Events
```tsx
const handleResize = a11y.debounce(() => {
  // Handle resize
}, 300);

window.addEventListener('resize', handleResize);
```

### Generate Accessible IDs
```tsx
const inputId = a11y.generateId('email');
<input id={inputId} />
<label htmlFor={inputId}>Email</label>
```

---

## 🚀 Implementation Priority

### Priority 1: Critical (Do First)
1. Add semantic HTML to all components
2. Add alt text to all images
3. Add ARIA labels to all buttons
4. Make touch targets 44x44px minimum
5. Add skip link to header
6. Test with keyboard navigation

### Priority 2: Important (Do Second)
1. Implement responsive images
2. Add proper heading hierarchy
3. Improve focus indicators
4. Add form labels and validation
5. Test with screen readers
6. Add `prefers-reduced-motion` support

### Priority 3: Enhancement (Do When Time Allows)
1. Optimize images for different sizes
2. Implement code splitting
3. Add live region announcements
4. Advanced keyboard shortcuts
5. Internationalization support
6. Dark mode optimization

---

## ✅ Final Checklist

Before considering a feature complete:

- [ ] Mobile responsive (tested on real device)
- [ ] Keyboard navigable (Tab through all elements)
- [ ] Screen reader friendly (tested with NVDA/JAWS)
- [ ] Touch targets 44x44px+ (mobile)
- [ ] Focus indicators visible (3px)
- [ ] Images have alt text
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Lighthouse accessibility ≥95/100

---

## 🐛 Troubleshooting

### Component Not Responsive
- [ ] Check media queries are present
- [ ] Verify breakpoints are correct
- [ ] Use `clamp()` for fluid sizing
- [ ] Check max-width on containers
- [ ] Test in device mode

### Focus Not Visible
- [ ] Check `:focus-visible` styles applied
- [ ] Verify `outline` is visible
- [ ] Check z-index isn't hiding it
- [ ] Test with actual keyboard Tab key

### Images Not Responsive
- [ ] Check `srcSet` and `sizes` attributes
- [ ] Verify image formats are supported
- [ ] Check responsive component usage
- [ ] Test in device mode

### Screen Reader Issues
- [ ] Add missing `alt` text
- [ ] Check ARIA label clarity
- [ ] Use semantic HTML elements
- [ ] Test with actual screen reader
- [ ] Check heading hierarchy

---

## 📞 Quick Reference

| Need | Solution |
|------|----------|
| Touch target | Use `min-h-[44px] min-w-[44px]` |
| Responsive font | Use `clamp(min, preferred, max)` |
| Skip link | Use `<SkipLink />` component |
| Responsive image | Use `<ResponsiveImage />` component |
| Accessibility | Import `a11y` utilities |
| Mobile padding | Use `px-4` (16px) |
| Tablet padding | Use `px-6` (24px) desktop with media query |
| Focus style | Use `:focus-visible` outline |
| Icon label | Use `aria-label` on button |
| Screen reader only | Use `sr-only` class |

---

## 📖 Learn More

- [Accessibility Guide](./ACCESSIBILITY_RESPONSIVE_GUIDE.md)
- [Implementation Summary](./DEVICE_ACCESSIBILITY_IMPLEMENTATION.md)
- [Utilities Documentation](../utils/accessibility.ts)
- [Responsive CSS](../styles/responsive-accessibility.css)

---

**Happy coding! 🎉**

Remember: Accessibility is not a feature, it's a requirement. Make every component work for every user, on every device, using every input method.

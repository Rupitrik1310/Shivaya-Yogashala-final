import React from 'react';

/**
 * SkipLink Component
 * Provides keyboard navigation shortcut to main content
 * Visible on focus, hidden by default
 * 
 * Usage:
 * <SkipLink href="#main-content" targetId="main-content" />
 */
interface SkipLinkProps {
  href?: string;
  targetId?: string;
  label?: string;
}

export function SkipLink({
  href = '#main-content',
  targetId = 'main-content',
  label = 'Skip to main content',
}: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      
      // Remove tabindex after focus
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="skip-link"
      title={label}
    >
      {label}
    </a>
  );
}

export default SkipLink;

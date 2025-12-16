(function () {
  // Elements
  const menuBtn = document.getElementById('menu-btn-mobile');
  const panel = document.getElementById('mobile-panel');
  const closeBtn = document.getElementById('mobile-close');

  // Safety
  if (!menuBtn || !panel) return;

  // Open/Close panel
  function openPanel() {
    panel.classList.add('show');
    panel.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    // focus first link
    const first = panel.querySelector('a');
    if (first) first.focus();
  }
  function closePanel() {
    panel.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    menuBtn.focus();
    // close all open details inside panel (to reset)
    panel.querySelectorAll('details.mobile-details[open]').forEach(d => d.removeAttribute('open'));
  }

  // Toggle panel events
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel.classList.contains('show')) closePanel(); else openPanel();
  });
  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closePanel(); });

  // Click outside closes panel (mobile)
  document.addEventListener('click', (ev) => {
    if (window.innerWidth > 1024) return;
    const inside = panel.contains(ev.target) || menuBtn.contains(ev.target) || (closeBtn && closeBtn.contains(ev.target));
    if (!inside) closePanel();
  });

  // ESC to close
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closePanel();
  });

  // Make details act like an accordion at each level:
  // when a details opens, close sibling details (single-open per level)
  function wireDetailsAccordion(root) {
    root.querySelectorAll(':scope > details.mobile-details').forEach(d => {
      d.addEventListener('toggle', (e) => {
        if (!d.open) return; // only act on open
        // close siblings
        Array.from(d.parentElement.children).forEach(sib => {
          if (sib !== d && sib.tagName === 'DETAILS') sib.removeAttribute('open');
        });
      });
      // also wire nested details
      wireDetailsAccordion(d);
    });
  }

  // Initialize after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    wireDetailsAccordion(panel);
  });

  // Reset on resize (desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closePanel();
    }
  });
})();


const copyright = document.getElementById('copyright');
copyright.innerHTML = `
© ${new Date().getFullYear()} Sovin Hormone Clinic. All Rights Reserved.`
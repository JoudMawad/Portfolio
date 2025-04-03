/* =============================================================================
   MAIN FUNCTIONS & INITIALIZATION
============================================================================= */

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initDynamicText();
  initNonOverlayAnimations();
  initBurgerMenu();
  initScrollAnimations(); // New: Initialize scroll-triggered animations
});

// On window resize, scale text
window.addEventListener('resize', scaleAllText);

/* -----------------------------------------------------------------------------
   SCALABLE TEXT & LOCAL TIME FUNCTIONS
-----------------------------------------------------------------------------*/

// Scale text for elements with the .scalable-text class
function initDynamicText() {
  scaleAllText();
}

function scaleAllText() {
  const elements = document.querySelectorAll('.scalable-text');
  const windowWidth = window.innerWidth;
  elements.forEach(element => {
    const minW = parseFloat(element.dataset.minWidth) || 320;
    const maxW = parseFloat(element.dataset.maxWidth) || 2560;
    const minSize = parseFloat(element.dataset.minSize) || 1;
    const maxSize = parseFloat(element.dataset.maxSize) || 5;
    const clampedWidth = Math.min(Math.max(windowWidth, minW), maxW);
    const factor = (clampedWidth - minW) / (maxW - minW);
    const currentSize = minSize + (maxSize - minSize) * factor;
    element.style.fontSize = currentSize + 'rem';
  });
}

// Update local time for overlay & home headers
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeText = `LOCAL // ${hours}:${minutes}:${seconds}`;
  document.querySelectorAll('.overlay-local, .home-local').forEach(el => {
    el.textContent = timeText;
  });
  updateBlinkingTime();
}
updateTime();
setInterval(updateTime, 1000);

// Blinking animation for digit changes
function updateBlinkingTime() {
  const now = new Date();
  const hoursStr = now.getHours().toString().padStart(2, '0');
  const minutesStr = now.getMinutes().toString().padStart(2, '0');
  const secondsStr = now.getSeconds().toString().padStart(2, '0');
  updateTimePart('.time-hours', hoursStr);
  updateTimePart('.time-minutes', minutesStr);
  updateTimePart('.time-seconds', secondsStr);
}

function updateTimePart(selector, newStr) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(container => {
    const digitSpans = container.querySelectorAll('.digit');
    for (let i = 0; i < newStr.length; i++) {
      const newDigit = newStr[i];
      const digitEl = digitSpans[i];
      if (digitEl.textContent !== newDigit) {
        digitEl.textContent = newDigit;
        digitEl.classList.add('blink-red');
        setTimeout(() => {
          digitEl.classList.remove('blink-red');
        }, 500);
      }
    }
  });
}

/* -----------------------------------------------------------------------------
   NON-OVERLAY & BURGER MENU ANIMATIONS
-----------------------------------------------------------------------------*/

// Animate non-overlay elements on page load
function initNonOverlayAnimations() {
  const nonOverlayElements = document.querySelectorAll('.animate:not(#overlayMenu .animate)');
  nonOverlayElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('in-view');
    }, 100 * (index + 1));
  });
}

// Burger menu functionality for overlay animations
function initBurgerMenu() {
  const burgerMenu = document.getElementById('burgerMenuHome');
  const overlayMenu = document.getElementById('overlayMenu');
  const homeLocal = document.querySelector('.home-local');
  const homeContact = document.querySelector('.home-contact');
  const overlayTimeouts = [];
  
  burgerMenu.addEventListener('click', () => {
    const isActive = overlayMenu.classList.toggle('active');
    burgerMenu.classList.toggle('open');
    
    if (isActive) {
      homeLocal.classList.add('hide');
      homeContact.classList.add('hide');
    } else {
      homeLocal.classList.remove('hide');
      homeContact.classList.remove('hide');
    }
    
    // Reset overlay animations
    const overlayAnimatedElements = overlayMenu.querySelectorAll('.animate');
    overlayAnimatedElements.forEach(el => {
      el.classList.remove('in-view');
    });
    overlayTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    overlayTimeouts.length = 0;
    
    // Animate overlay elements if active
    if (isActive) {
      overlayAnimatedElements.forEach((el, index) => {
        const timeoutId = setTimeout(() => {
          el.classList.add('in-view');
        }, 100 * (index + 1));
        overlayTimeouts.push(timeoutId);
      });
    }
  });
}

/* -----------------------------------------------------------------------------
   NEW: SCROLL-TRIGGERED FADE-IN & PARALLAX ANIMATION
-----------------------------------------------------------------------------*/

// Intersection Observer for fade‑in on scroll
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate').forEach(el => {
    scrollObserver.observe(el);
  });
}

// Parallax scroll effect for elements with the .parallax class
function parallaxScroll() {
  const scrollPosition = window.pageYOffset;
  document.querySelectorAll('.parallax').forEach(el => {
    // Adjust speed factor as needed (0.5 means half the scroll speed)
    el.style.transform = `translateY(${scrollPosition * 0.1}px)`;
  });
}
window.addEventListener('scroll', parallaxScroll);

// Optional: Smooth scrolling is enabled via CSS (html { scroll-behavior: smooth; })

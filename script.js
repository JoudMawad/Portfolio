/* JavaScript for updating local time in overlay & home headers */

// Wait for the DOM to be fully loaded before initializing dynamic text scaling
document.addEventListener('DOMContentLoaded', initDynamicText);
// Update dynamic text scaling on window resize
window.addEventListener('resize', scaleAllText);

// Initialize dynamic text scaling on page load
function initDynamicText() {
  // Run text scaling once when the page loads
  scaleAllText();
}

// Scale elements with the 'scalable-text' class based on the current window width
function scaleAllText() {
  const elements = document.querySelectorAll('.scalable-text');
  const windowWidth = window.innerWidth;

  // Loop through each scalable element and adjust its font size
  elements.forEach(element => {
    // Retrieve minimum and maximum window widths and font sizes from data attributes (with default values)
    const minW = parseFloat(element.dataset.minWidth) || 320;
    const maxW = parseFloat(element.dataset.maxWidth) || 2560;
    const minSize = parseFloat(element.dataset.minSize) || 1;
    const maxSize = parseFloat(element.dataset.maxSize) || 5;

    // Clamp the window width between the defined minimum and maximum widths
    const clampedWidth = Math.min(Math.max(windowWidth, minW), maxW);

    // Calculate the interpolation factor (0 to 1) based on the clamped width
    const factor = (clampedWidth - minW) / (maxW - minW);

    // Determine the current font size by interpolating between minSize and maxSize
    const currentSize = minSize + (maxSize - minSize) * factor;

    // Set the element's font size in REM
    element.style.fontSize = currentSize + 'rem';
  });
}

// Function to update the local time display in overlay and home headers
function updateTime() {
  const now = new Date();
  // Format hours, minutes, and seconds as two-digit strings
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  // Construct the time string; modify as needed for your design
  const timeText = `LOCAL // ${hours}:${minutes}:${seconds}`;
  
  // Update the text content of all elements in both overlay and home headers that display local time
  document.querySelectorAll('.overlay-local, .home-local').forEach(el => {
    el.textContent = timeText;
  });
}
// Perform an initial update and then update every second
updateTime();
setInterval(updateTime, 1000);


/* JavaScript to animate non-overlay elements on page load */

// Once the DOM is fully loaded, animate all non-overlay elements with the 'animate' class
document.addEventListener("DOMContentLoaded", function() {
  // Select elements with the 'animate' class, excluding those inside the overlay menu
  const nonOverlayElements = document.querySelectorAll('.animate:not(#overlayMenu .animate)');
  nonOverlayElements.forEach((el, index) => {
    // Add the 'in-view' class with a staggered delay to trigger animations sequentially
    setTimeout(() => {
      el.classList.add('in-view');
    }, 100 * (index + 1));
  });
});


/* JavaScript for burger menu functionality, overlay animations & toggling header elements */

// Get references to the burger menu, overlay menu, and header elements
const burgerMenu = document.getElementById('burgerMenuHome');
const overlayMenu = document.getElementById('overlayMenu');
const homeLocal = document.querySelector('.home-local');
const homeContact = document.querySelector('.home-contact');

// Array to keep track of pending timeout IDs for overlay animations
const overlayTimeouts = [];

// Toggle overlay menu and header elements on burger menu click
burgerMenu.addEventListener('click', () => {
  // Toggle the active state of the overlay menu and the burger menu's open class
  const isActive = overlayMenu.classList.toggle('active');
  burgerMenu.classList.toggle('open');
  
  // Hide header elements when the overlay is active; show them when inactive
  if (isActive) {
    homeLocal.classList.add('hide');
    homeContact.classList.add('hide');
  } else {
    homeLocal.classList.remove('hide');
    homeContact.classList.remove('hide');
  }
  
  // Clear any current overlay animations: remove animation classes and clear pending timeouts
  const overlayAnimatedElements = overlayMenu.querySelectorAll('.animate');
  overlayAnimatedElements.forEach(el => {
    el.classList.remove('in-view');
  });
  overlayTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
  overlayTimeouts.length = 0;

  // If the overlay is activated, animate its components sequentially
  if (isActive) {
    overlayAnimatedElements.forEach((el, index) => {
      const timeoutId = setTimeout(() => {
        el.classList.add('in-view');
      }, 100 * (index + 1));
      overlayTimeouts.push(timeoutId);
    });
  }
});


// Skills stripe: Create an infinite scrolling effect for the skills list
document.addEventListener("DOMContentLoaded", function() {
  const skillsList = document.querySelector('#skills .skills-list');
  if (!skillsList) return;
  
  // Duplicate the content to allow for a seamless scrolling loop
  skillsList.innerHTML += skillsList.innerHTML;
  
  let scrollPosition = 0;
  const speed = 1; // Speed in pixels per frame (adjust as needed)
  
  // Function to animate the horizontal scrolling of the skills list
  function scrollSkills() {
    scrollPosition -= speed;
    // Once the scroll reaches half the total width (the duplicated section), reset the scroll
    if (Math.abs(scrollPosition) >= skillsList.scrollWidth / 2) {
      scrollPosition = 0;
    }
    skillsList.style.transform = `translateX(${scrollPosition}px)`;
    requestAnimationFrame(scrollSkills);
  }
  
  // Start the skills scrolling animation
  scrollSkills();
});

/* 
// JavaScript for tech list scrolling (currently commented out)
// Uncomment this block if you wish to implement a similar scrolling effect for a tech list

document.addEventListener("DOMContentLoaded", function() {
  const techList = document.querySelector('#tech .tech-list');
  if (!techList) return;
  
  // Duplicate the tech list content for a seamless loop
  techList.innerHTML += techList.innerHTML;
  
  // Compute half the scroll width for resetting the position
  const halfWidth = techList.scrollWidth / 2;
  let scrollPosition = -halfWidth; // Start position
  
  const speed = 1; // Speed in pixels per frame (adjust as needed)
  
  function scrollTech() {
    scrollPosition += speed;
    // Reset the scroll position when it reaches the start
    if (scrollPosition >= 0) {
      scrollPosition = -halfWidth;
    }
    techList.style.transform = `translateX(${scrollPosition}px)`;
    requestAnimationFrame(scrollTech);
  }
  
  scrollTech();
});
*/


// Custom cursor implementation
document.addEventListener('DOMContentLoaded', () => {
  // Create a custom cursor element and append it to the body
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Update the position of the custom cursor based on mouse movements
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
});


// Blinking animation for time digits when they update

// This function updates the time digits with a blinking effect when a digit changes
function updateTime() {
  const now = new Date();
  // Format each time component as a two-digit string
  const hoursStr = now.getHours().toString().padStart(2, '0');
  const minutesStr = now.getMinutes().toString().padStart(2, '0');
  const secondsStr = now.getSeconds().toString().padStart(2, '0');

  // Update hours, minutes, and seconds with a blinking animation if they change
  updateTimePart('.time-hours', hoursStr);
  updateTimePart('.time-minutes', minutesStr);
  updateTimePart('.time-seconds', secondsStr);
}

// Helper function that updates a specific time part and applies a blink effect for changed digits
function updateTimePart(selector, newStr) {
  const containers = document.querySelectorAll(selector);
  containers.forEach(container => {
    // Get all digit span elements within the container
    const digitSpans = container.querySelectorAll('.digit');
    // Loop through each digit to compare and update if necessary
    for (let i = 0; i < newStr.length; i++) {
      const newDigit = newStr[i];
      const digitEl = digitSpans[i];
      // If the digit is different from the current one, update it and add a blink effect
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

 /* <!-- JavaScript for updating local time in overlay & home headers -->*/
 document.addEventListener('DOMContentLoaded', initDynamicText);
 window.addEventListener('resize', scaleAllText);
 
 function initDynamicText() {
   // Run once on load
   scaleAllText();
 }
 
 function scaleAllText() {
   const elements = document.querySelectorAll('.scalable-text');
 
   const windowWidth = window.innerWidth;
   // If you also want to factor in height:
   // const windowHeight = window.innerHeight;
   // const ratio = windowWidth / windowHeight; // Example ratio, if needed
 
   elements.forEach(element => {
     // Get data attributes (convert them to numbers)
     const minW = parseFloat(element.dataset.minWidth) || 320;
     const maxW = parseFloat(element.dataset.maxWidth) || 2560;
     const minSize = parseFloat(element.dataset.minSize) || 1;
     const maxSize = parseFloat(element.dataset.maxSize) || 5;
 
     // Constrain the current window width to [minW, maxW]
     const clampedWidth = Math.min(Math.max(windowWidth, minW), maxW);
 
     // Calculate interpolation factor (between 0 and 1)
     const factor = (clampedWidth - minW) / (maxW - minW);
 
     // Interpolate font size
     const currentSize = minSize + (maxSize - minSize) * factor;
 
     // Set the element's font size in REM (or PX if you prefer)
     element.style.fontSize = currentSize + 'rem';
   });
 }
 
   function updateTime() {
     const now = new Date();
     const hours = now.getHours().toString().padStart(2, '0');
     const minutes = now.getMinutes().toString().padStart(2, '0');
     const seconds = now.getSeconds().toString().padStart(2, '0');
     const timeText = LOCAL // ${hours}:${minutes}:${seconds};
     // Update both overlay and home header local elements
     document.querySelectorAll('.overlay-local, .home-local').forEach(el => {
       el.textContent = timeText;
     });
   }
   updateTime();
   setInterval(updateTime, 1000);
 
 
 /* <!-- JavaScript to animate non-overlay elements on page load -->*/
 
   document.addEventListener("DOMContentLoaded", function() {
     // Animate all .animate elements except those inside the overlay menu
     const nonOverlayElements = document.querySelectorAll('.animate:not(#overlayMenu .animate)');
     nonOverlayElements.forEach((el, index) => {
       setTimeout(() => {
         el.classList.add('in-view');
       }, 100 * (index + 1));
     });
   });
 
 
 /* <!-- JavaScript for burger menu functionality, overlay animations & toggling header elements -->*/
 
   const burgerMenu = document.getElementById('burgerMenuHome');
   const overlayMenu = document.getElementById('overlayMenu');
   const homeLocal = document.querySelector('.home-local');
   const homeContact = document.querySelector('.home-contact');
 
   // Array to keep track of pending timeout IDs
   const overlayTimeouts = [];
 
   burgerMenu.addEventListener('click', () => {
     const isActive = overlayMenu.classList.toggle('active');
     burgerMenu.classList.toggle('open');
     
     // Hide local and contact from home header when overlay is active
     if (isActive) {
       homeLocal.classList.add('hide');
       homeContact.classList.add('hide');
     } else {
       homeLocal.classList.remove('hide');
       homeContact.classList.remove('hide');
     }
     
     // Immediately remove all animation classes and clear pending timeouts
     const overlayAnimatedElements = overlayMenu.querySelectorAll('.animate');
     overlayAnimatedElements.forEach(el => {
       el.classList.remove('in-view');
     });
     overlayTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
     overlayTimeouts.length = 0;
 
     // If overlay is active, animate its components from the start
     if (isActive) {
       overlayAnimatedElements.forEach((el, index) => {
         const timeoutId = setTimeout(() => {
           el.classList.add('in-view');
         }, 100 * (index + 1));
         overlayTimeouts.push(timeoutId);
       });
     }
   });


   //skills stripe
   document.addEventListener("DOMContentLoaded", function() {
    const skillsList = document.querySelector('#skills .skills-list');
    if (!skillsList) return;
  
    // Duplicate the skills list content to enable seamless looping
    skillsList.innerHTML += skillsList.innerHTML;
    
    let scrollPosition = 0;
    const speed = 1; // Adjust the speed (in pixels per frame) as needed
  
    function scrollSkills() {
      scrollPosition -= speed;
      // Reset once we've scrolled the width of the original list
      if (Math.abs(scrollPosition) >= skillsList.scrollWidth / 2) {
        scrollPosition = 0;
      }
      skillsList.style.transform = `translateX(${scrollPosition}px)`;
      requestAnimationFrame(scrollSkills);
    }
    
    scrollSkills();
  });


//custom cursor
document.addEventListener('DOMContentLoaded', () => {
  // Create and append the custom cursor element
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Update cursor position on mouse move
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
});


  
 
 
 
 
 // blinking animation
 function updateTime() {
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
     // Get all digit spans within the container
     const digitSpans = container.querySelectorAll('.digit');
     // Loop through each digit and compare
     for (let i = 0; i < newStr.length; i++) {
       const newDigit = newStr[i];
       const digitEl = digitSpans[i];
       // If the digit has changed, update and blink
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
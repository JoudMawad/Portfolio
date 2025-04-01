/* <!-- JavaScript for updating local time in overlay & home headers -->*/

  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeText = `LOCAL // ${hours}:${minutes}:${seconds}`;
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


/*<!-- JavaScript to update font size based on image height -->*/

  const image = document.querySelector('.aboutMe-content img');
  const text = document.querySelector('.aboutMe-text');
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const imageHeight = entry.contentRect.height;
      const baseImageHeight = 300;
      const baseFontSize = 1;
      const newFontSize = (imageHeight / baseImageHeight) * baseFontSize;
      text.style.fontSize = `${newFontSize}rem`;
    }
  });
  if (image) observer.observe(image);

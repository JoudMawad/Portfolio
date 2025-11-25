document.addEventListener('DOMContentLoaded', () => {
  const hasPointer = window.matchMedia('(pointer: fine)').matches;
  if (hasPointer) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const goal = (data.get('goal') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const subject = encodeURIComponent(`Ignite contact from ${name || 'user'}`);
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Goal: ${goal}`,
        '',
        message
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      const mailto = `mailto:ignite@judemawad.com?subject=${subject}&body=${body}`;

      if (status) {
        status.textContent = 'Opening your mail app...';
      }
      window.location.href = mailto;
    });
  }

  const burger = document.getElementById('burgerMenu');
  const overlay = document.getElementById('overlayMenu');
  if (burger && overlay) {
    const toggleOverlay = () => {
      const isActive = overlay.classList.toggle('active');
      burger.classList.toggle('open', isActive);
      document.body.classList.toggle('no-scroll', isActive);
    };
    burger.addEventListener('click', toggleOverlay);
    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        overlay.classList.remove('active');
        burger.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Hide topbar on scroll down (mobile)
  let lastScrollY = window.scrollY;
  const topbar = document.querySelector('.topbar');
  const isMobile = () => window.matchMedia('(max-width: 800px)').matches;

  window.addEventListener('scroll', () => {
    if (!topbar || !isMobile()) return;
    const current = window.scrollY;
    if (current > lastScrollY + 5) {
      topbar.classList.add('hide-bar');
    } else {
      topbar.classList.remove('hide-bar');
    }
    lastScrollY = current;
  });
});

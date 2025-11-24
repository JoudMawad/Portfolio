document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor-dot');
  const hasPointer = window.matchMedia('(pointer: fine)').matches;

  if (cursor && hasPointer) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.opacity = '1';
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));
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
});

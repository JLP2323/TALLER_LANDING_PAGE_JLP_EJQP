document.addEventListener('DOMContentLoaded', () => {
  initSnowCanvas();
  initCountdown();
  initMobileMenu();
  initGiftForm();
  initSmoothScroll();
});

function initSnowCanvas() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const flakeCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const flakes = [];

  for (let i = 0; i < flakeCount; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.7 + 0.4,
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.6 + 0.2
    });
  }

  function renderSnow() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < flakeCount; i++) {
      const flake = flakes[i];

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253, 251, 247, ${flake.opacity})`;
      ctx.fill();

      flake.y += flake.speedY;
      flake.x += flake.speedX;

      if (flake.y > height) {
        flake.y = -5;
        flake.x = Math.random() * width;
      }
      if (flake.x > width) flake.x = 0;
      if (flake.x < 0) flake.x = width;
    }

    requestAnimationFrame(renderSnow);
  }

  requestAnimationFrame(renderSnow);
}

function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetChristmas = new Date(currentYear, 11, 25, 0, 0, 0);

    if (now.getTime() > targetChristmas.getTime()) {
      targetChristmas = new Date(currentYear + 1, 11, 25, 0, 0, 0);
    }

    const diff = targetChristmas.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('active');
  });

  const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });
}

function initGiftForm() {
  const form = document.getElementById('christmas-gift-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullNameInput = document.getElementById('nombre');
    const ageInput = document.getElementById('edad');
    const locationInput = document.getElementById('ciudad');
    const giftInput = document.getElementById('regalo');

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const age = ageInput ? ageInput.value.trim() : '';
    const location = locationInput ? locationInput.value.trim() : '';
    const gift = giftInput ? giftInput.value.trim() : '';

    if (!fullName || !age || !location || !gift) {
      return;
    }

    const getParams = new URLSearchParams({
      nombre: fullName,
      edad: age,
      ciudad: location,
      regalo: gift,
      timestamp: Date.now().toString()
    });

    const trackingCode = `POLO-${Math.floor(10000 + Math.random() * 90000)}`;

    showToastNotification({
      recipientName: fullName,
      trackingCode: trackingCode
    });

    addNewWishCard({
      fullName,
      age,
      location,
      gift,
      trackingCode
    });

    form.reset();
  });
}

let toastTimeoutId = null;

function showToastNotification({ recipientName, trackingCode }) {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }

  toastContainer.innerHTML = `
    <div class="toast show" role="status" aria-live="polite">
      <div class="toast-icon-wrapper">
        <svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">Carta Recibida en el Polo Norte</div>
        <div class="toast-message">
          Tu carta ha sido enviada a Papá Noel, <strong>${escapeHtml(recipientName)}</strong>. Los duendes ya están preparando tu petición.
        </div>
        <div class="toast-meta">Guía Postal: <span>${trackingCode}</span></div>
      </div>
      <button type="button" class="toast-close-btn" aria-label="Cerrar notificación">
        <svg class="svg-icon svg-icon-stroke" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="toast-progress"></div>
    </div>
  `;

  const toastEl = toastContainer.querySelector('.toast');
  const closeBtn = toastContainer.querySelector('.toast-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      dismissToast(toastEl);
    });
  }

  toastTimeoutId = setTimeout(() => {
    dismissToast(toastEl);
  }, 4000);
}

function dismissToast(toastEl) {
  if (!toastEl) return;
  toastEl.classList.remove('show');
  setTimeout(() => {
    if (toastEl.parentElement) {
      toastEl.parentElement.innerHTML = '';
    }
  }, 400);
}

function addNewWishCard({ fullName, age, location, gift, trackingCode }) {
  const wishesGrid = document.getElementById('wishes-gallery-grid');
  if (!wishesGrid) return;

  const initials = fullName
    .split(' ')
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const newArticle = document.createElement('article');
  newArticle.className = 'wish-card';
  newArticle.style.animation = 'fadeInUp 0.5s ease-out';

  newArticle.innerHTML = `
    <div>
      <header class="wish-header">
        <div class="wish-author-group">
          <div class="wish-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
          <div>
            <h3 class="wish-author-name">${escapeHtml(fullName)}</h3>
            <div class="wish-location">
              <svg class="svg-icon" viewBox="0 0 24 24" style="width: 0.85rem; height: 0.85rem;" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>${escapeHtml(location)}</span>
            </div>
          </div>
        </div>
        <span class="wish-badge-age">${escapeHtml(age)} años</span>
      </header>
      <blockquote class="wish-content">
        "${escapeHtml(gift)}"
      </blockquote>
    </div>
    <footer class="wish-footer">
      <div class="wish-status-verified">
        <svg class="svg-icon" viewBox="0 0 24 24" style="width: 0.9rem; height: 0.9rem; fill: #2D5A27;" aria-hidden="true">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <span>Carta Registrada (${trackingCode})</span>
      </div>
      <time datetime="${new Date().toISOString()}">Recién enviada</time>
    </footer>
  `;

  wishesGrid.insertBefore(newArticle, wishesGrid.firstChild);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

function escapeHtml(string) {
  const str = String(string);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===== Tab Navigation =====
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('.right > section');

function switchTab(targetId) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('goto') === targetId);
  });
  sections.forEach(section => {
    section.classList.toggle('active', section.id === targetId);
  });
  history.replaceState(null, '', '#' + targetId);
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('goto');
    switchTab(targetId);
  });
});

const initHash = location.hash.replace('#', '') || 'home';
if (document.getElementById(initHash)) {
  switchTab(initHash);
} else {
  switchTab('home');
}

// ===== Star Background Animation =====
(function createStars() {
  const container = document.getElementById('bg-anim');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.bottom = Math.random() * 100 + '%';
    star.style.animationDuration = (Math.random() * 8 + 4) + 's';
    star.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(star);
  }
  for (let i = 0; i < 3; i++) {
    const ss = document.createElement('div');
    ss.className = 'shooting-star';
    ss.style.left = Math.random() * 100 + '%';
    ss.style.top = Math.random() * 60 + '%';
    ss.style.animationDuration = (Math.random() * 3 + 2) + 's';
    ss.style.animationDelay = Math.random() * 15 + 's';
    container.appendChild(ss);
  }
})();

// ===== Loading Overlay =====
window.addEventListener('load', () => {
  const overlay = document.getElementById('loading-overlay');
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.getElementById('container').style.display = 'block';
  }, 600);
});

// ===== Hitokoto (Quote API) =====
const quoteEl = document.getElementById('hitokoto');
if (quoteEl) {
  fetch('https://v1.hitokoto.cn?c=i')
    .then(res => res.json())
    .then(data => {
      quoteEl.textContent = '\u300e ' + data.hitokoto + ' \u300f';
    })
    .catch(() => {
      quoteEl.textContent = '\u300e \u4eba\u751f\u5373\u662f\u5230\u6765\u3001\u76f8\u9047\u3001\u966a\u4f34\u3001\u79bb\u5f00 \u300f';
    });
}

// ===== Running Time Counter =====
function updateRuntime() {
  const el = document.getElementById('runtime');
  if (!el) return;
  const start = new Date('2022-10-25T09:27:39+08:00');
  const now = new Date();
  const diff = Math.floor((now - start) / 1000);
  const years = Math.floor(diff / (365 * 24 * 3600));
  const days = Math.floor((diff % (365 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((diff % (24 * 3600)) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;
  el.textContent = years + '\u5e74' + days + '\u5929' + hours + '\u65f6' + minutes + '\u5206' + seconds + '\u79d2';
}
updateRuntime();
setInterval(updateRuntime, 1000);

const yearEl = document.getElementById('footer-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
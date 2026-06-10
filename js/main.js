// ===== ZEV Technologies — interactions =====

// Nav: deepen blur background once scrolled
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Scroll-reveal
const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Stat counters: count up when the stats band enters view
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function countUp(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOut(p) * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(countUp);
      statsObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.4 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// Carousel arrows
const carousel = document.getElementById('carousel');
const step = () => {
  const card = carousel.querySelector('.card');
  return card ? card.offsetWidth + 20 : 320;
};
document.getElementById('car-prev').addEventListener('click', () => {
  carousel.scrollBy({ left: -step(), behavior: 'smooth' });
});
document.getElementById('car-next').addEventListener('click', () => {
  carousel.scrollBy({ left: step(), behavior: 'smooth' });
});

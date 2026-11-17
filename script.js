const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// The inline script in <head> sets this class before first paint to avoid a flash.
const motion = document.documentElement.classList.contains('motion');

const STAMP_TARGETS = [
  '.content-block h2',
  '.experience-item',
  '.activity-item',
  '.award-item',
  '.other-item',
  '.media-item',
  '.qualification-item',
  '.hl',
].join(',');

function setupStamps() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
  );
  document.querySelectorAll(STAMP_TARGETS).forEach((el) => observer.observe(el));
}

// The line grows as the viewport's 60% mark moves down the timeline;
// each node fills once the line has reached it.
function updateTimelines() {
  const mark = window.innerHeight * 0.6;
  document.querySelectorAll('.education-timeline').forEach((timeline) => {
    const box = timeline.getBoundingClientRect();
    if (box.height === 0) return;
    const progress = Math.min(1, Math.max(0, (mark - box.top) / box.height));
    timeline.style.setProperty('--progress', progress.toFixed(3));
    timeline.querySelectorAll('.education-item').forEach((item) => {
      const node = item.querySelector('.education-icon, .research-dot');
      if (!node) return;
      const nodeBox = node.getBoundingClientRect();
      item.classList.toggle('is-reached', nodeBox.top + nodeBox.height / 2 <= mark);
    });
  });
}

function setupTimelines() {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateTimelines();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateTimelines();
}

function toggleLang() {
  const jaContent = document.getElementById('ja');
  const enContent = document.getElementById('en');
  const langBtn = document.querySelector('.lang-btn');

  if (jaContent.style.display === 'none') {
    jaContent.style.display = 'block';
    enContent.style.display = 'none';
    langBtn.innerHTML = '<i class="fas fa-globe" aria-hidden="true"></i> English';
  } else {
    jaContent.style.display = 'none';
    enContent.style.display = 'block';
    langBtn.innerHTML = '<i class="fas fa-globe" aria-hidden="true"></i> 日本語';
  }
  if (motion) updateTimelines();
}

// Anchor links can collide between #ja and #en sections; scope to the visible one.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const jaVisible = document.getElementById('ja').style.display !== 'none';
    const activeSection = document.getElementById(jaVisible ? 'ja' : 'en');
    const target = activeSection.querySelector(href) || document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  if (motion) {
    setupStamps();
    setupTimelines();
  }
});

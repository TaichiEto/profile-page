if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 600, easing: 'ease-out', once: true });
} else {
  document.documentElement.classList.add('no-aos');
}

function toggleLang() {
  const jaContent = document.getElementById('ja');
  const enContent = document.getElementById('en');
  const langBtn = document.querySelector('.lang-btn');

  if (jaContent.style.display === 'none') {
    jaContent.style.display = 'block';
    enContent.style.display = 'none';
    langBtn.innerHTML = '<i class="fas fa-globe"></i> English';
  } else {
    jaContent.style.display = 'none';
    enContent.style.display = 'block';
    langBtn.innerHTML = '<i class="fas fa-globe"></i> 日本語';
  }
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
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

function animateSkillBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level');
          bar.style.width = level + '%';
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('.skill-progress').forEach((bar) => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    langBtn.innerHTML = '<i class="fas fa-globe"></i> English';
  }
  animateSkillBars();
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
});

// Language toggle function with animation
function toggleLang() {
  const jaContent = document.getElementById('ja');
  const enContent = document.getElementById('en');
  const langBtn = document.querySelector('.lang-btn');
  
  // Add fade-out animation
  if (jaContent.style.display !== 'none') {
    jaContent.classList.add('fade-out');
    setTimeout(() => {
      jaContent.style.display = 'none';
      enContent.style.display = 'block';
      enContent.classList.add('fade-in');
      langBtn.innerHTML = '<i class="fas fa-globe"></i> 言語を切り替え';
    }, 300);
  } else {
    enContent.classList.add('fade-out');
    setTimeout(() => {
      enContent.style.display = 'none';
      jaContent.style.display = 'block';
      jaContent.classList.add('fade-in');
      langBtn.innerHTML = '<i class="fas fa-globe"></i> Switch Language';
    }, 300);
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add hover effect to content blocks
document.querySelectorAll('.content-block').forEach(block => {
  block.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  
  block.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add intersection observer for fade-in animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});
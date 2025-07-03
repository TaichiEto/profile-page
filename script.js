// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});
// Disable pinch-zoom on mobile
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(metaViewport);
// Language toggle functionality
function toggleLang() {
  const jaContent = document.getElementById('ja');
  const enContent = document.getElementById('en');
  const langBtn = document.querySelector('.lang-btn');
  
  if (jaContent.style.display === 'none') {
    jaContent.style.display = 'block';
    enContent.style.display = 'none';
    langBtn.innerHTML = '<i class="fas fa-globe"></i> Switch to English';
  } else {
    jaContent.style.display = 'none';
    enContent.style.display = 'block';
    langBtn.innerHTML = '<i class="fas fa-globe"></i> 日本語に切り替え';
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add hover effect to content blocks
document.querySelectorAll('.content-block').forEach(block => {
  block.addEventListener('mouseenter', () => {
    block.style.transform = 'translateY(-5px)';
  });
  
  block.addEventListener('mouseleave', () => {
    block.style.transform = 'translateY(0)';
  });
});

// Add parallax effect to profile header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.profile-header');
  if (header) {
    const scrolled = window.scrollY;
    header.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Set initial language
  const langBtn = document.querySelector('.lang-btn');
  langBtn.innerHTML = '<i class="fas fa-globe"></i> Switch to English';
  
  // Add loading animation to social icons
  document.querySelectorAll('.social-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
  });
});

// Cat mascot speech toggle
function toggleCatSpeech() {
  const speech = document.getElementById('catSpeech');
  const messages = [
    'にゃ〜ん！',
    'みなさん、頑張って！',
    'お疲れ様です〜',
    'ページを見てくれてありがとう！'
  ];
  
  // Random message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  speech.textContent = randomMessage;
  
  // Show speech bubble
  speech.classList.add('show');
  
  // Hide after 3 seconds
  setTimeout(() => {
    speech.classList.remove('show');
  }, 3000);
}
function toggleLang() {
    const ja = document.getElementById('ja');
    const en = document.getElementById('en');
    if (ja.style.display === 'none') {
      ja.style.display = 'block';
      en.style.display = 'none';
    } else {
      ja.style.display = 'none';
      en.style.display = 'block';
    }
  }
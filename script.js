// --- Menu burger responsif amélioré ---
const burger = document.getElementById('burger-menu');
const navUl = document.querySelector('nav ul');
function closeMenu() {
  navUl.classList.remove('open');
  document.body.classList.remove('menu-open');
}
burger.addEventListener('click', () => {
  navUl.classList.toggle('open');
  if (navUl.classList.contains('open')) {
    document.body.classList.add('menu-open');
  } else {
    document.body.classList.remove('menu-open');
  }
});
// Ferme le menu au clic sur un lien
navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});
// Ferme le menu au clic à l'extérieur
window.addEventListener('click', (e) => {
  if (window.innerWidth <= 700 && navUl.classList.contains('open')) {
    if (!navUl.contains(e.target) && !burger.contains(e.target)) {
      closeMenu();
    }
  }
});

// --- Afficher/Masquer la section À propos ---
const toggleAboutBtn = document.getElementById('toggle-about');
const aboutContent = document.getElementById('about-content');
toggleAboutBtn.addEventListener('click', () => {
  aboutContent.classList.toggle('hidden');
});

// --- Scroll doux vers le haut (scroll-to-top) ---
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Carrousel d'images ---
const carousel = document.getElementById('carousel');
if (carousel) {
  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentIndex = 0;
  function showCarouselItem(index) {
    if (!items.length) return;
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }
  if (prevBtn && nextBtn && items.length) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showCarouselItem(currentIndex);
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      showCarouselItem(currentIndex);
    });
    // Initialisation
    showCarouselItem(currentIndex);
  }
}

// --- Animation au scroll (apparition douce) ---
const animatedEls = document.querySelectorAll('[data-animate], .service-card, .carousel, .about-content, form');
function animateOnScroll() {
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// --- Validation du formulaire de contact ---
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorMessage = document.getElementById('error-message');
const formSuccess = document.getElementById('form-success');

// --- Validation du formulaire de contact en temps réel ---
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showValidation(input, errorElem, isValid, message) {
  if (isValid) {
    errorElem.textContent = '✓ Champ valide';
    errorElem.style.color = '#27ae60';
  } else {
    errorElem.textContent = message;
    errorElem.style.color = '#e74c3c';
  }
}

nameInput.addEventListener('input', function() {
  if (nameInput.value.trim() === '') {
    showValidation(nameInput, errorName, false, 'Veuillez entrer votre nom.');
  } else {
    showValidation(nameInput, errorName, true, '');
  }
});
nameInput.addEventListener('blur', function() {
  if (nameInput.value.trim() === '') {
    showValidation(nameInput, errorName, false, 'Veuillez entrer votre nom.');
  } else {
    showValidation(nameInput, errorName, true, '');
  }
});

emailInput.addEventListener('input', function() {
  if (emailInput.value.trim() === '') {
    showValidation(emailInput, errorEmail, false, 'Veuillez entrer votre email.');
  } else if (!validateEmail(emailInput.value.trim())) {
    showValidation(emailInput, errorEmail, false, 'Format d\'email invalide.');
  } else {
    showValidation(emailInput, errorEmail, true, '');
  }
});
emailInput.addEventListener('blur', function() {
  if (emailInput.value.trim() === '') {
    showValidation(emailInput, errorEmail, false, 'Veuillez entrer votre email.');
  } else if (!validateEmail(emailInput.value.trim())) {
    showValidation(emailInput, errorEmail, false, 'Format d\'email invalide.');
  } else {
    showValidation(emailInput, errorEmail, true, '');
  }
});

messageInput.addEventListener('input', function() {
  if (messageInput.value.trim() === '') {
    showValidation(messageInput, errorMessage, false, 'Veuillez entrer un message.');
  } else {
    showValidation(messageInput, errorMessage, true, '');
  }
});
messageInput.addEventListener('blur', function() {
  if (messageInput.value.trim() === '') {
    showValidation(messageInput, errorMessage, false, 'Veuillez entrer un message.');
  } else {
    showValidation(messageInput, errorMessage, true, '');
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;
  if (nameInput.value.trim() === '') {
    showValidation(nameInput, errorName, false, 'Veuillez entrer votre nom.');
    valid = false;
  }
  if (emailInput.value.trim() === '') {
    showValidation(emailInput, errorEmail, false, 'Veuillez entrer votre email.');
    valid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showValidation(emailInput, errorEmail, false, 'Format d\'email invalide.');
    valid = false;
  }
  if (messageInput.value.trim() === '') {
    showValidation(messageInput, errorMessage, false, 'Veuillez entrer un message.');
    valid = false;
  }
  if (valid) {
    form.classList.add('sending');
    form.classList.remove('show-success');
    document.getElementById('form-loader').classList.remove('hidden');
    document.getElementById('form-success').classList.add('hidden');
    setTimeout(() => {
      form.classList.remove('sending');
      form.classList.add('show-success');
      document.getElementById('form-loader').classList.add('hidden');
      document.getElementById('form-success').classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        document.getElementById('form-success').classList.add('hidden');
        form.classList.remove('show-success');
        errorName.textContent = '';
        errorEmail.textContent = '';
        errorMessage.textContent = '';
      }, 3500);
    }, 1000);
  }
});

// --- Scroll doux pour les liens du menu ---
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
      navUl.classList.remove('open'); // Ferme le menu sur mobile
    }
  });
});

// --- Scroll instantané pour le bouton contact de la hero ---
const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
  heroBtn.addEventListener('click', function(e) {
    const target = document.getElementById('contact');
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
}

// --- Afficher/masquer la description d'un service au clic ---
document.querySelectorAll('.toggle-service').forEach(card => {
  card.addEventListener('click', function() {
    const desc = this.querySelector('.service-desc');
    if (desc) desc.classList.toggle('hidden');
  });
});

// --- Préparation pour bonus (modale, progress bar, etc.) ---
// À compléter selon l'avancement 

// --- Effet hero : le texte suit le curseur en position opposée avec un transform smooth ---
const heroContent = document.querySelector('.hero-content');
let heroAnimX = 0, heroAnimY = 0;
window.addEventListener('mousemove', (e) => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // Normalisation du curseur entre -1 et 1
  const x = (e.clientX / w) * 2 - 1;
  const y = (e.clientY / h) * 2 - 1;
  // Mouvement opposé (inversé)
  const maxMove = 40; // px
  heroAnimX = -x * maxMove;
  heroAnimY = -y * maxMove;
  heroContent.style.transform = `translate(${heroAnimX}px, ${heroAnimY}px)`;
  heroContent.style.transition = 'transform 4.2s cubic-bezier(.4,1.6,.4,1)';
}); 

// --- Synchronisation de la hauteur de la carte avec celle du formulaire ---
function syncContactMapHeight() {
  const form = document.getElementById('contact-form');
  const map = document.querySelector('.contact-map');
  if (form && map && window.innerWidth > 900) {
    map.style.height = form.offsetHeight + 'px';
  } else if (map) {
    map.style.height = '';
  }
}
window.addEventListener('load', syncContactMapHeight);
window.addEventListener('resize', syncContactMapHeight); 

// --- Progress bar de lecture de la page ---
const progressBar = document.getElementById('progress-bar');
function updateProgressBar() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', updateProgressBar);
window.addEventListener('resize', updateProgressBar);
window.addEventListener('load', updateProgressBar); 

// --- Galerie d'images filtrable ---
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
galleryFilters.forEach(btn => {
  btn.addEventListener('click', function() {
    galleryFilters.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    // Réorganise les items : les correspondants d'abord
    const grid = document.querySelector('.gallery-grid');
    const items = Array.from(galleryItems);
    const matching = [];
    const notMatching = [];
    items.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-cat') === filter) {
        item.classList.remove('filtered-out');
        matching.push(item);
      } else {
        item.classList.add('filtered-out');
        notMatching.push(item);
      }
    });
    // Réordonne dans le DOM
    [...matching, ...notMatching].forEach(item => grid.appendChild(item));
  });
}); 
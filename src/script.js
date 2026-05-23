const whatsappBase = "https://wa.me/5511940018352?text=";
let selectedTypeLabel = "";

// ── NAVEGAÇÃO ENTRE STEPS ──
function nextStep(stepId) {
  document.querySelectorAll('.sim-step').forEach(step => {
    step.classList.remove('active');
  });
  document.getElementById(stepId).classList.add('active');
}

function selectType(type) {
  if (type === 'Casa') {
    nextStep('step-casa');
  } else if (type === 'Condominio') {
    nextStep('step-condo');
  } else if (type === 'Comercio') {
    nextStep('step-comercio');
  }
}

function goToSimulator(label) {
  selectedTypeLabel = label;
  document.getElementById('sim-header-title').innerText = "SIMULE SEU " + label.toUpperCase();
  nextStep('step-calculator');
  atualizarV4();
}

function finishCasa(option) {
  const msg = encodeURIComponent(`eu vi a página de vocês e quero contratar para a minha casa ${option}`);
  window.open(whatsappBase + msg, '_blank');
}

// ── SIMULADOR ──
const sliderV4   = document.getElementById('slider-v4');
const valorV4    = document.getElementById('valor-v4');
const unidadesV4 = document.getElementById('unidades-v4');
const porteV4    = document.getElementById('porte-v4');
const alertaV4   = document.getElementById('alerta-v4');
const toqueBoxV4 = document.getElementById('toqueBox-v4');
const valorToqueBox = 33.90;

function calcularValorV4(qtd) {
  let total = 89.90;
  if (qtd <= 25) {
    total = 89.90;
  } else if (qtd <= 35) {
    total = 89.90 + ((qtd - 25) * 2.90);
  } else if (qtd <= 99) {
    total = 89.90 + (10 * 2.90) + ((qtd - 35) * 3.50);
  } else {
    total = 89.90 + (10 * 2.90) + (64 * 3.50) + ((qtd - 99) * 3.15);
  }
  if (toqueBoxV4.checked) {
    total += valorToqueBox;
  }
  return total;
}

function atualizarV4() {
  const qtd = parseInt(sliderV4.value);
  unidadesV4.innerText = qtd;

  const total = calcularValorV4(qtd);
  valorV4.innerText = total.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  let tipo = '';
  if (qtd <= 35) {
    tipo = 'Pequeno';
  } else if (qtd <= 99) {
    tipo = 'Médio';
  } else {
    tipo = 'Grande';
  }
  porteV4.innerHTML = `Porte: <span>${tipo}</span>`;

  if (qtd >= 200) {
    alertaV4.style.display = 'block';
  } else {
    alertaV4.style.display = 'none';
  }
}

sliderV4.addEventListener('input', atualizarV4);
toqueBoxV4.addEventListener('change', atualizarV4);

function finishSimulatorV4() {
  const msg = encodeURIComponent(`eu vi a página de vocês e quero contratar para o meu ${selectedTypeLabel}`);
  window.open(whatsappBase + msg, '_blank');
}


// ── INTERSECTION OBSERVER PARA ANIMAÇÕES DE SCROLL ──
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos os elementos com classe 'reveal'
document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach(el => observer.observe(el));
  
  // Adicionar classes de reveal aos elementos automaticamente
  addRevealClasses();
});

// Adicionar classes de reveal aos elementos principais
function addRevealClasses() {
  // Seções
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    if (!section.classList.contains('reveal')) {
      section.classList.add('reveal');
    }
  });

  // Cards de benefícios
  const benCards = document.querySelectorAll('.ben-card');
  benCards.forEach(card => {
    if (!card.classList.contains('reveal')) {
      card.classList.add('reveal-scale');
    }
  });

  // Cards de problemas
  const dorCards = document.querySelectorAll('.dor-card');
  dorCards.forEach(card => {
    if (!card.classList.contains('reveal')) {
      card.classList.add('reveal-scale');
    }
  });

  // Cards de solução
  const solCards = document.querySelectorAll('.sol-card');
  solCards.forEach(card => {
    if (!card.classList.contains('reveal')) {
      card.classList.add('reveal-scale');
    }
  });

  // Observar os novos elementos
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  revealElements.forEach(el => {
    if (!el.classList.contains('active')) {
      observer.observe(el);
    }
  });
}

// ── PARALLAX EFFECT NO SCROLL ──
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  parallaxElements.forEach(el => {
    const yPos = scrolled * 0.5;
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// ── EFEITO DE MOVIMENTO NO MOUSE ──
document.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  const blobs = document.querySelectorAll('.blob');
  blobs.forEach(blob => {
    const offsetX = (mouseX - 0.5) * 20;
    const offsetY = (mouseY - 0.5) * 20;
    blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});

// ── ANIMAÇÃO DE ENTRADA PARA ELEMENTOS VISÍVEIS ──
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-animate]');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('animated');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);

// ── SMOOTH SCROLL ENHANCEMENT ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ── DETECTAR QUANDO ELEMENTOS ENTRAM NA VIEWPORT ──
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.ben-card, .dor-card, .sol-card, .form-container');
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(el => scrollObserver.observe(el));
}

// Executar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
  setupScrollAnimations();
}

// ── EFEITO DE CONTADOR PARA NÚMEROS ──
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ── EFEITO DE FADE IN PARA IMAGENS ──
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease-in-out';
});


// ── SCROLL PROGRESS BAR ──
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }
  
  progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ── STICKY HEADER COM VIDRO ──
function updateStickyHeader() {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateStickyHeader);

// ── GLOW EFFECT NO MOUSE ──
document.addEventListener('mousemove', function(e) {
  const buttons = document.querySelectorAll('.nav-cta, .sim-start-btn, .form-btn, .sol-strip-btn');
  
  buttons.forEach(button => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
    
    if (distance < maxDistance + 100) {
      const intensity = (1 - distance / (maxDistance + 100)) * 0.5;
      button.style.boxShadow = `0 0 ${20 + intensity * 30}px rgba(60, 194, 59, ${0.4 + intensity * 0.6})`;
    }
  });
});

// ── ANIMAÇÃO DE CARDS AO ENTRAR NA VIEWPORT ──
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.ben-card, .dor-card, .sol-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    cardObserver.observe(card);
  });
});

// ── EFEITO PARALLAX APRIMORADO ──
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.video-embed, section');
  
  parallaxElements.forEach((el, index) => {
    if (index % 2 === 0) {
      const yPos = scrolled * 0.3;
      el.style.transform = `translateY(${yPos}px)`;
    }
  });
});

// ── ANIMAÇÃO DE NÚMEROS (CONTADOR) ──
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    if (elapsed < duration) {
      current = Math.floor((elapsed / duration) * target);
      element.textContent = current;
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  update();
}

// Iniciar contadores quando entram na viewport
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const target = parseInt(entry.target.textContent);
      if (!isNaN(target)) {
        animateCounter(entry.target, target);
        entry.target.dataset.animated = 'true';
      }
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const trustItems = document.querySelectorAll('.trust-item strong');
  trustItems.forEach(item => {
    const text = item.textContent;
    if (text.includes('+') || text.includes('%')) {
      const number = parseInt(text);
      if (!isNaN(number)) {
        counterObserver.observe(item);
      }
    }
  });
});

// ── RIPPLE EFFECT NOS BOTÕES ──
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  button.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.sim-start-btn, .form-btn, .sol-strip-btn');
  buttons.forEach(button => {
    button.addEventListener('click', createRipple);
  });
});

// ── SMOOTH SCROLL ENHANCEMENT ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ── FADE IN PARA IMAGENS ──
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease-in-out';
    
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
});

// ── EFEITO DE FOCUS NOS INPUTS ──
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

// ── ANIMAÇÃO DE ENTRADA PARA SEÇÕES ──
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      sectionObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    sectionObserver.observe(section);
  });
});

// ── DETECÇÃO DE DISPOSITIVO PARA OTIMIZAR ANIMAÇÕES ──
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isReducedMotion) {
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

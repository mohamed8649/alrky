// ============ Mobile Menu Toggle ============
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const themeToggle = document.getElementById('themeToggle');

// ============ Theme Toggle ============
if (themeToggle) {
  const setTheme = (theme) => {
    const isDark = theme === 'dark';

    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('site-theme', theme);
    } catch (error) {}
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي');
  };

  setTheme(document.documentElement.dataset.theme || 'light');

  themeToggle.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
}

if (menuBtn && navLinks) {
  const toggleMenu = () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
  };

  const closeMenu = () => {
    menuBtn.classList.remove('active');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  menuBtn.addEventListener('click', toggleMenu);

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ============ Sticky Header Hide on Scroll Down ============
const header = document.getElementById('siteHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (document.body.classList.contains('menu-open')) {
    header.style.top = '16px';
    return;
  }

  const current = window.scrollY;
  if (current > lastScroll && current > 120) {
    header.style.top = '-90px';
  } else {
    header.style.top = '16px';
  }
  lastScroll = current;
});

// ============ Scroll Reveal Animation ============
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ============ Contact Form (Send to WhatsApp) ============
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const msg = document.getElementById('contactMessage').value.trim();

    if (name.length > 80 || phone.length > 30 || msg.length > 700) {
      status.textContent = 'البيانات المدخلة طويلة جداً، يرجى اختصار الرسالة والمحاولة مرة أخرى.';
      return;
    }
    
    const textMsg = `السلام عليكم ورحمة الله وبركاته،\nأود الاستفسار بخصوص خدمة: *${service}*\n\n*الاسم:* ${name}\n*رقم الهاتف:* ${phone}\n*تفاصيل الرسالة:*\n${msg}`;
    
    const whatsappNumber = '218914776038'; 
    const whatsappUrl = new URL('https://api.whatsapp.com/send');
    whatsappUrl.searchParams.set('phone', whatsappNumber);
    whatsappUrl.searchParams.set('text', textMsg);
    
    const whatsappWindow = window.open(whatsappUrl.toString(), '_blank', 'noopener,noreferrer');
    if (whatsappWindow) {
      whatsappWindow.opener = null;
    }
    
    status.textContent = 'تم تحويلكم للواتساب لإرسال الرسالة بنجاح.';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
}

// ============ Goals Image Slider ============
const slides = document.querySelectorAll('#goalsSlider .slide');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dots = document.querySelectorAll('#sliderDots .dot');
let currentSlide = 0;
let slideInterval;

if (slides.length > 0) {
  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  const startAutoSlide = () => {
    slideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval);
    startAutoSlide();
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoSlide();
    });
  });

  startAutoSlide();
}

// ============ Back to Top Button ============
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

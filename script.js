// ==========================================
// دهانات جده - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2000);
  }

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    navLinks?.classList.contains('open')
      ? spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)'
      : spans[0].style.cssText = '';
    navLinks?.classList.contains('open')
      ? spans[1].style.cssText = 'opacity: 0'
      : spans[1].style.cssText = '';
    navLinks?.classList.contains('open')
      ? spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)'
      : spans[2].style.cssText = '';
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
    });
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(
    '.service-card, .testimonial-card, .why-content, .why-image, .about-content, .about-image, .value-card, .service-detail-card, .contact-item, .contact-form-wrap, .contact-info'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== GALLERY FILTER =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach((item, i) => {
        const show = filter === 'all' || item.dataset.category === filter;
        if (show) {
          item.classList.remove('hidden');
          item.style.animation = `fadeInUp 0.4s ease ${i * 0.03}s both`;
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ===== STATS COUNTER ANIMATION =====
  const statNums = document.querySelectorAll('.stat-num, .about-stat span');

  const countUp = (el) => {
    const target = parseInt(el.textContent);
    if (isNaN(target)) return;
    const suffix = el.textContent.replace(/[0-9]/g, '');
    let count = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(count) + suffix;
    }, 30);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));

  // ===== FLOATING BUTTONS PULSE =====
  const floatBtns = document.querySelectorAll('.float-btn');
  floatBtns.forEach((btn, i) => {
    btn.style.animationDelay = `${i * 0.5}s`;
    btn.style.animation = `floatPulse 3s ease-in-out ${i * 0.5}s infinite`;
  });

  // Inject keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatPulse {
      0%, 100% { box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
      50% { box-shadow: 0 12px 40px rgba(0,0,0,0.5); transform: translateY(-3px); }
    }
    .whatsapp-btn { animation: waPulse 3s ease-in-out infinite !important; }
    @keyframes waPulse {
      0%, 100% { box-shadow: 0 8px 25px rgba(37,211,102,0.35); }
      50% { box-shadow: 0 12px 40px rgba(37,211,102,0.6); transform: translateY(-3px); }
    }
    .call-btn { animation: callPulse 3s ease-in-out 1s infinite !important; }
    @keyframes callPulse {
      0%, 100% { box-shadow: 0 8px 25px rgba(201,168,76,0.35); }
      50% { box-shadow: 0 12px 40px rgba(201,168,76,0.6); transform: translateY(-3px); }
    }
  `;
  document.head.appendChild(style);

  // ===== SMOOTH HOVER ON GALLERY ITEMS =====
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.zIndex = '10';
    });
    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '';
    });
  });

});

// ===== LIGHTBOX =====
let currentIndex = 1;
const totalImages = 37;
const VIDEO_START = 30; // indices 30-37 are videos

// Map: index -> video filename (30=1.mp4, 31=2.mp4, ... 37=8.mp4)
function getVideoSrc(index) {
  return `images/${index - VIDEO_START + 1}.mp4`;
}

function isVideo(index) {
  return index >= VIDEO_START;
}

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const video = document.getElementById('lightboxVideo');
  const caption = document.getElementById('lightboxCaption');

  if (!lightbox) return;

  if (isVideo(index)) {
    // Show video, hide image
    if (img) img.style.display = 'none';
    if (video) {
      video.style.display = 'block';
      video.src = getVideoSrc(index);
      video.load();
    }
  } else {
    // Show image, hide/stop video
    if (video) {
      video.pause();
      video.src = '';
      video.style.display = 'none';
    }
    if (img) {
      img.style.display = 'block';
      img.src = `images/${index}.jpg`;
      img.onerror = function() {
        this.src = '';
        this.alt = `صورة المشروع رقم ${index}`;
      };
    }
  }

  if (caption) {
    const type = isVideo(index) ? 'فيديو' : 'صورة';
    caption.textContent = `${type} رقم ${index} من ${totalImages}`;
  }

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const video = document.getElementById('lightboxVideo');
  if (video) { video.pause(); video.src = ''; }
  if (lightbox) lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function prevImage() {
  currentIndex = currentIndex > 1 ? currentIndex - 1 : totalImages;
  openLightbox(currentIndex);
}

function nextImage() {
  currentIndex = currentIndex < totalImages ? currentIndex + 1 : 1;
  openLightbox(currentIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'ArrowRight') prevImage();
  if (e.key === 'ArrowLeft') nextImage();
  if (e.key === 'Escape') closeLightbox();
});

// Touch swipe for lightbox
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox?.classList.contains('active')) return;
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextImage() : prevImage();
  }
});

/* ============================================
   YL² PREMIUM HOODIE — FUNNEL JAVASCRIPT
   ============================================ */

// --- COUNTDOWN TIMER ---
function initCountdown() {
  const els = document.querySelectorAll('.countdown');
  if (!els.length) return;
  // Set drop end to 72 hours from first visit (persisted)
  let end = localStorage.getItem('yl2_drop_end');
  if (!end || parseInt(end) <= Date.now()) {
    // Reset timer if not set or already expired
    end = Date.now() + 72 * 60 * 60 * 1000;
    localStorage.setItem('yl2_drop_end', end);
  }
  end = parseInt(end);

  function update() {
    const diff = Math.max(0, end - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els.forEach(el => {
      const nums = el.querySelectorAll('.countdown-num');
      if (nums[0]) nums[0].textContent = String(d).padStart(2, '0');
      if (nums[1]) nums[1].textContent = String(h).padStart(2, '0');
      if (nums[2]) nums[2].textContent = String(m).padStart(2, '0');
      if (nums[3]) nums[3].textContent = String(s).padStart(2, '0');
    });
  }
  update();
  setInterval(update, 1000);
}

// --- STICKY HEADER ---
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  const bar = document.querySelector('.announcement-bar');
  const offset = bar ? bar.offsetHeight : 0;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > offset + 20);
  }, { passive: true });
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
  const items = document.querySelectorAll('.fade-up, .scale-in');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => obs.observe(el));
}

// --- DYNAMIC IMAGE GALLERY ENGINE ---
const GALLERY_DATA = {
  blue: [
    "assets/DSC07423-2_Original.jpg",
    "assets/DSC07467.jpg",
    "assets/DSC07501.jpg",
    "assets/DSC07564_Original.jpg",
    "assets/DSC07718_Original.jpg"
  ],
  black: [
    "assets/DSC07504.jpg",
    "assets/DSC07539.jpg",
    "assets/IMG_9092.JPG",
    "assets/DSC07510_optimized.jpg",
    "assets/DSC07520_optimized.jpg",
    "assets/DSC07535_optimized.jpg",
    "assets/DSC07549_optimized.jpg",
    "assets/DSC08586_Original.jpg",
    "assets/DSC08740_Original.jpg"
  ]
};

function updateGalleryColor(color) {
  const mainImage = document.querySelector('.gallery-main img');
  const thumbsContainer = document.querySelector('.gallery-thumbs');
  if (!mainImage || !thumbsContainer) return;
  
  const images = GALLERY_DATA[color] || GALLERY_DATA.blue;
  
  // Set main image to the first image of the selected color
  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = images[0];
    mainImage.alt = `YL² Premium Hoodie - ${color.charAt(0).toUpperCase() + color.slice(1)}`;
    mainImage.style.opacity = '1';
  }, 200);

  // Render new thumbnails
  thumbsContainer.innerHTML = '';
  images.forEach((imgUrl, index) => {
    const thumb = document.createElement('div');
    thumb.className = `gallery-thumb${index === 0 ? ' active' : ''}`;
    
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = `${color.charAt(0).toUpperCase() + color.slice(1)} view ${index + 1}`;
    
    thumb.appendChild(img);
    thumbsContainer.appendChild(thumb);
    
    // Bind click event to thumbnail
    thumb.addEventListener('click', () => {
      thumbsContainer.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      
      mainImage.style.opacity = '0';
      setTimeout(() => {
        mainImage.src = imgUrl;
        mainImage.style.opacity = '1';
      }, 200);
    });
  });
}

function initGallery() {
  // Main thumbnail clicks logic when first loading page
  const main = document.querySelector('.gallery-main img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!main || !thumbs.length) return;
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      main.style.opacity = '0';
      setTimeout(() => {
        main.src = t.querySelector('img').src;
        main.style.opacity = '1';
      }, 200);
    });
  });
}

// --- SIZE SELECTOR ---
function initSizeSelector() {
  const btns = document.querySelectorAll('.size-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// --- COLOR SELECTOR ---
function initColorSelector() {
  const swatches = document.querySelectorAll('.color-swatch');
  swatches.forEach(s => {
    s.addEventListener('click', () => {
      swatches.forEach(x => x.classList.remove('active'));
      s.classList.add('active');
      const color = s.dataset.color;
      updateGalleryColor(color);
    });
  });
}

// --- FAQ ACCORDION ---
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// --- SOCIAL PROOF TICKER ---
function initSocialTicker() {
  const el = document.querySelector('.viewer-count');
  if (!el) return;
  let count = Math.floor(Math.random() * 60) + 89;
  el.textContent = count;
  setInterval(() => {
    count += Math.floor(Math.random() * 5) - 2;
    count = Math.max(73, Math.min(198, count));
    el.textContent = count;
  }, 3000);
}

// --- STOCK COUNTER ---
function initStockCounter() {
  const el = document.querySelector('.stock-num');
  if (!el) return;
  let stock = parseInt(el.textContent) || 47;
  setInterval(() => {
    if (Math.random() > 0.7 && stock > 12) {
      stock--;
      el.textContent = stock;
    }
  }, 15000);
}

// --- SMOOTH SCROLL ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// --- INIT ALL ---
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initStickyHeader();
  initScrollAnimations();
  initGallery();
  initSizeSelector();
  initColorSelector();
  initFAQ();
  initSocialTicker();
  initStockCounter();
  initSmoothScroll();
  
  // Set initial gallery color layout
  updateGalleryColor('blue');
});

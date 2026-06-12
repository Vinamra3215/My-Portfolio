// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (window.matchMedia('(pointer: fine)').matches) {
  cursor.style.display = 'block';
  cursorRing.style.display = 'block';

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
    cursorRing.style.left = e.clientX - 16 + 'px';
    cursorRing.style.top = e.clientY - 16 + 'px';
  });
}

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ========== ACTIVE NAV HIGHLIGHTING ==========
const sections = document.querySelectorAll('section.page');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === '#' + current) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ========== FADE-UP INTERSECTION OBSERVER ==========
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

// ========== BLOG TOGGLE ==========
function openBlog() {
  document.getElementById('blog-teaser').style.display = 'none';
  document.getElementById('blog-article').style.display = 'block';
  document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
}

function closeBlog() {
  document.getElementById('blog-article').style.display = 'none';
  document.getElementById('blog-teaser').style.display = 'block';
  document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
}

// ========== CONTACT FORM ==========
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Hi Vinamra,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:vinamragupta100@gmail.com?subject=${subject}&body=${body}`;
}

// ========== SMOOTH SCROLL FOR NAV ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== COSMIC STARFIELD (SEAMLESS LOOP) ==========
function createStarfield() {
  const starfield = document.createElement('div');
  starfield.id = 'starfield';
  starfield.style.position = 'fixed';
  starfield.style.inset = '0';
  starfield.style.pointerEvents = 'none';
  starfield.style.zIndex = '0';
  starfield.style.overflow = 'hidden';
  
  // 3 distinct parallax tiers for structural space depth
  const layers = [
    { count: 120, size: '1px', speed: '140s' },
    { count: 60, size: '2px', speed: '100s' },
    { count: 20, size: '3px', speed: '60s' }
  ];

  const fieldWidth = 2560; 
  const loopHeight = 2000; // Exact keyframe translation boundary

  layers.forEach((layer, idx) => {
    const starLayer = document.createElement('div');
    starLayer.className = `star-layer layer-${idx}`;
    starLayer.style.position = 'absolute';
    starLayer.style.top = '0';
    starLayer.style.left = '0';
    
    let shadows = [];
    for (let i = 0; i < layer.count; i++) {
      const x = Math.floor(Math.random() * fieldWidth);
      const y = Math.floor(Math.random() * loopHeight);
      const opacity = (Math.random() * 0.6 + 0.4).toFixed(2);
      
      // Primary star placement
      shadows.push(`${x}px ${y}px rgba(255, 255, 255, ${opacity})`);
      // Duplicate offset placement ensures zero-pop seamless wrap-around animation loops
      shadows.push(`${x}px ${y + loopHeight}px rgba(255, 255, 255, ${opacity})`);
    }

    starLayer.style.boxShadow = shadows.join(', ');
    starLayer.style.width = layer.size;
    starLayer.style.height = layer.size;
    starLayer.style.borderRadius = '50%';
    starLayer.style.animation = `star-drift-${idx} ${layer.speed} linear infinite`;
    
    starfield.appendChild(starLayer);
  });

  document.body.appendChild(starfield);
}

// Inject seamless mathematical looping keyframes matching loopHeight
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes star-drift-0 {
    from { transform: translateY(0); }
    to { transform: translateY(-2000px); }
  }
  @keyframes star-drift-1 {
    from { transform: translateY(0); }
    to { transform: translateY(-2000px); }
  }
  @keyframes star-drift-2 {
    from { transform: translateY(0); }
    to { transform: translateY(-2000px); }
  }
`;
document.head.appendChild(styleSheet);

window.addEventListener('DOMContentLoaded', createStarfield);
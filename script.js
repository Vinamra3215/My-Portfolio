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
  // Scroll to top of blog section
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

  // Open mailto with pre-filled content
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

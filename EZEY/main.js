// -------------------------------------------------- //
// Header: sticky scroll-state                         //
// -------------------------------------------------- //
const siteHeader = document.getElementById('site-header');

function handleHeaderScroll() {
  siteHeader.classList.toggle('header-scrolled', window.scrollY > 40);
}

handleHeaderScroll();
window.addEventListener('scroll', handleHeaderScroll);

// -------------------------------------------------- //
// Header: mobile menu open/close                      //
// -------------------------------------------------- //
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

function openMobileNav() {
  mobileNav.classList.add('is-open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('is-open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (mobileNav.classList.contains('is-open')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
});

// Smooth scrolling to a section (html { scroll-behavior: smooth } in
// main.css handles the animation) should also close the mobile menu so it
// doesn't stay open over the section the visitor just navigated to.
mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

// -------------------------------------------------- //
// Photo gallery lightbox                              //
// -------------------------------------------------- //
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    openLightbox(item.dataset.full, image.alt);
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) {
    closeLightbox();
  }
});

// -------------------------------------------------- //
// Contact form validation                             //
// -------------------------------------------------- //
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

const contactFields = {
  name: {
    input: document.getElementById('contact-name-input'),
    error: document.getElementById('contact-name-error'),
  },
  email: {
    input: document.getElementById('contact-email-input'),
    error: document.getElementById('contact-email-error'),
  },
  message: {
    input: document.getElementById('contact-message-input'),
    error: document.getElementById('contact-message-error'),
  },
};

function setFieldError(field, message) {
  field.input.setAttribute('aria-invalid', 'true');
  field.error.textContent = message;
  field.error.hidden = false;
}

function clearFieldError(field) {
  field.input.removeAttribute('aria-invalid');
  field.error.textContent = '';
  field.error.hidden = true;
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactSuccess.hidden = true;

  let isValid = true;

  if (!contactFields.name.input.value.trim()) {
    setFieldError(contactFields.name, 'Please enter your name.');
    isValid = false;
  } else {
    clearFieldError(contactFields.name);
  }

  const emailValue = contactFields.email.input.value.trim();
  if (!emailValue) {
    setFieldError(contactFields.email, 'Please enter your email.');
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    setFieldError(contactFields.email, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearFieldError(contactFields.email);
  }

  if (!contactFields.message.input.value.trim()) {
    setFieldError(contactFields.message, 'Please enter a short message.');
    isValid = false;
  } else {
    clearFieldError(contactFields.message);
  }

  if (isValid) {
    contactSuccess.hidden = false;
    contactForm.reset();
  }
});

// -------------------------------------------------- //
// Property search: visual-only submission              //
// -------------------------------------------------- //
const searchForm = document.getElementById('search-form');
const searchResult = document.getElementById('search-result');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(searchForm);
  const location = formData.get('location');
  const type = formData.get('type');
  const bedrooms = formData.get('bedrooms');
  const baths = formData.get('baths');

  searchResult.textContent =
    `Searching ${location} for ${type.toLowerCase()} listings, ${bedrooms} bedrooms & ${baths} baths. ` +
    'Marci will follow up with matching properties shortly.';
  searchResult.hidden = false;
});

searchForm.addEventListener('input', () => {
  searchResult.hidden = true;
});

(function () {
  'use strict';

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* Pause hero video for reduced-motion users (in addition to CSS fallback) */
  var heroVideo = document.querySelector('.hero__media');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (heroVideo) {
    if (prefersReducedMotion.matches) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
    }
    prefersReducedMotion.addEventListener('change', function (e) {
      if (e.matches) {
        heroVideo.pause();
      } else {
        heroVideo.play().catch(function () {});
      }
    });
  }

  /* Footer year */
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Contact form -> mailto (static site, no backend) */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('#cf-name').value.trim();
      var email = contactForm.querySelector('#cf-email').value.trim();
      var phone = contactForm.querySelector('#cf-phone').value.trim();
      var service = contactForm.querySelector('#cf-service').value;
      var message = contactForm.querySelector('#cf-message').value.trim();
      var status = contactForm.querySelector('.form-status');

      if (!name || !email || !message) {
        if (status) {
          status.textContent = 'Please fill in your name, email and message before continuing.';
          status.classList.add('is-visible');
        }
        return;
      }

      var recipient = 'jim@sutherlandplanning.com,chris@sutherlandplanning.com';
      var subject = 'Website enquiry from ' + name + (service ? ' — ' + service : '');
      var bodyLines = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + (phone || 'Not provided'),
        'Service of interest: ' + (service || 'Not specified'),
        '',
        message
      ];

      var mailto = 'mailto:' + encodeURIComponent(recipient).replace(/%2C/g, ',') +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(bodyLines.join('\n'));

      if (status) {
        status.textContent = 'Opening your email client to send this enquiry to Jim and Chris…';
        status.classList.add('is-visible');
      }

      window.location.href = mailto;
    });
  }
})();

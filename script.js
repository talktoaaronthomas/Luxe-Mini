/* ============================================
   LUXE MINI — Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initInventoryFilter();
  initTestimonialSlider();
  initEMICalculator();
  initContactForm();
  initSmoothScroll();
  initCounterAnimation();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

/* ---------- Scroll Reveal Animation ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Inventory Filter ---------- */
function initInventoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const carCards = document.querySelectorAll('.car-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      carCards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.5s var(--ease-out) forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------- Testimonial Slider ---------- */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dots = document.querySelectorAll('.dot');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  const totalSlides = cards.length;
  let autoPlayInterval;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Button controls
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

  // Dot controls
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.slide));
      resetAutoPlay();
    });
  });

  // Auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  startAutoPlay();

  // Pause on hover
  const slider = document.getElementById('testimonialSlider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    slider.addEventListener('mouseleave', startAutoPlay);
  }

  // Touch/Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }, { passive: true });
}

/* ---------- EMI Calculator ---------- */
function initEMICalculator() {
  const loanAmountSlider = document.getElementById('loanAmount');
  const interestRateSlider = document.getElementById('interestRate');
  const tenureSlider = document.getElementById('tenure');

  if (!loanAmountSlider || !interestRateSlider || !tenureSlider) return;

  function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  function formatLakh(amount) {
    if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1) + 'L';
    }
    return formatCurrency(amount);
  }

  function calculateEMI() {
    const P = parseFloat(loanAmountSlider.value);
    const annualRate = parseFloat(interestRateSlider.value);
    const years = parseInt(tenureSlider.value);
    const N = years * 12;
    const R = annualRate / (12 * 100);

    // EMI formula: P * R * (1+R)^N / ((1+R)^N - 1)
    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    // Update displays
    document.getElementById('loanAmountDisplay').textContent = formatCurrency(P);
    document.getElementById('interestRateDisplay').textContent = annualRate + '%';
    document.getElementById('tenureDisplay').textContent = years + (years === 1 ? ' Year' : ' Years');

    document.getElementById('emiAmount').innerHTML = formatCurrency(Math.round(emi)) + ' <small>/month</small>';
    document.getElementById('totalInterest').textContent = formatCurrency(Math.round(totalInterest));
    document.getElementById('totalAmount').textContent = formatCurrency(Math.round(totalAmount));

    // Update slider track colors
    updateSliderTrack(loanAmountSlider);
    updateSliderTrack(interestRateSlider);
    updateSliderTrack(tenureSlider);
  }

  function updateSliderTrack(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const percent = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #0D3526 0%, #0D3526 ${percent}%, #E5E7EB ${percent}%, #E5E7EB 100%)`;
  }

  // Attach listeners
  loanAmountSlider.addEventListener('input', calculateEMI);
  interestRateSlider.addEventListener('input', calculateEMI);
  tenureSlider.addEventListener('input', calculateEMI);

  // Initial calculation
  calculateEMI();
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  // Form is handled via the global handleFormSubmit function
}

// Global form submit handler (referenced in HTML)
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; display:inline;vertical-align:middle;">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
    Sending...
  `;
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Enquiry Sent!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #1A6B4C, #0D3526)';

    // Reset form after a moment
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
    }, 3000);
  }, 1500);
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation() {
  const stats = document.querySelectorAll('.hero-stat h3');

  function animateCounter(el) {
    const text = el.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(number * eased);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Trigger when hero stats come into view
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.forEach(stat => animateCounter(stat));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsContainer);
  }
}

/* ---------- Add spin keyframes dynamically ---------- */
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);

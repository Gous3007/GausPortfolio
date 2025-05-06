// Initialize AOS animation library
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-in-out',
  delay: 100,
  disable: window.innerWidth < 768 // Disable on very small screens for performance
});

// Typing animation
document.addEventListener('DOMContentLoaded', function () {
  // Fix any potential overflow issues
  document.body.style.overflowX = 'hidden';

  let typed = new Typed('.typed-text', {
    strings: ['Web Developer', 'Software Developer', 'UI/UX Designer', 'Freelancer', 'Problem Solver',],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });

  // Mobile optimization function
  function mobileOptimize() {
    if (window.innerWidth <= 991) {
      // Adjust font sizes for better readability on mobile
      document.querySelectorAll('.lead').forEach(function (p) {
        p.style.fontSize = '1.1rem';
      });

      // Make buttons more tappable
      document.querySelectorAll('.btn').forEach(function (btn) {
        btn.style.width = '100%';
        btn.style.marginBottom = '10px';
      });

      // Adjust image size
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        heroImage.style.maxWidth = '85%';
      }
    } else {
      // Reset styles for desktop
      document.querySelectorAll('.lead').forEach(function (p) {
        p.style.fontSize = '';
      });

      document.querySelectorAll('.btn').forEach(function (btn) {
        btn.style.width = '';
        btn.style.marginBottom = '';
      });

      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        heroImage.style.maxWidth = '90%';
      }
    }
  }

  // Run on page load and window resize
  mobileOptimize();
  window.addEventListener('resize', mobileOptimize);

  // Add preload for better image loading
  const profileImg = document.querySelector('.hero-image');
  if (profileImg) {
    profileImg.setAttribute('loading', 'eager');
  }
});


//   about us 

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS Animation
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out-quad',
      offset: 100,
    });
  }

  // Animate progress bars when they come into view
  const progressBars = document.querySelectorAll('.progress-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('aria-valuenow') + '%';
        progressBar.style.width = '0%';

        // Delay the animation slightly for staggered effect
        setTimeout(() => {
          progressBar.style.width = width;
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    observer.observe(bar);
  });

  // Add hover effect to skill cards
  const skillCards = document.querySelectorAll('.skill-category-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
.ripple-effect {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: ripple 1s linear;
  pointer-events: none;
}

@keyframes ripple {
  0% {
    width: 10px;
    height: 10px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

//   services script

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
    });
  }

  // Add ripple effect to service cards
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
});

// project section

// Toggle between grid and slider view
document.getElementById('grid-view-btn').addEventListener('click', function () {
  document.querySelector('.grid-view').classList.remove('d-none');
  document.querySelector('#projectsCarousel').classList.add('d-none');
  document.getElementById('grid-view-btn').classList.add('active');
  document.getElementById('slider-view-btn').classList.remove('active');
});

document.getElementById('slider-view-btn').addEventListener('click', function () {
  document.querySelector('.grid-view').classList.add('d-none');
  document.querySelector('#projectsCarousel').classList.remove('d-none');
  document.getElementById('slider-view-btn').classList.add('active');
  document.getElementById('grid-view-btn').classList.remove('active');
});

// Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// footer section

// Initialize AOS animation
AOS.init();

// Back to top button
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    $('#backToTop').fadeIn();
  } else {
    $('#backToTop').fadeOut();
  }
});

$('#backToTop').click(function () {
  $('html, body').animate({
    scrollTop: 0
  }, 800);
  return false;
});

// Add hover effect to quick links
$('.quick-links li').hover(
  function () {
    $(this).find('i').addClass('fa-beat');
  },
  function () {
    $(this).find('i').removeClass('fa-beat');
  }
);

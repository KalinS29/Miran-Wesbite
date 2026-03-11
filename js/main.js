// Include the language system
// Make sure to add: <script src="js/lang.js"></script> BEFORE main.js in your HTML

/* ===============================
   LANGUAGE SUPPORT
================================ */
// Language strings are now in lang.js
// This section handles any JS-specific translations

function updatePlaceholders(lang) {
  const placeholders = {
    en: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      message: "Your Requirements"
    },
    bg: {
      firstName: "Име",
      lastName: "Фамилия",
      email: "Имейл Адрес",
      message: "Вашите Изисквания"
    },
    tr: {
      firstName: "Ad",
      lastName: "Soyad",
      email: "E-posta Adresi",
      message: "Gereksinimleriniz"
    },
    de: {
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail-Adresse",
      message: "Ihre Anforderungen"
    }
  };
  
  // Update placeholder attributes
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  
  if (firstName) firstName.placeholder = placeholders[lang]?.firstName || "";
  if (lastName) lastName.placeholder = placeholders[lang]?.lastName || "";
  if (email) email.placeholder = placeholders[lang]?.email || "";
  if (message) message.placeholder = placeholders[lang]?.message || "";
}

// Listen for language changes
window.addEventListener('languageChanged', (e) => {
  updatePlaceholders(e.detail.lang);
});

/* ===============================
   EXISTING CODE BELOW...
================================ */

/* ===============================
   CONFIG
================================ */
const HEADER_OFFSET = 80;

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {
  
  /* ===============================
     HEADER SCROLL EFFECT
  ================================ */
  const header = document.getElementById("header");
  
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ===============================
     MOBILE MENU
  ================================ */
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("menuOverlay");
  
  function openMenu() {
    sideMenu.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  
  function closeMenu() {
    sideMenu.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }
  
  if (menuBtn && closeBtn && sideMenu && overlay) {
    menuBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    
    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sideMenu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  /* ===============================
     SMOOTH SCROLL
  ================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (sideMenu && sideMenu.classList.contains("open")) {
          closeMenu();
        }
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /* ===============================
     SCROLL REVEAL ANIMATIONS
  ================================ */
  const revealElements = document.querySelectorAll(".reveal");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  /* ===============================
     PARALLAX EFFECT (Hero)
  ================================ */
  const heroBg = document.querySelector(".hero-bg img");
  
  if (heroBg && !window.matchMedia("(pointer: coarse)").matches) {
    let ticking = false;
    
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * 0.4;
          heroBg.style.transform = `scale(1.05) translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ===============================
     ACTIVE NAV LINK
  ================================ */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  document.querySelectorAll(".desktop-nav a, .menu-links a").forEach(link => {
    const linkPage = link.getAttribute("href").split("#")[0];
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

/* ===============================
   PAGE FADE TRANSITION
================================ */
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.3s ease";
});

/* ===============================
   CATALOG FILTERING
================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const livestockCards = document.querySelectorAll('.livestock-card');

if (filterBtns.length > 0 && livestockCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filter cards with animation
      livestockCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });
}

/* ===============================
   INQUIRE BUTTONS (Auto-fill form)
================================ */
document.querySelectorAll('.inquire-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const animal = btn.dataset.animal;
    // Store in sessionStorage and redirect to contact
    sessionStorage.setItem('inquiryAnimal', animal);
    window.location.href = 'index.html#contact';
  });
});

// Check for stored inquiry on page load
if (window.location.hash === '#contact' && sessionStorage.getItem('inquiryAnimal')) {
  const animal = sessionStorage.getItem('inquiryAnimal');
  const messageField = document.getElementById('message');
  if (messageField) {
    messageField.value = `I'm interested in ${animal}. Please provide more information about availability and pricing.`;
    // Trigger focus to show the user
    setTimeout(() => messageField.focus(), 500);
  }
  sessionStorage.removeItem('inquiryAnimal');
}

/* ===============================
   NUMBER COUNTER ANIMATION
================================ */
const counters = document.querySelectorAll('.stat-number[data-target]');

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            entry.target.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString() + '+';
          }
        };
        
        updateCounter();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ===============================
   VIDEO PLAYER
================================ */
const playBtn = document.getElementById('playBtn');
const video = document.getElementById('facilityVideo');

if (playBtn && video) {
  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playBtn.style.opacity = '0';
      playBtn.style.pointerEvents = 'none';
    }
  });
  
  video.addEventListener('click', () => {
    if (!video.paused) {
      video.pause();
      playBtn.style.opacity = '1';
      playBtn.style.pointerEvents = 'auto';
    }
  });
}
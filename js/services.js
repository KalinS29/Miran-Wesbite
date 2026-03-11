/* ================= SERVICES PAGE SPECIFIC JS ================= */

document.addEventListener('DOMContentLoaded', function() {
  
  // Service detail animations on scroll
  const serviceBlocks = document.querySelectorAll('.service-detail-block');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  serviceBlocks.forEach(block => {
    block.classList.add('reveal');
    observer.observe(block);
  });
  
});
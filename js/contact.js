/* ================= CONTACT PAGE JS ================= */

document.addEventListener('DOMContentLoaded', function() {
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Check for inquiry from offers page
  const urlParams = new URLSearchParams(window.location.search);
  const inquiryAnimal = urlParams.get('inquiry');
  
  if (inquiryAnimal) {
    const messageField = document.getElementById('message');
    if (messageField) {
      messageField.value = `I'm interested in ${inquiryAnimal}. Please provide more information about availability and pricing.`;
    }
  }
});
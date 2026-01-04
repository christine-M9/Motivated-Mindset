document.addEventListener('DOMContentLoaded', () => {
  // ===== Hero Image Slideshow =====
  const heroImages = [
    './images/mmds1.jpeg',
    './images/mmds19.jpeg',
    './images/mmds5.jpeg',
    './images/mmds20.jpeg',
    './images/mmds13.jpeg',
    './images/mmds4.jpeg'
  ];

  let currentHeroIndex = 0;
  const heroImgElement = document.querySelector('.hero-img');
  if(heroImgElement) {
    heroImgElement.src = heroImages[currentHeroIndex];
    heroImgElement.style.transition = 'opacity 0.3s ease-in-out';

    const changeHeroImage = () => {
      const nextIndex = (currentHeroIndex + 1) % heroImages.length;
      heroImgElement.style.opacity = 0;

      setTimeout(() => {
        heroImgElement.src = heroImages[nextIndex];
        heroImgElement.style.opacity = 1;
        currentHeroIndex = nextIndex;
      }, 300); // matches CSS transition duration
    };

    setInterval(changeHeroImage, 4000);
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        target.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // ===== Fade-in Sections on Scroll =====
  const fadeSections = document.querySelectorAll(
    '.section, .vision-mission > div, .focus-card, .impact-card, .achievement-card, .story-text, .about-text, .about-image'
  );

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'all 0.8s ease-out';
      }
    });
  }, {threshold: 0.1});

  fadeSections.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    fadeObserver.observe(el);
  });

  // ===== Impact Counters Animation =====
  const counters = document.querySelectorAll('.impact-card h3');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count') || +counter.innerText.replace(/\D/g,'');
    let current = 0;
    const increment = target / 200; // speed

    const interval = setInterval(() => {
      current += increment;
      if(current >= target){
        counter.innerText = target.toLocaleString();
        clearInterval(interval);
      } else {
        counter.innerText = Math.floor(current).toLocaleString();
      }
    }, 10);
  };

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.6});

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

});
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});
const playButton = document.getElementById('playButton');
const video = document.getElementById('mindsetVideo');

if (playButton && video) {
  playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    video.setAttribute('controls', 'controls');
    video.play();
  });
}

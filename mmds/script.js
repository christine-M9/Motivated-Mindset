// Smooth Scroll
document.querySelectorAll('nav a').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('.section, .vision-mission > div, .focus-card, .impact-card');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.8s ease-out';
    }
  });
},{threshold:0.1});
sections.forEach(el=>{
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  observer.observe(el);
});

// Impact counters animation
const counters = document.querySelectorAll('.impact-card h3');

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-count');
  let current = 0;
  const increment = target / 200; // adjust speed
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

// Animate when the counter scrolls into view
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

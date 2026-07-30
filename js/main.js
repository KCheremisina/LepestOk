document.addEventListener('DOMContentLoaded', function() {
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const startX = Math.random() * 100;
        petal.style.left = startX + 'vw';
        
        const colors = ['#FF6B9D', '#9B59B6', '#5DADE2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const size = Math.random() * 20 + 15;
        petal.style.width = size + 'px';
        petal.style.height = (size * 0.6) + 'px';
        petal.style.background = `radial-gradient(ellipse at 50% 30%, ${color} 0%, ${color} 50%, transparent 70%)`;
        petal.style.borderRadius = '50% 50% 50% 0';
        petal.style.opacity = '0.35';
        petal.style.filter = `blur(${Math.random() * 1.5 + 0.5}px)`;
        
        const startRotation = Math.random() * 360;
        petal.style.transform = `rotate(${startRotation}deg)`;
        
        const fallDuration = Math.random() * 10 + 18;
        const driftAmplitude = 5 + Math.random() * 8;
        const rotationSpeed = (Math.random() - 0.5) * 360;
        
        document.getElementById('petals').appendChild(petal);
        
        const startY = -10 - Math.random() * 30;
        petal.style.top = startY + 'vh';
        
        let startTime = null;
        const startXPos = startX;
        let currentRotation = startRotation;
        
        function animatePetal(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (fallDuration * 1000);
            
            if (progress >= 1) {
                petal.style.transition = 'opacity 4s ease-out';
                petal.style.opacity = '0';
                setTimeout(() => {
                    petal.remove();
                }, 4000);
                return;
            }
            
            const xOffset = Math.sin(progress * Math.PI * 3) * driftAmplitude * (0.7 + 0.3 * Math.sin(progress * 0.5));
            const yPos = startY + progress * 130;
            const xPos = startXPos + xOffset + Math.sin(progress * 2) * 3;
            
            currentRotation += rotationSpeed * 0.0008;
            const scale = 0.85 + 0.15 * Math.sin(progress * 1.5);
            
            petal.style.top = yPos + 'vh';
            petal.style.left = xPos + 'vw';
            petal.style.transform = `rotate(${currentRotation}deg) scale(${scale})`;
            
            const opacityFactor = 0.35 + 0.15 * Math.sin(progress * Math.PI * 1.5);
            petal.style.opacity = Math.min(0.5, opacityFactor);
            
            requestAnimationFrame(animatePetal);
        }
        
        requestAnimationFrame(animatePetal);
    }

    setInterval(createPetal, 900);

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время!');
            this.reset();
        });
    }
});
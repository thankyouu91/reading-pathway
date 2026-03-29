// ===== 3D EFFECTS - Reading Pathway =====
// CSS 3D transforms + mouse interactions

(function() {
    'use strict';

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // Skip 3D on mobile

    // ===== 3D TILT ON MOUSE MOVE =====
    const tiltCards = document.querySelectorAll('.program-card, .pillar-card, .why-card, .b2b-card, .feature-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ===== HERO PARALLAX DEPTH =====
    const heroSection = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroBadge = document.querySelector('.hero-badge');
    const heroStats = document.querySelectorAll('.hero-stats .stat');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (heroText) {
                heroText.style.transform = `translateZ(40px) translateX(${x * -10}px) translateY(${y * -8}px)`;
            }
            if (heroBadge) {
                heroBadge.style.transform = `translateZ(60px) translateX(${x * -15}px) translateY(${y * -12}px)`;
            }
            heroStats.forEach((stat, i) => {
                const depth = (i + 1) * 3;
                stat.style.transform = `translateZ(30px) translateX(${x * -depth}px) translateY(${y * -depth}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            if (heroText) heroText.style.transform = '';
            if (heroBadge) heroBadge.style.transform = '';
            heroStats.forEach(s => { s.style.transform = ''; });
        });
    }

    // ===== 3D SCROLL DEPTH =====
    const sections3D = document.querySelectorAll('.section');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ratio = entry.intersectionRatio;
                const el = entry.target;
                const rotateX = (1 - ratio) * 3;
                el.style.transform = `perspective(1200px) rotateX(${rotateX}deg)`;
                el.style.opacity = 0.5 + ratio * 0.5;
            }
        });
    }, {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20)
    });

    sections3D.forEach(s => scrollObserver.observe(s));

    // ===== 3D DEPTH SHADOW ON SCROLL =====
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const shapes = document.querySelectorAll('.shape');
                shapes.forEach((shape, i) => {
                    const depth = (i + 1) * 0.05;
                    shape.style.transform = `translateZ(${-50 - i * 30}px) translateY(${scrollY * depth}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ===== IELTS SCORE 3D HOVER =====
    document.querySelectorAll('.ielts-stage').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4;
            card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

})();

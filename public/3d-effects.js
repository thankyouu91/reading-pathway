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
                heroText.style.transform = `translateX(${x * -8}px) translateY(${y * -6}px)`;
            }
            if (heroBadge) {
                heroBadge.style.transform = `translateX(${x * -12}px) translateY(${y * -10}px)`;
            }
            heroStats.forEach((stat, i) => {
                const depth = (i + 1) * 2;
                stat.style.transform = `translateX(${x * -depth}px) translateY(${y * -depth}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            if (heroText) heroText.style.transform = '';
            if (heroBadge) heroBadge.style.transform = '';
            heroStats.forEach(s => { s.style.transform = ''; });
        });
    }

    // ===== 3D SCROLL DEPTH (subtle, no overlap) =====

    // ===== PARALLAX ON SCROLL (no translateZ) =====
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const shapes = document.querySelectorAll('.shape');
                shapes.forEach((shape, i) => {
                    const speed = (i + 1) * 0.03;
                    shape.style.transform = `translateY(${scrollY * speed}px)`;
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

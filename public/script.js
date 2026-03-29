// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 1200);
        setTimeout(() => loader.remove(), 2000);
    }
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    navbar.classList.toggle('scrolled', currentScrollY > 50);

    // Auto-hide navbar on scroll down, show on scroll up
    if (currentScrollY > 300) {
        if (currentScrollY > lastScrollY + 10) {
            navbar.style.transform = 'translateY(-100%)';
        } else if (currentScrollY < lastScrollY - 10) {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== SCROLL MOTION SYSTEM =====
// Inject all animation keyframes and classes
const motionStyles = document.createElement('style');
motionStyles.textContent = `
    /* Base hidden state */
    [data-motion] {
        opacity: 0;
        will-change: transform, opacity;
    }

    /* Fade Up */
    [data-motion="fade-up"] {
        transform: translateY(50px);
    }
    [data-motion="fade-up"].in-view {
        opacity: 1;
        transform: translateY(0);
    }

    /* Fade Down */
    [data-motion="fade-down"] {
        transform: translateY(-40px);
    }
    [data-motion="fade-down"].in-view {
        opacity: 1;
        transform: translateY(0);
    }

    /* Fade Left */
    [data-motion="fade-left"] {
        transform: translateX(-60px);
    }
    [data-motion="fade-left"].in-view {
        opacity: 1;
        transform: translateX(0);
    }

    /* Fade Right */
    [data-motion="fade-right"] {
        transform: translateX(60px);
    }
    [data-motion="fade-right"].in-view {
        opacity: 1;
        transform: translateX(0);
    }

    /* Scale Up */
    [data-motion="scale-up"] {
        transform: scale(0.85);
    }
    [data-motion="scale-up"].in-view {
        opacity: 1;
        transform: scale(1);
    }

    /* Zoom In Rotate */
    [data-motion="zoom-rotate"] {
        transform: scale(0.8) rotate(-3deg);
    }
    [data-motion="zoom-rotate"].in-view {
        opacity: 1;
        transform: scale(1) rotate(0);
    }

    /* Flip Up */
    [data-motion="flip-up"] {
        transform: perspective(600px) rotateX(15deg) translateY(30px);
    }
    [data-motion="flip-up"].in-view {
        opacity: 1;
        transform: perspective(600px) rotateX(0) translateY(0);
    }

    /* Blur In */
    [data-motion="blur-in"] {
        transform: translateY(20px);
        filter: blur(8px);
    }
    [data-motion="blur-in"].in-view {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }

    /* Slide Up Bounce */
    [data-motion="bounce-up"] {
        transform: translateY(60px);
    }
    [data-motion="bounce-up"].in-view {
        opacity: 1;
        animation: bounceUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes bounceUp {
        0%   { opacity: 0; transform: translateY(60px); }
        60%  { opacity: 1; transform: translateY(-8px); }
        80%  { transform: translateY(4px); }
        100% { opacity: 1; transform: translateY(0); }
    }

    /* Stagger children */
    [data-motion-stagger] > * {
        opacity: 0;
        transform: translateY(30px);
    }
    [data-motion-stagger].in-view > * {
        opacity: 1;
        transform: translateY(0);
    }

    /* Counter animation */
    .counter-animated {
        display: inline-block;
    }

    /* Parallax subtle */
    .parallax-element {
        transition: transform 0.1s linear;
    }

`;
document.head.appendChild(motionStyles);

// ===== APPLY MOTION ATTRIBUTES =====
function applyMotionAttributes() {
    // Section headers - blur in
    document.querySelectorAll('.section-header').forEach(el => {
        el.setAttribute('data-motion', 'blur-in');
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Program cards - slide from sides
    document.querySelectorAll('.trophy-card').forEach(el => {
        el.setAttribute('data-motion', 'fade-left');
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    document.querySelectorAll('.achieve-card').forEach(el => {
        el.setAttribute('data-motion', 'fade-right');
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Activity cards - stagger fade up
    document.querySelectorAll('.activity-card').forEach((el, i) => {
        el.setAttribute('data-motion', 'fade-up');
        el.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        el.style.transitionDelay = `${i * 0.08}s`;
    });

    // Level groups - flip up
    document.querySelectorAll('.level-group').forEach((el, i) => {
        el.setAttribute('data-motion', 'flip-up');
        el.style.transition = `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        el.style.transitionDelay = `${i * 0.15}s`;
    });

    // Pathway stages - alternate left/right
    document.querySelectorAll('.pathway-stage').forEach((el, i) => {
        el.setAttribute('data-motion', i % 2 === 0 ? 'fade-left' : 'fade-right');
        el.style.transition = `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Bridge - scale up
    document.querySelectorAll('.pathway-bridge').forEach(el => {
        el.setAttribute('data-motion', 'scale-up');
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Achieve cards - stagger fade up
    document.querySelectorAll('.achieve-card:not(.program-card)').forEach((el, i) => {
        if (!el.classList.contains('program-card')) {
            el.setAttribute('data-motion', 'fade-up');
            el.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
            el.style.transitionDelay = `${i * 0.1}s`;
        }
    });

    // Achieve feature main - zoom rotate
    document.querySelectorAll('.achieve-feature-main').forEach(el => {
        el.setAttribute('data-motion', 'zoom-rotate');
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // IELTS stages - bounce up
    document.querySelectorAll('.ielts-stage').forEach((el, i) => {
        el.setAttribute('data-motion', 'bounce-up');
        el.style.transitionDelay = `${i * 0.12}s`;
    });

    // B2B cards - stagger scale up
    document.querySelectorAll('.b2b-card').forEach((el, i) => {
        el.setAttribute('data-motion', 'scale-up');
        el.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        el.style.transitionDelay = `${i * 0.1}s`;
    });

    // Testing framework - fade up
    document.querySelectorAll('.testing-framework').forEach(el => {
        el.setAttribute('data-motion', 'fade-up');
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Test steps - stagger
    document.querySelectorAll('.test-step').forEach((el, i) => {
        el.setAttribute('data-motion', 'fade-up');
        el.style.transition = `all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        el.style.transitionDelay = `${i * 0.15}s`;
    });

    // Comparison table - flip up
    document.querySelectorAll('.comparison-table-wrapper').forEach(el => {
        el.setAttribute('data-motion', 'flip-up');
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // CTA content - fade up
    document.querySelectorAll('.cta-text').forEach(el => {
        el.setAttribute('data-motion', 'fade-left');
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    document.querySelectorAll('.cta-form').forEach(el => {
        el.setAttribute('data-motion', 'fade-right');
        el.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // B2B CTA - scale up
    document.querySelectorAll('.b2b-cta').forEach(el => {
        el.setAttribute('data-motion', 'scale-up');
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Floating cards in hero - already animated via CSS keyframes
}

// ===== INTERSECTION OBSERVER FOR MOTION =====
const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            motionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

// Apply attributes then observe
applyMotionAttributes();
document.querySelectorAll('[data-motion]').forEach(el => {
    motionObserver.observe(el);
});

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(el, target, suffix = '') {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * eased);
        el.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent.trim();
            const match = text.match(/^(\d+)(\+?)$/);
            if (match) {
                const num = parseInt(match[1]);
                const suffix = match[2] || '';
                animateCounter(el, num, suffix);
            }
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    statObserver.observe(el);
});

// ===== LEXILE METER ANIMATION =====
const lexileMeter = document.getElementById('lexileMeter');
if (lexileMeter) {
    const meterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lexileMeter.style.width = '75%';
                meterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    meterObserver.observe(lexileMeter);
}


// ===== PARALLAX FOR HERO SHAPES =====
const heroShapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
        heroShapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.03;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
}, { passive: true });

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            parentName: document.getElementById('parentName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            childAge: document.getElementById('childAge').value,
            goal: document.getElementById('goal').value
        };

        const btn = this.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Đang gửi...';

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                // Show Lottie success overlay
                const formEl = this.closest('.cta-form');
                const overlay = document.createElement('div');
                overlay.className = 'form-success-overlay';
                overlay.innerHTML = `
                    <div class="success-checkmark"><svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="none" stroke="#10B981" stroke-width="3" class="circle-anim"/><path d="M24 42l10 10 22-24" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="check-anim"/></svg></div>
                    <p class="form-success-text">Đăng ký thành công!</p>
                `;
                formEl.style.position = 'relative';
                formEl.appendChild(overlay);

                this.reset();
                setTimeout(() => {
                    overlay.remove();
                    btn.disabled = false;
                    btn.textContent = 'Đăng Ký Tư Vấn Miễn Phí';
                }, 3500);
            }
        } catch (err) {
            btn.textContent = 'Đăng Ký Tư Vấn Miễn Phí';
            btn.disabled = false;
            console.error(err);
        }
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const allSections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a:not(.btn-nav)');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinksAll.forEach(link => {
                link.classList.remove('nav-active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('nav-active');
                }
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-80px 0px -50% 0px'
});

allSections.forEach(section => sectionObserver.observe(section));

// ===== TILT EFFECT ON HOVER (program cards) =====
document.querySelectorAll('.program-card, .b2b-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

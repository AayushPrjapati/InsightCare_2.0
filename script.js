// Tailwind Configuration setup for CDN
window.tailwind.config = {
    theme: {
        extend: {
            fontFamily: { 
                sans: ['Poppins', 'sans-serif'],
                serif: ['Playfair Display', 'serif']
            },
            colors: {
                brand: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 600: '#059669', 900: '#064e3b' }
            }
        }
    }
};

// Application Logic
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Navbar Scrolling Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));
    
    // 4. Hero Orb Canvas Animation
    initHeroOrb();
});

// Particle Orb Animation Logic
function initHeroOrb() {
    const canvas = document.getElementById('hero-orb');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        const parent = canvas.parentElement;
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const numParticles = 1800; // Dense golden dust effect
    for(let i=0; i<numParticles; i++) {
        // Distribute points on a sphere
        const r = 100 + Math.random() * 120;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(Math.random() * 2 - 1);
        particles.push({
            r: r,
            theta: theta,
            phi: phi,
            speedTheta: (Math.random() * 0.005 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
            size: Math.random() * 1.5 + 0.2,
            colorBase: Math.random() > 0.4 ? '212, 175, 55' : '250, 240, 200' // Gold and pale yellow
        });
    }

    let time = 0;
    
    function animate() {
        // subtle trail effect for glowing trails
        ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
        ctx.fillRect(0, 0, width, height);
        
        time += 0.01;
        
        const cx = width / 2;
        const cy = height / 2;
        
        const globalRotationX = Math.sin(time * 0.3) * 0.3;
        const globalRotationY = time * 0.15;

        particles.forEach(p => {
            p.theta += p.speedTheta;
            
            // Spherical to Cartesian
            const x = p.r * Math.sin(p.phi) * Math.cos(p.theta);
            const y = p.r * Math.cos(p.phi);
            const z = p.r * Math.sin(p.phi) * Math.sin(p.theta);
            
            // Rotate Y
            const x1 = x * Math.cos(globalRotationY) - z * Math.sin(globalRotationY);
            const z1 = x * Math.sin(globalRotationY) + z * Math.cos(globalRotationY);
            // Rotate X
            const y2 = y * Math.cos(globalRotationX) - z1 * Math.sin(globalRotationX);
            const z2 = y * Math.sin(globalRotationX) + z1 * Math.cos(globalRotationX);
            
            // Project
            const perspective = 400;
            const scale = perspective / (perspective + z2);
            
            if(scale > 0 && z2 > -perspective) {
                const x2d = cx + x1 * scale;
                const y2d = cy + y2 * scale;
                
                ctx.beginPath();
                ctx.arc(x2d, y2d, p.size * scale, 0, 2*Math.PI);
                
                // Opacity fades out for particles far back
                let alpha = 1;
                if(z2 < 0) {
                    alpha = Math.max(0.1, 1 - Math.abs(z2)/perspective);
                }
                
                ctx.fillStyle = `rgba(${p.colorBase}, ${alpha * 0.8})`;
                ctx.fill();
            }
        });

        // Add soft central glow
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
        gradient.addColorStop(0.5, 'rgba(212, 175, 55, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(animate);
    }
    animate();
}

(() => {
    'use strict';

    const preloader = document.getElementById('preloader');
    const canvas = document.getElementById('sequenceCanvas');
    const sequenceStage = document.getElementById('sequenceStage');
    const revealItems = document.querySelectorAll('[data-reveal]');
    const labels = document.querySelectorAll('.seq-label');
    const stepDots = document.querySelectorAll('.seq-dot');
    const contactForm = document.getElementById('contactForm');
    const contactNote = document.getElementById('contactNote');

    function hidePreloader() {
        if (!preloader || preloader.classList.contains('preloader--hidden')) return;
        preloader.classList.add('preloader--hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 900);
    }

    window.addEventListener('load', hidePreloader);

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        hidePreloader();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ── Lenis Smooth Scroll ── */
    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        gestureOrientation: 'vertical',
        touchMultiplier: 1.4,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* ── Smooth Anchor Scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = link.getAttribute('href');
            if (!target || target === '#') return;
            const element = document.querySelector(target);
            if (!element) return;
            event.preventDefault();
            lenis.scrollTo(element, { offset: -70 });
        });
    });

    /* ── Scroll Reveal ── */
    revealItems.forEach((item) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 86%',
                once: true,
            },
        });
    });

    /* ── Contact Form ── */
    if (contactForm && contactNote) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactNote.textContent = '✓ Thank you! We will get back to you shortly.';
            contactForm.reset();
            setTimeout(() => { contactNote.textContent = ''; }, 5000);
        });
    }

    /* ── Hero Text Stagger ── */
    const heroLines = document.querySelectorAll('.hero__line');
    if (heroLines.length) {
        gsap.from(heroLines, {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.3,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top 80%',
                once: true,
            },
        });
    }

    /* ── Hero Badge Entrance ── */
    const heroBadge = document.querySelector('.hero__badge');
    if (heroBadge) {
        gsap.from(heroBadge, {
            opacity: 0,
            x: -20,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top 80%',
                once: true,
            },
        });
    }

    /* ── Hero Lead Entrance ── */
    const heroLead = document.querySelector('.hero__lead');
    if (heroLead) {
        gsap.from(heroLead, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top 80%',
                once: true,
            },
        });
    }

    /* ── Hero Bottle Entrance ── */
    const heroBottle = document.querySelector('.hero__bottle');
    if (heroBottle) {
        gsap.from(heroBottle, {
            opacity: 0,
            scale: 0.85,
            y: 60,
            duration: 1.4,
            ease: 'power4.out',
            delay: 0.4,
            scrollTrigger: {
                trigger: '.hero__visual',
                start: 'top 82%',
                once: true,
            },
        });

        gsap.to(heroBottle, {
            yPercent: -4,
            rotation: -1.5,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
            },
        });
    }

    /* ── Hero Notes Entry ── */
    document.querySelectorAll('.hero__note').forEach((note, i) => {
        gsap.from(note, {
            opacity: 0,
            y: 20,
            x: i === 0 ? -20 : (i === 1 ? 20 : 0),
            duration: 0.9,
            delay: 0.6 + i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: note.closest('.hero__visual'),
                start: 'top 82%',
                once: true,
            },
        });
    });

    /* ── Hero Actions Stagger ── */
    const heroActions = document.querySelectorAll('.hero__actions .button');
    if (heroActions.length) {
        gsap.from(heroActions, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            stagger: 0.15,
            delay: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top 75%',
                once: true,
            },
        });
    }

    /* ── Hero Facts Stagger ── */
    const heroFacts = document.querySelectorAll('.hero__facts span');
    if (heroFacts.length) {
        gsap.from(heroFacts, {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.08,
            delay: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top 75%',
                once: true,
            },
        });
    }

    /* ── Trust Card Stagger ── */
    gsap.utils.toArray('.trust__card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card.closest('.trust'),
                start: 'top 84%',
                once: true,
            },
        });
    });

    /* ── Section Heading Stagger (h2) ── */
    document.querySelectorAll('.section-heading').forEach((heading) => {
        const h2 = heading.querySelector('h2');
        const p = heading.querySelector('p');
        if (h2) {
            gsap.from(h2, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true,
                },
            });
        }
        if (p) {
            gsap.from(p, {
                opacity: 0,
                y: 15,
                duration: 0.6,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true,
                },
            });
        }
    });

    /* ── Craft Cards Stagger ── */
    gsap.utils.toArray('.craft__card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card.closest('.craft'),
                start: 'top 75%',
                once: true,
            },
        });
    });

    /* ── Gallery Stagger ── */
    gsap.utils.toArray('.gallery__card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card.closest('.gallery'),
                start: 'top 80%',
                once: true,
            },
        });
    });

    /* ── Spec Items Stagger ── */
    gsap.utils.toArray('.specs__item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: 30,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item.closest('.specs'),
                start: 'top 80%',
                once: true,
            },
        });
    });

    /* ── Spec Visual Parallax ── */
    const specVisual = document.querySelector('.specs__visual img');
    if (specVisual) {
        gsap.to(specVisual, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
                trigger: '.specs',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }

    /* ── Canvas Sequence ── */
    if (!canvas || !sequenceStage) return;

    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 192;
    const cache = [];
    const state = { frame: 0 };

    function framePath(index) {
        return `assets/images/frames_cropped/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
    }

    function resizeCanvas() {
        const parent = canvas.parentElement;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = parent.clientWidth;
        const h = parent.clientHeight;
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        drawFrame(Math.round(state.frame));
    }

    function drawFrame(index) {
        const img = cache[index];
        if (!img || !img.complete || !img.naturalWidth) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        const ir = img.naturalWidth / img.naturalHeight;
        const cr = w / h;
        let dw, dh;
        if (ir > cr) { dh = h; dw = dh * ir; }
        else { dw = w; dh = dw / ir; }
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    }

    function activateLabel(progress) {
        const step = Math.min(labels.length - 1, Math.floor(progress * labels.length));
        labels.forEach((l, i) => l.classList.toggle('seq-label--active', i === step));
        stepDots.forEach((d, i) => d.classList.toggle('seq-dot--active', i === step));
    }

    function loadImages() {
        return new Promise((resolve) => {
            let loaded = 0;
            let rendered = false;
            for (let i = 0; i < TOTAL_FRAMES; i += 1) {
                const img = new Image();
                img.src = framePath(i);
                cache[i] = img;
                img.onload = () => {
                    loaded += 1;
                    if (!rendered) { rendered = true; resizeCanvas(); }
                    if (loaded === TOTAL_FRAMES) resolve();
                };
                img.onerror = () => {
                    loaded += 1;
                    if (loaded === TOTAL_FRAMES) resolve();
                };
            }
        });
    }

    loadImages().then(() => {
        hidePreloader();
        resizeCanvas();

        const isDesktop = window.matchMedia('(min-width: 1081px)').matches;
        const cfg = isDesktop
            ? { trigger: sequenceStage, start: 'top top', end: 'bottom bottom', scrub: 0.5 }
            : { trigger: sequenceStage, start: 'top 70%', end: 'bottom 30%', scrub: 0.5 };

        gsap.to(state, {
            frame: TOTAL_FRAMES - 1,
            ease: 'none',
            snap: { frame: 1 },
            onUpdate: () => { drawFrame(Math.round(state.frame)); },
            scrollTrigger: {
                ...cfg,
                onUpdate: (self) => { activateLabel(self.progress); },
            },
        });

        /* ── Click step dots to navigate ── */
        stepDots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const step = parseInt(dot.dataset.step, 10);
                if (isNaN(step)) return;
                const scrollHeight = sequenceStage.scrollHeight - window.innerHeight;
                const targetScroll = sequenceStage.offsetTop + (scrollHeight * (step / (stepDots.length - 1)));
                lenis.scrollTo(targetScroll, { duration: 1.4 });
            });
        });

        if (isDesktop) {
            ScrollTrigger.create({
                trigger: sequenceStage,
                start: 'top top',
                end: 'bottom bottom',
                pin: '.sequence__sticky',
                anticipatePin: 1,
            });
        }

        ScrollTrigger.refresh();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { resizeCanvas(); ScrollTrigger.refresh(); }, 120);
    });
})();

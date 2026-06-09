(() => {
    const canvas = document.getElementById('sequenceCanvas');
    const sequenceStage = document.getElementById('sequenceStage');
    const revealItems = document.querySelectorAll('[data-reveal]');
    const copyBlocks = document.querySelectorAll('.sequence-copy');
    const counters = document.querySelectorAll('[data-count]');
    const contactForm = document.getElementById('contactForm');
    const contactNote = document.getElementById('contactNote');

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        gestureOrientation: 'vertical',
        touchMultiplier: 1.4,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = link.getAttribute('href');
            if (!target || target === '#') {
                return;
            }

            const element = document.querySelector(target);
            if (!element) {
                return;
            }

            event.preventDefault();
            lenis.scrollTo(element, { offset: -70 });
        });
    });

    revealItems.forEach((item) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                once: true,
            },
        });
    });

    counters.forEach((counter) => {
        const targetValue = Number(counter.dataset.count || 0);
        const proxy = { value: 0 };

        gsap.to(proxy, {
            value: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { value: 1 },
            onUpdate: () => {
                counter.textContent = Math.round(proxy.value);
            },
            scrollTrigger: {
                trigger: counter,
                start: 'top 88%',
                once: true,
            },
        });
    });

    if (contactForm && contactNote) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            contactNote.textContent = 'Request captured. We will get back to you with Aquavista product details soon.';
        });
    }

    const heroBottle = document.querySelector('.hero__bottle');
    if (heroBottle) {
        gsap.to(heroBottle, {
            yPercent: -5,
            rotation: -4,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
            },
        });
    }

    if (!canvas || !sequenceStage) {
        return;
    }

    const context = canvas.getContext('2d');
    const totalFrames = 192;
    const imageCache = [];
    const sequenceState = {
        frame: 0,
    };

    function framePath(index) {
        return `assets/images/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
    }

    function setCanvasSize() {
        const frame = canvas.parentElement;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = frame.clientWidth;
        const height = frame.clientHeight;

        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);
        drawFrame(Math.round(sequenceState.frame));
    }

    function drawFrame(index) {
        const image = imageCache[index];
        if (!image || !image.complete || !image.naturalWidth) {
            return;
        }

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        context.clearRect(0, 0, width, height);

        const imageRatio = image.naturalWidth / image.naturalHeight;
        const canvasRatio = width / height;
        let drawWidth;
        let drawHeight;

        if (imageRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = drawHeight * imageRatio;
        } else {
            drawWidth = width;
            drawHeight = drawWidth / imageRatio;
        }

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        context.drawImage(image, x, y, drawWidth, drawHeight);
    }

    function activateCopy(progress) {
        const step = Math.min(copyBlocks.length - 1, Math.floor(progress * copyBlocks.length));
        copyBlocks.forEach((block, index) => {
            block.classList.toggle('sequence-copy--active', index === step);
        });
    }

    function loadImages() {
        return new Promise((resolve) => {
            let loaded = 0;
            let firstRendered = false;

            for (let i = 0; i < totalFrames; i += 1) {
                const image = new Image();
                image.src = framePath(i);
                imageCache[i] = image;

                image.onload = () => {
                    loaded += 1;

                    if (!firstRendered) {
                        firstRendered = true;
                        setCanvasSize();
                    }

                    if (loaded === totalFrames) {
                        resolve();
                    }
                };

                image.onerror = () => {
                    loaded += 1;
                    if (loaded === totalFrames) {
                        resolve();
                    }
                };
            }
        });
    }

    loadImages().then(() => {
        setCanvasSize();

        const isDesktop = window.matchMedia('(min-width: 1081px)').matches;
        const triggerConfig = isDesktop
            ? {
                  trigger: sequenceStage,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: 0.5,
              }
            : {
                  trigger: sequenceStage,
                  start: 'top 70%',
                  end: 'bottom 30%',
                  scrub: 0.5,
              };

        gsap.to(sequenceState, {
            frame: totalFrames - 1,
            ease: 'none',
            snap: { frame: 1 },
            onUpdate: () => {
                drawFrame(Math.round(sequenceState.frame));
            },
            scrollTrigger: {
                ...triggerConfig,
                onUpdate: (self) => {
                    activateCopy(self.progress);
                },
            },
        });

        if (isDesktop) {
            ScrollTrigger.create({
                trigger: sequenceStage,
                start: 'top top',
                end: 'bottom bottom',
                pin: '.sequence-stage__sticky',
                anticipatePin: 1,
            });
        }

        ScrollTrigger.refresh();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setCanvasSize();
            ScrollTrigger.refresh();
        }, 120);
    });
})();

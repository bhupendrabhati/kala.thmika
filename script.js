/* =========================================
   KALATHMIKA ARCHITECTURAL STUDIO - Portfolio - Vanilla JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOADER
    // ==========================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // ==========================================
    // 2. CUSTOM CURSOR GLOW
    // ==========================================
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        if (cursorGlow) {
            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // ==========================================
    // 3. SCROLL PROGRESS INDICATOR
    // (updated by the horizontal slide navigator below)
    // ==========================================
    const scrollProgress = document.getElementById('scrollProgress');

    // ==========================================
    // 4. NAVIGATION SCROLL EFFECT & MOBILE MENU
    // ==========================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isActive);
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // ==========================================
    // 5. HERO VIDEO BACKGROUND
    // ==========================================
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        // Ensure video plays on interaction if autoplay is blocked
        heroVideo.play().catch(() => {
            // Autoplay blocked; video will play on first user interaction
            document.addEventListener('click', () => {
                heroVideo.play().catch(() => {});
            }, { once: true });
        });
    }

    // ==========================================
    // 6. SCROLL TRIGGERED ANIMATIONS (Intersection Observer)
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counters if it's a stat item
                if (entry.target.querySelector('.counter')) {
                    startCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // 7. ANIMATED COUNTERS
    // ==========================================
    function startCounters(container) {
        const counters = container.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            counter.dataset.animated = true;

            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // ==========================================
    // 8. TESTIMONIAL CAROUSEL (Google Review Screenshots)
    // Place your screenshots in assets/testimonials/ and update the paths below.
    // ==========================================
    const testimonials = [
        { image: "assets/testimonials/testimonial-1.png", name: "Google Review 1" },
        { image: "assets/testimonials/testimonial-2.png", name: "Google Review 2" },
        { image: "assets/testimonials/testimonial-3.png", name: "Google Review 3" },
        { image: "assets/testimonials/testimonial-4.png", name: "Google Review 4" },
        { image: "assets/testimonials/testimonial-5.png", name: "Google Review 5" },
        { image: "assets/testimonials/testimonial-6.png", name: "Google Review 6" },
        { image: "assets/testimonials/testimonial-7.png", name: "Google Review 7" },
        { image: "assets/testimonials/testimonial-8.png", name: "Google Review 8" },
        { image: "assets/testimonials/testimonial-9.png", name: "Google Review 9" },
        { image: "assets/testimonials/testimonial-10.png", name: "Google Review 10" }
    ];

    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    testimonials.forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'testimonial-slide';
        slide.innerHTML = `
            <img src="${t.image}" alt="${t.name} - Google Review screenshot" class="testimonial-screenshot" loading="lazy">
            <p class="client-role">Google Review</p>
        `;
        testimonialTrack.appendChild(slide);
    });

    let currentTestimonial = 0;
    const totalTestimonials = testimonials.length;
    let testimonialTimer;

    function updateTestimonial() {
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }

    function startTestimonialAutoSlide() {
        stopTestimonialAutoSlide();
        testimonialTimer = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateTestimonial();
        }, 6000);
    }

    function stopTestimonialAutoSlide() {
        clearInterval(testimonialTimer);
    }

    document.getElementById('nextTestimonial').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonial();
        startTestimonialAutoSlide();
    });

    document.getElementById('prevTestimonial').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonial();
        startTestimonialAutoSlide();
    });

    // Auto-slide with pause on hover
    testimonialCarousel.addEventListener('mouseenter', stopTestimonialAutoSlide);
    testimonialCarousel.addEventListener('mouseleave', startTestimonialAutoSlide);
    startTestimonialAutoSlide();

    // ==========================================
    // 9. HORIZONTAL SHOWCASE SLIDER
    // ==========================================
    const showcaseTrack = document.getElementById('showcaseTrack');

    // Slides come from the generated project manifest (assets/js/project-manifest.js)
    // so this carousel can only ever reference images that really exist on disk.
    // One representative photo per project keeps every project represented.
    const showcaseImages = [];
    const showcaseManifest = window.KALATHMIKA_PROJECTS;
    const featured = window.KALATHMIKA_FEATURED_PROJECTS;
    const describe = (folder) =>
        (featured && typeof featured.formatProjectName === 'function'
            ? featured.formatProjectName(folder)
            : folder) || folder;

    if (showcaseManifest && Array.isArray(showcaseManifest.categories)) {
        showcaseManifest.categories.forEach((category) => {
            (category.projects || []).forEach((project) => {
                const images = project.images || [];
                if (images.length) showcaseImages.push({ src: images[0], name: describe(project.folder) });
            });
        });
    }

    [...showcaseImages, ...showcaseImages].forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'showcase-item';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = `${item.name} by KALATHMIKA`;
        img.loading = 'lazy';
        div.appendChild(img);
        showcaseTrack.appendChild(div);
    });

    // If the manifest is unavailable, hide the track rather than show broken slides.
    if (!showcaseImages.length && showcaseTrack) {
        const slider = showcaseTrack.closest('.showcase-slider');
        if (slider) slider.hidden = true;
    }

    // ==========================================
    // 9. CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Simple validation
        const fields = ['fullName', 'email', 'message'];
        fields.forEach(id => {
            const input = document.getElementById(id);
            const group = input.parentElement;
            if (!input.value.trim()) {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.remove('error');
            }
        });

        // Email regex
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
                successMessage.classList.add('show');

                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });

    // Remove error on input
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('error');
        });
    });

    // ==========================================
    // 12b. BUDGET CURRENCY TOGGLE (USD / INR) + CUSTOM AMOUNT
    // ==========================================
    const budgetRanges = {
        USD: [
            { v: 'usd_10k-25k', l: '$10k - $25k' },
            { v: 'usd_25k-50k', l: '$25k - $50k' },
            { v: 'usd_50k-100k', l: '$50k - $100k' },
            { v: 'usd_100k-500k', l: '$100k - $500k' },
            { v: 'usd_500k-1m', l: '$500k - $1M' },
            { v: 'usd_1m+', l: '$1M+' }
        ],
        INR: [
            { v: 'inr_5l-15l', l: '₹5L - ₹15L' },
            { v: 'inr_15l-30l', l: '₹15L - ₹30L' },
            { v: 'inr_30l-75l', l: '₹30L - ₹75L' },
            { v: 'inr_75l-1.5cr', l: '₹75L - ₹1.5Cr' },
            { v: 'inr_1.5cr+', l: '₹1.5Cr+' }
        ]
    };
    let currentCurrency = 'USD';

    const budgetSelect = document.getElementById('budget');
    const budgetCustom = document.getElementById('budgetCustom');
    const currencySelect = document.getElementById('currencySelect');

    function renderBudgetRanges(cur) {
        budgetSelect.innerHTML = '<option value="" disabled selected></option>';
        budgetRanges[cur].forEach(r => {
            const o = document.createElement('option');
            o.value = r.v;
            o.textContent = r.l;
            budgetSelect.appendChild(o);
        });
        const customOpt = document.createElement('option');
        customOpt.value = 'custom';
        customOpt.textContent = 'Custom amount';
        budgetSelect.appendChild(customOpt);
    }

    currencySelect.addEventListener('change', () => {
        currentCurrency = currencySelect.value;
        renderBudgetRanges(currentCurrency);
        budgetCustom.placeholder = currentCurrency === 'USD'
            ? 'Enter amount (e.g. $50,000)'
            : 'Enter amount (e.g. ₹25,00,000)';
        budgetSelect.value = '';
        budgetCustom.value = '';
        budgetCustom.style.display = 'none';
    });

    budgetSelect.addEventListener('change', () => {
        const isCustom = budgetSelect.value === 'custom';
        budgetCustom.style.display = isCustom ? 'block' : 'none';
        if (isCustom) budgetCustom.focus();
    });

    renderBudgetRanges('USD');

    // ==========================================
    // 12c. AWARD DETAILS POPUP
    // ==========================================
    const awardModal = document.getElementById('awardModal');
    const awardModalTitle = document.getElementById('awardModalTitle');
    const awardModalYear = document.getElementById('awardModalYear');
    const awardModalOrg = document.getElementById('awardModalOrg');
    const awardModalDesc = document.getElementById('awardModalDesc');
    const awardModalClose = document.getElementById('awardModalClose');
    const awardModalBackdrop = document.getElementById('awardModalBackdrop');

    let lastAwardBtn = null;

    function openAwardModal(item) {
        awardModalTitle.textContent = item.querySelector('.award-name').textContent;
        awardModalYear.textContent = item.querySelector('.award-year').textContent;
        awardModalOrg.textContent = item.querySelector('.award-org').textContent;
        awardModalDesc.textContent = item.querySelector('.award-desc-src').textContent;
        awardModal.classList.add('show');
        awardModal.setAttribute('aria-hidden', 'false');
        if (lastAwardBtn) lastAwardBtn.setAttribute('aria-expanded', 'false');
        lastAwardBtn = item.querySelector('.award-more');
        if (lastAwardBtn) lastAwardBtn.setAttribute('aria-expanded', 'true');
        awardModalClose.focus();
    }

    function closeAwardModal() {
        awardModal.classList.remove('show');
        awardModal.setAttribute('aria-hidden', 'true');
        if (lastAwardBtn) {
            lastAwardBtn.setAttribute('aria-expanded', 'false');
            lastAwardBtn = null;
        }
    }

    const recipientPanel = document.querySelector('.award-recipient-panel');
    const recipientImages = document.querySelectorAll('.award-recipient-img');
    const recipientCaption = document.querySelector('.award-recipient-caption');

    document.querySelectorAll('.award-list-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const awardId = item.dataset.award;
            recipientImages.forEach(img => img.classList.toggle('active', img.dataset.award === awardId));
            recipientCaption.textContent = `${item.querySelector('.award-name').textContent} — ${item.querySelector('.award-year').textContent}`;
            recipientPanel.classList.add('has-recipient');
        });
        item.addEventListener('mouseleave', () => {
            recipientImages.forEach(img => img.classList.remove('active'));
            recipientPanel.classList.remove('has-recipient');
        });
        item.addEventListener('click', (e) => {
            if (e.target.closest('.award-more')) openAwardModal(item);
        });
    });

    awardModalClose.addEventListener('click', closeAwardModal);
    awardModalBackdrop.addEventListener('click', closeAwardModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAwardModal();
    });

    // ==========================================
    // 10. BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 11. VERTICAL SCROLL HANDLING
    // (scroll progress, navbar state, active nav link, back-to-top)
    // ==========================================
    const sectionIds = ['hero', 'about', 'awards', 'projects', 'services', 'showcase', 'offices', 'testimonials', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    function updateNavActive() {
        let activeId = sectionIds[0];
        const probe = window.scrollY + window.innerHeight * 0.35;
        sections.forEach(section => {
            if (probe >= section.offsetTop) activeId = section.id;
        });

        document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
            const href = a.getAttribute('href');
            a.classList.toggle('nav-active', href === `#${activeId}`);
        });

        navbar.classList.toggle('scrolled', window.scrollY > 40);
        backToTop.classList.toggle('visible', window.scrollY > 400);

        if (scrollProgress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        }
    }

    // Pause hero video when it scrolls out of view
    const heroSection = document.getElementById('hero');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!heroVideo) return;
            if (entry.isIntersecting) {
                heroVideo.play().catch(() => {});
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.1 });

    if (heroSection) heroObserver.observe(heroSection);

    window.addEventListener('scroll', updateNavActive, { passive: true });
    window.addEventListener('resize', updateNavActive);
    window.addEventListener('load', updateNavActive);

    // Init
    updateNavActive();

    // ==========================================
    // 12. KEYBOARD NAVIGATION SUPPORT
    // ==========================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.focus();
        }
    });
});

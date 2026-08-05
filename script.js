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
    // 8. DYNAMIC PROJECTS GRID (Residential, Commercial, Hospitality)
    // Images loaded from assets/images/project-images/ folder
    // Naming: RP = Residential, CP = Commercial, HP = Hospitality
    // ==========================================
    const projectsData = [
        // Residential
        { title: "Residential Project 01", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0101.jpg", tall: false, year: "2025", area: "3,200 sq ft", desc: "A beautifully designed residential space blending modern aesthetics with comfortable living." },
        { title: "Residential Project 02", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0102.jpg", tall: false, year: "2025", area: "2,800 sq ft", desc: "Contemporary home design with open-plan living and natural light." },
        { title: "Residential Project 03", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0103.jpg", tall: false, year: "2024", area: "3,500 sq ft", desc: "Elegant residence featuring clean lines and warm material palette." },
        { title: "Residential Project 04", category: "residential", location: "Udaipur, Rajasthan", image: "assets/images/project-images/RP0104.jpg", tall: false, year: "2024", area: "4,100 sq ft", desc: "Luxurious family home with spacious interiors and modern amenities." },
        { title: "Residential Project 05", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0105.jpg", tall: true, year: "2025", area: "5,200 sq ft", desc: "Premium villa design with landscaped gardens and smart home features." },
        { title: "Residential Project 06", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0106.jpg", tall: false, year: "2024", area: "2,600 sq ft", desc: "Compact yet luxurious apartment with efficient space utilization." },
        { title: "Residential Project 07", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0107.jpg", tall: false, year: "2025", area: "3,800 sq ft", desc: "Modern duplex house with double-height living spaces." },
        { title: "Residential Project 08", category: "residential", location: "Kota, Rajasthan", image: "assets/images/project-images/RP0108.jpg", tall: false, year: "2024", area: "2,900 sq ft", desc: "Thoughtfully designed home with seamless indoor-outdoor connection." },
        { title: "Residential Project 09", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0201.jpg", tall: false, year: "2025", area: "3,400 sq ft", desc: "Stylish residence with custom woodwork and ambient lighting." },
        { title: "Residential Project 10", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0202.jpg", tall: false, year: "2024", area: "4,500 sq ft", desc: "Grand family home blending tradition with contemporary design." },
        { title: "Residential Project 11", category: "residential", location: "Udaipur, Rajasthan", image: "assets/images/project-images/RP0203.jpg", tall: false, year: "2025", area: "3,100 sq ft", desc: "Minimalist home with maximum functionality and clean aesthetics." },
        { title: "Residential Project 12", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0204.jpg", tall: false, year: "2024", area: "5,800 sq ft", desc: "Sprawling residence with private courtyard and water features." },
        { title: "Residential Project 13", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0205.jpg", tall: true, year: "2025", area: "6,200 sq ft", desc: "Luxury penthouse with panoramic views and premium finishes." },
        { title: "Residential Project 14", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0206.jpg", tall: false, year: "2024", area: "2,700 sq ft", desc: "Cozy yet modern home perfect for young families." },
        { title: "Residential Project 15", category: "residential", location: "Kota, Rajasthan", image: "assets/images/project-images/RP0207.jpg", tall: false, year: "2025", area: "3,600 sq ft", desc: "Nature-inspired residence with organic materials and green spaces." },
        { title: "Residential Project 16", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0208.jpg", tall: false, year: "2024", area: "4,000 sq ft", desc: "Contemporary villa with infinity pool and outdoor lounge." },
        { title: "Residential Project 17", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0209.jpg", tall: false, year: "2025", area: "3,300 sq ft", desc: "Art Deco inspired home with bold geometric patterns." },
        { title: "Residential Project 18", category: "residential", location: "Udaipur, Rajasthan", image: "assets/images/project-images/RP0210.jpg", tall: false, year: "2024", area: "4,800 sq ft", desc: "Lake-facing residence with expansive glass facades." },
        { title: "Residential Project 19", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0211.jpg", tall: false, year: "2025", area: "2,500 sq ft", desc: "Smart home with integrated automation and energy efficiency." },
        { title: "Residential Project 20", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0212.jpg", tall: false, year: "2024", area: "3,900 sq ft", desc: "Heritage-inspired home with modern comfort and style." },
        { title: "Residential Project 21", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0213.jpg", tall: false, year: "2025", area: "5,500 sq ft", desc: "Multi-generational home with separate living zones." },
        { title: "Residential Project 22", category: "residential", location: "Kota, Rajasthan", image: "assets/images/project-images/RP0214.jpg", tall: false, year: "2024", area: "3,000 sq ft", desc: "Vibrant home with colorful interiors and playful design elements." },
        { title: "Residential Project 23", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0215.jpg", tall: false, year: "2025", area: "4,200 sq ft", desc: "Zen-inspired residence with meditation spaces and gardens." },
        { title: "Residential Project 24", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0216.jpg", tall: false, year: "2024", area: "3,700 sq ft", desc: "Industrial-chic home with exposed brick and metal accents." },
        { title: "Residential Project 25", category: "residential", location: "Udaipur, Rajasthan", image: "assets/images/project-images/RP0217.jpg", tall: false, year: "2025", area: "6,000 sq ft", desc: "Majestic estate with traditional Rajasthani architectural elements." },
        { title: "Residential Project 26", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0218.jpg", tall: false, year: "2024", area: "2,400 sq ft", desc: "Compact luxury apartment with rooftop terrace." },
        { title: "Residential Project 27", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0219.jpg", tall: false, year: "2025", area: "4,600 sq ft", desc: "Eco-friendly home with solar panels and rainwater harvesting." },
        { title: "Residential Project 28", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/Rp0220.jpg", tall: false, year: "2024", area: "3,500 sq ft", desc: "Sleek modern home with smart lighting and climate control." },
        { title: "Residential Project 29", category: "residential", location: "Kota, Rajasthan", image: "assets/images/project-images/RP0501.jpg", tall: false, year: "2025", area: "4,300 sq ft", desc: "Villa with seamless indoor-outdoor living and pool area." },
        { title: "Residential Project 30", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0502.jpg", tall: false, year: "2024", area: "3,200 sq ft", desc: "Warm and inviting home with natural wood finishes." },
        { title: "Residential Project 31", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0503.jpg", tall: false, year: "2025", area: "5,100 sq ft", desc: "Grand entrance and spacious living areas define this residence." },
        { title: "Residential Project 32", category: "residential", location: "Udaipur, Rajasthan", image: "assets/images/project-images/RP0504.jpg", tall: false, year: "2024", area: "2,800 sq ft", desc: "Minimalist retreat with panoramic mountain views." },
        { title: "Residential Project 33", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0505.jpg", tall: false, year: "2025", area: "3,600 sq ft", desc: "Contemporary home with cantilevered balconies." },
        { title: "Residential Project 34", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0506.jpg", tall: false, year: "2024", area: "4,400 sq ft", desc: "Luxurious master suite and designer kitchen." },
        { title: "Residential Project 35", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0507.jpg", tall: false, year: "2025", area: "3,100 sq ft", desc: "Charming home with handcrafted details and warm tones." },
        { title: "Residential Project 36", category: "residential", location: "Kota, Rajasthan", image: "assets/images/project-images/RP0508.jpg", tall: false, year: "2024", area: "5,700 sq ft", desc: "Estate property with sprawling lawns and guest house." },
        { title: "Residential Project 37", category: "residential", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/RP0509.jpg", tall: false, year: "2025", area: "2,600 sq ft", desc: "Urban apartment with skyline views and modern finishes." },
        { title: "Residential Project 38", category: "residential", location: "Jaipur, Rajasthan", image: "assets/images/project-images/RP0510.jpg", tall: false, year: "2024", area: "4,000 sq ft", desc: "Family-friendly home with play areas and study rooms." },
        { title: "Residential Project 39", category: "residential", location: "Udaipur, Rajasthan", image: "assets/images/project-images/RP0511.jpg", tall: false, year: "2025", area: "3,800 sq ft", desc: "Heritage restoration with modern interior upgrades." },

        // Commercial
        { title: "Commercial Project 01", category: "commercial", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/CP0101.jpg", tall: false, year: "2024", area: "8,000 sq ft", desc: "Modern office space designed for productivity and collaboration." },
        { title: "Commercial Project 02", category: "commercial", location: "Jaipur, Rajasthan", image: "assets/images/project-images/CP0102.jpg", tall: false, year: "2025", area: "12,000 sq ft", desc: "Corporate headquarters with open-plan workspace and meeting rooms." },
        { title: "Commercial Project 03", category: "commercial", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/CP0103.jpg", tall: false, year: "2024", area: "6,500 sq ft", desc: "Retail showroom with innovative display systems." },
        { title: "Commercial Project 04", category: "commercial", location: "Jaipur, Rajasthan", image: "assets/images/project-images/CP0104.jpg", tall: false, year: "2025", area: "15,000 sq ft", desc: "Tech park office with smart infrastructure and green design." },
        { title: "Commercial Project 05", category: "commercial", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/CP0201.jpg", tall: false, year: "2024", area: "9,500 sq ft", desc: "Co-working space with flexible layouts and modern amenities." },
        { title: "Commercial Project 06", category: "commercial", location: "Jaipur, Rajasthan", image: "assets/images/project-images/CP0202.jpg", tall: false, year: "2025", area: "7,200 sq ft", desc: "Boutique office with premium finishes and brand identity." },
        { title: "Commercial Project 07", category: "commercial", location: "Udaipur, Rajasthan", image: "assets/images/project-images/CP0203.jpg", tall: false, year: "2024", area: "11,000 sq ft", desc: "Multi-floor commercial complex with retail and office spaces." },
        { title: "Commercial Project 08", category: "commercial", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/CP0204.jpg", tall: false, year: "2025", area: "5,800 sq ft", desc: "Showroom with dramatic lighting and product display zones." },
        { title: "Commercial Project 09", category: "commercial", location: "Jaipur, Rajasthan", image: "assets/images/project-images/CP0205.jpg", tall: false, year: "2024", area: "18,000 sq ft", desc: "Corporate campus with landscaped courtyards and wellness areas." },
        { title: "Commercial Project 10", category: "commercial", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/CP0206.jpg", tall: false, year: "2025", area: "10,000 sq ft", desc: "Innovation hub with creative workspaces and breakout zones." },

        // Hospitality
        { title: "Hospitality Project 01", category: "hospitality", location: "Jaipur, Rajasthan", image: "assets/images/project-images/HP0101.jpg", tall: false, year: "2024", area: "3,500 sq ft", desc: "Boutique cafe with warm ambiance and cozy seating." },
        { title: "Hospitality Project 02", category: "hospitality", location: "Udaipur, Rajasthan", image: "assets/images/project-images/HP0102.jpg", tall: false, year: "2025", area: "5,200 sq ft", desc: "Fine dining restaurant with elegant interiors and ambient lighting." },
        { title: "Hospitality Project 03", category: "hospitality", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/HP0103.jpg", tall: false, year: "2024", area: "8,000 sq ft", desc: "Heritage hotel lobby with traditional Rajasthani elements." },
        { title: "Hospitality Project 04", category: "hospitality", location: "Jaipur, Rajasthan", image: "assets/images/project-images/HP0104.jpg", tall: false, year: "2025", area: "4,000 sq ft", desc: "Rooftop bar with panoramic city views and stylish lounge." },
        { title: "Hospitality Project 05", category: "hospitality", location: "Udaipur, Rajasthan", image: "assets/images/project-images/HP0105.jpg", tall: false, year: "2024", area: "6,500 sq ft", desc: "Resort spa with natural materials and serene design." },
        { title: "Hospitality Project 06", category: "hospitality", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/HP0106.jpg", tall: false, year: "2025", area: "2,800 sq ft", desc: "Artisan bakery with rustic charm and display counters." },
        { title: "Hospitality Project 07", category: "hospitality", location: "Jaipur, Rajasthan", image: "assets/images/project-images/HP0107.jpg", tall: false, year: "2024", area: "7,300 sq ft", desc: "Multi-cuisine restaurant with open kitchen concept." },
        { title: "Hospitality Project 08", category: "hospitality", location: "Udaipur, Rajasthan", image: "assets/images/project-images/HP0108.jpg", tall: false, year: "2025", area: "4,500 sq ft", desc: "Boutique hotel suite with luxury furnishings." },
        { title: "Hospitality Project 09", category: "hospitality", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/HP0109.jpg", tall: false, year: "2024", area: "3,200 sq ft", desc: "Cocktail bar with mood lighting and designer furniture." },
        { title: "Hospitality Project 10", category: "hospitality", location: "Jaipur, Rajasthan", image: "assets/images/project-images/Hp0110.jpg", tall: false, year: "2025", area: "5,800 sq ft", desc: "Resort restaurant with outdoor seating and garden views." },
        { title: "Hospitality Project 11", category: "hospitality", location: "Udaipur, Rajasthan", image: "assets/images/project-images/HP0112.jpg", tall: false, year: "2024", area: "9,000 sq ft", desc: "Grand hotel ballroom with crystal chandeliers and marble floors." },
        { title: "Hospitality Project 12", category: "hospitality", location: "Bhilwara, Rajasthan", image: "assets/images/project-images/HP0113.jpg", tall: false, year: "2025", area: "2,500 sq ft", desc: "Intimate dining space with private alcoves and candlelight." },
        { title: "Hospitality Project 13", category: "hospitality", location: "Jaipur, Rajasthan", image: "assets/images/project-images/HP0114.jpg", tall: false, year: "2024", area: "6,000 sq ft", desc: "Trendy lounge with DJ booth andVIP sections." },
        { title: "Hospitality Project 14", category: "hospitality", location: "Udaipur, Rajasthan", image: "assets/images/project-images/HP0115.jpg", tall: false, year: "2025", area: "4,200 sq ft", desc: "Poolside cafe with tropical decor and relaxed vibe." }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    let currentFilter = 'all';

    function renderProjects(filter) {
        projectsGrid.innerHTML = '';
        const filtered = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.category === filter);

        filtered.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = `project-card glass-card animate-on-scroll ${project.tall ? 'tall' : ''}`;
            card.style.animationDelay = `${(index % 4) * 0.1}s`;
            card.dataset.category = project.category;
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title} - ${project.category} project by KALATHMIKA" class="project-image" loading="lazy">
                <div class="project-overlay">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-location">📍 ${project.location}</span>
                </div>
            `;

            // 3D Tilt Effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });

            // Lightbox Trigger
            card.addEventListener('click', () => openLightbox(project));

            projectsGrid.appendChild(card);
            observer.observe(card);
        });
    }

    renderProjects('all');

    // ==========================================
    // 9. PROJECT CATEGORY FILTERS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            if (filter === currentFilter) return;

            currentFilter = filter;

            // Update active button
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Re-render projects with filter
            renderProjects(filter);
        });
    });

    // ==========================================
    // 9b. PROJECT IMAGES SHOW / HIDE TOGGLE
    // ==========================================
    const toggleImagesBtn = document.getElementById('toggleImages');
    const toggleImagesLabel = document.getElementById('toggleImagesLabel');
    let imagesHidden = false;

    function applyImageToggle() {
        projectsGrid.classList.toggle('hide-images', imagesHidden);
        toggleImagesBtn.setAttribute('aria-pressed', imagesHidden ? 'true' : 'false');
        toggleImagesLabel.textContent = imagesHidden ? 'Show Images' : 'Hide Images';
    }

    toggleImagesBtn.addEventListener('click', () => {
        imagesHidden = !imagesHidden;
        applyImageToggle();
    });

    // ==========================================
    // 10. LIGHTBOX FUNCTIONALITY
    // ==========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(project) {
        document.getElementById('lightboxImage').src = project.image;
        document.getElementById('lightboxImage').alt = `${project.title} - Project Detail`;
        document.getElementById('lightboxTitle').textContent = project.title;
        document.getElementById('lightboxCategory').textContent = project.category;
        document.getElementById('lightboxLocation').textContent = `📍 ${project.location}`;
        document.getElementById('lightboxDescription').textContent = project.desc;
        document.getElementById('lightboxYear').textContent = project.year;
        document.getElementById('lightboxArea').textContent = project.area;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ==========================================
    // 11. TESTIMONIAL CAROUSEL (Google Review Screenshots)
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
    // 12. HORIZONTAL SHOWCASE SLIDER
    // ==========================================
    const showcaseTrack = document.getElementById('showcaseTrack');
    const showcaseImages = [
        "assets/images/project-images/RP0101.jpg",
        "assets/images/project-images/CP0101.jpg",
        "assets/images/project-images/HP0101.jpg",
        "assets/images/project-images/RP0201.jpg",
        "assets/images/project-images/CP0201.jpg",
        "assets/images/project-images/HP0105.jpg"
    ];

    [...showcaseImages, ...showcaseImages].forEach((src, i) => {
        const div = document.createElement('div');
        div.className = 'showcase-item';
        div.innerHTML = `<img src="${src}" alt="Showcase project ${i + 1} by KALATHMIKA" loading="lazy">`;
        showcaseTrack.appendChild(div);
    });

    // ==========================================
    // 12. CONTACT FORM VALIDATION
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
    // 13. BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 14. VERTICAL SCROLL HANDLING
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
    // 15. KEYBOARD NAVIGATION SUPPORT
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

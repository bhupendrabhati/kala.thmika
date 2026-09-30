/*!
 * KALATHMIKA — Featured Projects System
 * ------------------------------------------------------------------
 * Data layer, hash routing, stacked-photo cards and the image gallery.
 *
 * Data source: window.KALATHMIKA_PROJECTS (assets/js/project-manifest.js),
 * generated from the real folders in assets/images/project-images/ by
 * scripts/generate-project-manifest.mjs. Nothing here is hardcoded, so
 * adding a new project folder automatically updates the whole section.
 *
 * Routes (hash based, so the single page is never reloaded):
 *   #projects                       category stacks
 *   #projects/<category>            projects inside a category
 *   #projects/<category>/<project>  project stack + full gallery
 */

(function () {
    'use strict';

    const manifest = window.KALATHMIKA_PROJECTS || null;
    const SECTION_ID = 'projects';
    const ROOT_HASH = `#${SECTION_ID}`;
    const CATEGORY_STACK_LAYERS = 5; // front image + 4 behind
    const PROJECT_STACK_LAYERS = 4;  // front image + 3 behind
    const NAVBAR_OFFSET = 90;

    /* =======================================================
     * 1. DISPLAY FORMATTING
     * ======================================================= */

    /* Location abbreviations used inside the project folder names.
       Add a new entry here and it works everywhere at once. */
    const LOCATION_NAMES = {
        BHL: 'Bhilwara',
        JP: 'Jaipur',
        UD: 'Udaipur',
        KO: 'Kota',
        KTA: 'Kota',
        AJ: 'Ajmer',
        JD: 'Jodhpur',
        BI: 'Bikaner',
        ABU: 'Mount Abu',
        MTS: 'Mount Abu',
        RJ: 'Rajasthan'
    };

    /* Category folder names that are not displayed verbatim.
       The folder on disk is spelled "Rennovation" — it is displayed as
       "Renovation" while the folder itself stays exactly as it is. */
    const CATEGORY_NAMES = {
        rennovation: 'Renovation',
        renovation: 'Renovation'
    };

    const LOCATION_PATTERN = /^(.+?)-([A-Za-z]{2,5})$/;

    function titleCase(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/(^|[\s\-_])([a-z])/g, (match, separator, character) => separator + character.toUpperCase());
    }

    function slugify(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    /** Splits "P-1-BHL" into { code: 'P-1', location: 'Bhl' } */
    function splitProjectFolder(folderName) {
        const folder = String(folderName || '').trim();
        const match = folder.match(LOCATION_PATTERN);
        if (!match) return { code: folder, location: '' };
        return { code: match[1], location: titleCase(match[2]) };
    }

    /**
     * The single source of truth for every project name shown on the site.
     *   formatProjectName('P-1-BHL') -> 'P-1 — Bhilwara'
     *   formatProjectName('P-2-JP')  -> 'P-2 — Jaipur'
     * Folder names themselves are never changed.
     */
    function formatProjectName(folderName) {
        const parts = splitProjectFolder(folderName);
        if (!parts.code) return '';
        if (!parts.location) return parts.code;
        const location = LOCATION_NAMES[parts.location.toUpperCase()] || parts.location;
        return `${parts.code} — ${location}`;
    }

    function formatProjectLocation(folderName) {
        const parts = splitProjectFolder(folderName);
        if (!parts.location) return '';
        return LOCATION_NAMES[parts.location.toUpperCase()] || parts.location;
    }

    function formatCategoryName(folderName) {
        const folder = String(folderName || '').trim();
        return CATEGORY_NAMES[slugify(folder)] || titleCase(folder.replace(/[-_]+/g, ' '));
    }

    function projectCountLabel(count) {
        return `${count} ${count === 1 ? 'Project' : 'Projects'}`;
    }

    function imageCountLabel(count) {
        return `${count} ${count === 1 ? 'Image' : 'Images'}`;
    }

    /* =======================================================
     * 2. DATA LAYER  (Category -> Projects -> Images)
     * ======================================================= */

    function buildModel() {
        const categories = manifest && Array.isArray(manifest.categories) ? manifest.categories : [];

        return categories.map((category) => {
            const name = formatCategoryName(category.folder);
            return {
                folder: category.folder,
                // URLs follow the *display* name, so a misspelled folder on disk
                // (e.g. "Rennovation") still produces #projects/renovation.
                slug: slugify(name),
                name,
                projects: (Array.isArray(category.projects) ? category.projects : []).map((project) => {
                    const images = Array.isArray(project.images) ? project.images : [];
                    const projectName = formatProjectName(project.folder);
                    return {
                        folder: project.folder,
                        slug: slugify(project.folder),
                        aliases: [slugify(projectName), slugify(project.folder)],
                        name: projectName,
                        location: formatProjectLocation(project.folder),
                        images,
                        imageCount: images.length
                    };
                })
            };
        });
    }

    const categories = buildModel();

    function findCategory(key) {
        const slug = slugify(key);
        return (
            categories.find((category) => category.slug === slug || slugify(category.folder) === slug) || null
        );
    }

    function findProject(category, key) {
        if (!category) return null;
        const slug = slugify(key);
        return category.projects.find((project) => project.aliases.indexOf(slug) !== -1) || null;
    }

    function categoryHash(category) {
        return `${ROOT_HASH}/${category.slug}`;
    }

    function projectHash(category, project) {
        return `${categoryHash(category)}/${project.slug}`;
    }

    /* =======================================================
     * 3. SMALL DOM HELPERS
     * ======================================================= */

    function el(tag, options, children) {
        const node = document.createElement(tag);

        if (options) {
            Object.keys(options).forEach((key) => {
                const value = options[key];
                if (value === undefined || value === null || value === false) return;

                if (key === 'class') node.className = value;
                else if (key === 'text') node.textContent = value;
                else if (key === 'dataset') Object.assign(node.dataset, value);
                else if (key === 'style') Object.assign(node.style, value);
                else if (key.slice(0, 2) === 'on' && typeof value === 'function') {
                    node.addEventListener(key.slice(2).toLowerCase(), value);
                } else node.setAttribute(key, value === true ? '' : value);
            });
        }

        (children || []).forEach((child) => {
            if (child === undefined || child === null || child === false) return;
            node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
        });

        return node;
    }

    const CHEVRON = {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '1.5',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'aria-hidden': 'true',
        focusable: 'false'
    };

    function icon(pathData, extraAttributes) {
        const attributes = Object.assign({}, CHEVRON, extraAttributes || {});
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        Object.keys(attributes).forEach((key) => svg.setAttribute(key, attributes[key]));
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        svg.appendChild(path);
        return svg;
    }

    const ARROW_RIGHT = 'M5 12h14M13 6l6 6-6 6';
    const ARROW_LEFT = 'M19 12H5M11 18l-6-6 6-6';

    /* =======================================================
     * 4. IMAGES WITH A CLEAN FALLBACK
     *    A failing image never shows the browser broken-image icon:
     *    the <img> is hidden and the host draws a gold placeholder.
     * ======================================================= */

    function markImageError(host, image, label) {
        if (!host || host.dataset.imageError === 'true') return;
        host.dataset.imageError = 'true';
        if (window.console && typeof console.warn === 'function') {
            console.warn(`[featured-projects] image could not be loaded (${label}): ${image.dataset.source}`);
        }
    }

    function createImage(source, options) {
        const settings = options || {};
        const host = el('span', { class: `pj-img ${settings.hostClass || ''}`.trim() });
        const image = el('img', {
            class: `pj-img__el ${settings.imageClass || ''}`.trim(),
            src: source,
            alt: settings.alt || '',
            loading: settings.eager ? 'eager' : 'lazy',
            decoding: 'async',
            draggable: 'false'
        });
        const label = settings.label || source;

        image.dataset.source = source;
        image.addEventListener('error', () => markImageError(host, image, label));
        if (image.complete && image.naturalWidth === 0) markImageError(host, image, label);

        host.appendChild(image);
        return host;
    }

    /* =======================================================
     * 5. STACKED PHOTO CARD
     *    One front image, a few layers peeking out behind it.
     *    Depth, offset and rotation are driven by --depth in CSS.
     * ======================================================= */

    /** Evenly spreads up to layerCount images across the folder, front first. */
    function pickStackImages(images, layerCount) {
        if (!images.length || layerCount < 1) return [];
        if (images.length <= layerCount) return images.slice();
        if (layerCount === 1) return [images[0]];

        const picks = [];
        for (let i = 0; i < layerCount; i += 1) {
            picks.push(images[Math.round((i * (images.length - 1)) / (layerCount - 1))]);
        }
        return Array.from(new Set(picks));
    }

    function createStack(options) {
        const settings = options;
        const picks = pickStackImages(settings.images || [], settings.layerCount || 3);
        const stack = el('button', {
            type: 'button',
            class: `pstack ${settings.className || ''}`.trim(),
            'aria-label': settings.label,
            onclick: settings.onOpen
        });

        if (settings.direction) stack.style.setProperty('--stack-dir', settings.direction);

        if (!picks.length) {
            stack.disabled = true;
            stack.setAttribute('aria-disabled', 'true');
            stack.appendChild(
                el('span', { class: 'pstack__layer pstack__layer--empty', 'aria-hidden': 'true' })
            );
            return stack;
        }

        // Front image is the first one of the folder; the rest fan out behind it.
        const layers = [{ source: picks[0], depth: 0 }].concat(
            picks.slice(1).map((source, index) => ({ source, depth: picks.length - 1 - index }))
        );

        layers
            .sort((a, b) => b.depth - a.depth) // deepest layer first, so the front paints on top
            .forEach((layer) => {
                const isFront = layer.depth === 0;
                const node = el('span', {
                    class: `pstack__layer ${isFront ? 'pstack__layer--front' : ''}`.trim(),
                    'aria-hidden': isFront ? null : 'true'
                });
                node.style.setProperty('--depth', layer.depth);
                node.appendChild(
                    createImage(layer.source, {
                        alt: '',
                        label: `${settings.label} (layer ${layer.depth + 1})`
                    })
                );
                stack.appendChild(node);
            });

        return stack;
    }

    /* =======================================================
     * 6. CARDS
     * ======================================================= */

    function createCardMeta(eyebrow, title, count, ctaText) {
        const children = [
            el('span', { class: 'pj-card__eyebrow', text: eyebrow }),
            el('h3', { class: 'pj-card__title', text: title })
        ];

        if (count) children.push(el('p', { class: 'pj-card__count', text: count }));
        if (ctaText) {
            children.push(
                el('span', { class: 'pj-card__cta' }, [ctaText, icon(ARROW_RIGHT, { class: 'pj-card__cta-icon' })])
            );
        }

        return el('div', { class: 'pj-card__meta' }, children);
    }

    function createCategoryCard(category, index) {
        const covers = category.projects
            .map((project) => project.images[0])
            .filter(Boolean);

        const card = el('article', { class: `pj-card pj-card--category animate-on-scroll delay-${(index % 2) + 1}` });

        card.appendChild(
            createStack({
                images: covers,
                layerCount: CATEGORY_STACK_LAYERS,
                className: 'pstack--feature',
                direction: index % 2 === 0 ? '-1' : '1',
                label: `${category.name} — ${projectCountLabel(category.projects.length)}. Open ${category.name} projects`,
                onOpen: () => navigate(categoryHash(category))
            })
        );

        card.appendChild(
            createCardMeta('Category', category.name, projectCountLabel(category.projects.length), 'View Projects')
        );

        return card;
    }

    function createProjectCard(category, project, index) {
        const card = el('article', { class: `pj-card pj-card--project animate-on-scroll delay-${(index % 2) + 1}` });

        card.appendChild(
            createStack({
                images: project.images,
                layerCount: PROJECT_STACK_LAYERS,
                direction: index % 2 === 0 ? '-1' : '1',
                label: `${project.name} — ${imageCountLabel(project.imageCount)}. Open gallery`,
                onOpen: () => openGallery(category, project, 0)
            })
        );

        card.appendChild(
            createCardMeta(project.location || category.name, project.name, imageCountLabel(project.imageCount))
        );

        return card;
    }

    function createBackLink(hash, text) {
        return el('a', { class: 'pj-back', href: hash }, [
            icon(ARROW_LEFT, { class: 'pj-back__icon' }),
            el('span', { text })
        ]);
    }

    function createEmptyState(title, text) {
        return el('div', { class: 'pj-empty glass-card animate-on-scroll' }, [
            el('span', { class: 'pj-empty__mark', 'aria-hidden': 'true' }),
            el('h3', { class: 'pj-empty__title', text }),
            el('p', { class: 'pj-empty__text', text })
        ]);
    }

    /* =======================================================
     * 7. VIEWS
     * ======================================================= */

    const view = document.getElementById('projectsView');
    const subtitle = document.getElementById('projectsSubtitle');
    const liveRegion = document.getElementById('projectsLive');

    function setSubtitle(text) {
        if (subtitle) subtitle.textContent = text;
    }

    function announce(text) {
        if (liveRegion) liveRegion.textContent = text;
    }

    function renderCategories() {
        if (!categories.length) {
            view.appendChild(
                createEmptyState(
                    'Projects coming soon',
                    'Run "node scripts/generate-project-manifest.mjs" to build the project manifest from the folders in assets/images/project-images/.'
                )
            );
            setSubtitle('Our work, organised by discipline');
            return;
        }

        view.appendChild(el('div', { class: 'pj-categories' }, categories.map(createCategoryCard)));
        setSubtitle('Our work, organised by discipline');
        announce('Choose a project category');
    }

    function renderCategory(category) {
        if (!category.projects.length) {
            view.appendChild(
                el('div', { class: 'pj-view__head' }, [createBackLink(ROOT_HASH, 'All Projects')])
            );
            view.appendChild(
                createEmptyState(
                    `No ${category.name.toLowerCase()} projects yet`,
                    `The folder ${category.folder} is currently empty. Add a project folder inside it and re-run the manifest generator.`
                )
            );
            setSubtitle(`${category.name} projects`);
            announce(`${category.name}: no projects yet`);
            return;
        }

        view.appendChild(
            el('div', { class: 'pj-view__head' }, [
                createBackLink(ROOT_HASH, 'All Projects'),
                el('div', { class: 'pj-view__heading' }, [
                    el('h3', { class: 'pj-view__title', text: category.name }),
                    el('p', { class: 'pj-view__count', text: projectCountLabel(category.projects.length) })
                ])
            ])
        );

        view.appendChild(
            el('div', { class: 'pj-grid' }, category.projects.map((project, index) => createProjectCard(category, project, index)))
        );

        setSubtitle(`${category.name} projects`);
        announce(`${category.name}, ${projectCountLabel(category.projects.length)}`);
    }

    function renderProject(category, project) {
        const images = project.images;

        view.appendChild(
            el('div', { class: 'pj-view__head' }, [
                createBackLink(categoryHash(category), category.name),
                el('div', { class: 'pj-view__heading' }, [
                    el('h3', { class: 'pj-view__title', text: project.name }),
                    el('p', { class: 'pj-view__count', text: imageCountLabel(images.length) })
                ])
            ])
        );

        const detail = el('div', { class: 'pj-detail animate-on-scroll' });

        detail.appendChild(
            el('div', { class: 'pj-detail__stack' }, [
                createStack({
                    images,
                    layerCount: CATEGORY_STACK_LAYERS,
                    className: 'pstack--feature',
                    direction: '-1',
                    label: `${project.name} — ${imageCountLabel(images.length)}. Open gallery`,
                    onOpen: () => openGallery(category, project, 0)
                })
            ])
        );

        const info = el('div', { class: 'pj-detail__info' }, [
            el('span', { class: 'pj-card__eyebrow', text: category.name }),
            el('h4', { class: 'pj-detail__title', text: project.name }),
            el('dl', { class: 'pj-detail__facts' }, [
                el('div', {}, [el('dt', { text: 'Location' }), el('dd', { text: project.location || '—' })]),
                el('div', {}, [el('dt', { text: 'Discipline' }), el('dd', { text: category.name })]),
                el('div', {}, [el('dt', { text: 'Images' }), el('dd', { text: String(images.length) })])
            ])
        ]);

        const openButton = el('button', {
            type: 'button',
            class: 'btn btn-primary pj-detail__cta',
            text: images.length ? 'Open Gallery' : 'No images yet',
            disabled: images.length ? null : true
        });
        if (images.length) openButton.addEventListener('click', () => openGallery(category, project, 0));

        info.appendChild(openButton);
        detail.appendChild(info);
        view.appendChild(detail);
        setSubtitle(`${project.name} · ${category.name}`);
        announce(`${project.name}, ${imageCountLabel(images.length)}`);
    }

    /* =======================================================
     * 8. GALLERY
     * ======================================================= */

    const galleryRoot = document.getElementById('gallery');
    const galleryImage = document.getElementById('galleryImage');
    const galleryImageHost = document.getElementById('galleryImageHost');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryCategory = document.getElementById('galleryCategory');
    const galleryCounter = document.getElementById('galleryCounter');
    const galleryThumbs = document.getElementById('galleryThumbs');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const galleryClose = document.getElementById('galleryClose');

    const state = {
        open: false,
        category: null,
        project: null,
        index: 0,
        lastFocused: null
    };

    function preloadImage(index) {
        const source = state.project && state.project.images[index];
        if (!source) return;
        const preloader = new Image();
        preloader.src = source;
    }

    function buildThumbnails() {
        galleryThumbs.textContent = '';

        state.project.images.forEach((source, index) => {
            const thumb = el('button', {
                type: 'button',
                class: 'gallery__thumb',
                'aria-label': `Show image ${index + 1} of ${state.project.imageCount}`,
                onclick: () => goTo(index, index === state.index ? 0 : index > state.index ? 1 : -1)
            });
            thumb.dataset.index = index;
            thumb.appendChild(createImage(source, { alt: '', label: `thumbnail ${index + 1}` }));
            galleryThumbs.appendChild(thumb);
        });
    }

    function syncThumbnails() {
        const thumbs = galleryThumbs.querySelectorAll('.gallery__thumb');
        thumbs.forEach((thumb, index) => {
            const active = index === state.index;
            thumb.classList.toggle('is-active', active);
            if (active) {
                thumb.setAttribute('aria-current', 'true');
                thumb.scrollIntoView({ block: 'nearest', inline: 'center' });
            } else {
                thumb.removeAttribute('aria-current');
            }
        });
    }

    function renderImage(direction) {
        const total = state.project.images.length;
        const source = state.project.images[state.index];

        galleryImage.classList.remove('is-entering', 'is-forward', 'is-backward');
        if (direction > 0) galleryImage.classList.add('is-forward');
        else if (direction < 0) galleryImage.classList.add('is-backward');
        void galleryImage.offsetWidth; // restart the transition
        galleryImage.classList.add('is-entering');

        galleryImageHost.dataset.imageError = 'false';
        galleryImage.src = source;
        galleryImage.alt = `${state.project.name} — image ${state.index + 1} of ${total}`;
        galleryCounter.textContent = `${state.index + 1} / ${total}`;

        galleryPrev.disabled = state.index === 0;
        galleryNext.disabled = state.index === total - 1;

        syncThumbnails();
        preloadImage(state.index + 1);
        preloadImage(state.index - 1);
    }

    function goTo(index, direction) {
        const total = state.project.images.length;
        const next = Math.min(Math.max(index, 0), total - 1);
        if (next === state.index) return;
        state.index = next;
        renderImage(direction);
    }

    function openGallery(category, project, startIndex) {
        if (!project || !project.imageCount) return;

        state.category = category;
        state.project = project;
        state.index = Math.min(Math.max(startIndex || 0, 0), project.imageCount - 1);
        state.lastFocused = document.activeElement;

        galleryTitle.textContent = project.name;
        galleryCategory.textContent = category.name;
        buildThumbnails();

        galleryRoot.classList.add('is-open');
        galleryRoot.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        state.open = true;

        renderImage(0);
        galleryClose.focus();
    }

    function closeGallery() {
        if (!state.open) return;

        galleryRoot.classList.remove('is-open');
        galleryRoot.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        state.open = false;

        if (state.lastFocused && document.contains(state.lastFocused) && typeof state.lastFocused.focus === 'function') {
            state.lastFocused.focus();
        }
    }

    galleryPrev.addEventListener('click', () => goTo(state.index - 1, -1));
    galleryNext.addEventListener('click', () => goTo(state.index + 1, 1));
    galleryClose.addEventListener('click', closeGallery);

    galleryRoot.addEventListener('click', (event) => {
        if (event.target === galleryRoot || event.target.dataset.galleryClose !== undefined) closeGallery();
    });

    galleryImage.addEventListener('error', () => {
        markImageError(galleryImageHost, galleryImage, state.project ? state.project.name : 'gallery');
    });

    /* Swipe on touch devices */
    let touchStartX = null;
    galleryRoot.addEventListener(
        'touchstart',
        (event) => {
            touchStartX = event.changedTouches[0].clientX;
        },
        { passive: true }
    );
    galleryRoot.addEventListener(
        'touchend',
        (event) => {
            if (touchStartX === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (Math.abs(delta) < 45) return;
            const direction = delta < 0 ? 1 : -1;
            goTo(state.index + direction, direction);
        },
        { passive: true }
    );

    /* Keyboard navigation + focus trap */
    document.addEventListener('keydown', (event) => {
        if (!state.open) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeGallery();
            return;
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(state.index - 1, -1);
            return;
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(state.index + 1, 1);
            return;
        }
        if (event.key === 'Home') {
            event.preventDefault();
            goTo(0, -1);
            return;
        }
        if (event.key === 'End') {
            event.preventDefault();
            goTo(state.project.imageCount - 1, 1);
            return;
        }
        if (event.key !== 'Tab') return;

        const focusable = galleryRoot.querySelectorAll(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    /* =======================================================
     * 9. ROUTER
     * ======================================================= */

    function parseRoute() {
        const hash = window.location.hash.replace(/^#/, '');
        if (!hash) return { name: 'categories' };

        const parts = hash.split('/').filter(Boolean);
        if (parts[0] !== SECTION_ID) return null; // not a featured-projects route

        if (!parts[1]) return { name: 'categories' };
        if (!parts[2]) return { name: 'category', category: parts[1] };
        return { name: 'project', category: parts[1], project: parts[2] };
    }

    function navigate(hash) {
        if (window.location.hash === hash) {
            render();
            return;
        }
        window.location.hash = hash; // hashchange -> render(), no page reload
    }

    let observer = null;

    function observeCards() {
        if (!observer) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
            );
        }
        view.querySelectorAll('.animate-on-scroll:not(.visible)').forEach((node) => observer.observe(node));
    }

    function scrollToSection() {
        const section = document.getElementById(SECTION_ID);
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.pageYOffset - NAVBAR_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    function isProjectsRoute() {
        return window.location.hash.replace(/^#/, '').split('/')[0] === SECTION_ID;
    }

    function render() {
        const route = parseRoute();
        if (!route || !view) return;

        if (state.open) closeGallery();

        view.textContent = '';

        if (route.name === 'category') {
            const category = findCategory(route.category);
            if (category) renderCategory(category);
            else renderCategories();
        } else if (route.name === 'project') {
            const category = findCategory(route.category);
            const project = findProject(category, route.project);
            if (category && project) renderProject(category, project);
            else if (category) renderCategory(category);
            else renderCategories();
        } else {
            renderCategories();
        }

        observeCards();

        // Only move the page when the visitor actually asked for a projects route,
        // never on a plain page load.
        if (isProjectsRoute()) scrollToSection();
    }

    window.addEventListener('hashchange', render);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

    /* Exposed for debugging / reuse of the name formatter. */
    window.KALATHMIKA_FEATURED_PROJECTS = {
        formatProjectName,
        formatCategoryName,
        formatProjectLocation,
        categories,
        openGallery: (categorySlug, projectSlug, index) => {
            const category = findCategory(categorySlug);
            const project = findProject(category, projectSlug);
            if (category && project) openGallery(category, project, index || 0);
        },
        navigate
    };
})();

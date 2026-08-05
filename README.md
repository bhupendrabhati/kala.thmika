# KALATHMIKA Architecture Studio

A premium, responsive architecture studio website built with pure HTML, CSS, and JavaScript — no frameworks, no libraries, no backend.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Live Preview

Open `index.html` in any modern browser to view the website.

---

## Features

### Hero Section
- Fullscreen autoplay background video with dark overlay
- Floating glassmorphism decorative elements
- Smooth fade-up animations on load
- Scroll indicator with pulse animation

### Navigation
- Fixed glassmorphism navbar with scroll effect
- Mobile hamburger menu with slide-in drawer
- Smooth scroll to sections
- Active link underline animation

### About Section
- Studio video showcase
- Animated experience badge
- Statistics grid with viewport-triggered counters (6+ Years, 50+ Projects, 50+ Residential, 10+ Commercial)

### Awards & Recognition
- 3 award cards with org logo and recipient photo
- Gold border accents and hover animations
- Easy-to-edit placeholder content

### Key Message
- Highlighted banner: *"Build your Dream House to Reality."*
- Animated glow effect and gold accent line

### Projects Section
- **63 project images** across 3 categories:
  - Residential (38 images — RP prefix)
  - Commercial (10 images — CP prefix)
  - Hospitality (14 images — HP prefix)
- Category filter buttons (All / Residential / Commercial / Hospitality)
- 3D tilt effect on hover
- Full lightbox preview with project details
- Smooth filtering animations

### Services
- 6 service cards: Architectural Design, Interior Design, Landscape Design, Renovation, Consultation, Vastu
- Hover slide animation on top border
- Icon scale animation

### Visual Journey (Showcase)
- Infinite horizontal auto-scrolling image slider
- Pauses on hover

### Testimonials
- Carousel with 4 client testimonials
- Auto-slide every 6 seconds
- Prev/Next navigation buttons

### Office Locations
- Head Office: Bhilwara
- Branch Office: Jaipur
- Address: After Maharani Trade Center (Old Maharana Talkies)

### Contact Section
- Contact form with validation
- Email: kalathmika.studio17@gmail.com
- Instagram: https://www.instagram.com/KALA.THMIKA_ARCHI_STUDIO
- Facebook: https://www.facebook.com/apurva.pareek.908
- Social icons with hover animations
- WhatsApp floating button

### Footer
- Quick links, office addresses, email, social links
- Blog link to [insperior.in](https://insperior.in/)
- Copyright notice

---

## Technical Highlights

### Performance
- Lazy loading on all images
- Optimized video loading with fallback
- Minimal DOM operations
- No external frameworks

### Accessibility
- ARIA labels on all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Visible focus states
- `prefers-reduced-motion` support

### SEO
- Meta title, description, and keywords
- Open Graph tags (Facebook)
- Twitter Card tags
- Schema.org structured data (ProfessionalService)

### Responsive Design
Tested across all breakpoints:
| Breakpoint | Device |
|------------|--------|
| 320px | Mobile S |
| 375px | Mobile M |
| 425px | Mobile L |
| 768px | Tablet |
| 1024px | Laptop |
| 1440px | Desktop |

### Animations
- Custom cursor glow effect
- Scroll progress indicator
- Intersection Observer for scroll-triggered animations
- CSS keyframe animations (float, scroll pulse, fade up)
- 3D perspective tilt on project cards
- Loading screen with animated line

---

## Project Structure

```
v02.01/
├── index.html              # Main HTML file
├── style.css               # All styles (CSS variables, glassmorphism, responsive)
├── script.js               # All JavaScript (vanilla, no dependencies)
├── images/
│   └── logo.png            # Studio logo
├── project-images/         # 63 project images
│   ├── RP*.jpg             # Residential projects
│   ├── CP*.jpg             # Commercial projects
│   └── HP*.jpg             # Hospitality projects
├── assets/
│   ├── images/awards/      # Award org logos & recipient photos
│   └── videos/hero/        # Hero background video
├── KAS.md                  # Master prompt / requirements
├── Changes.md              # Implementation summary
└── README.md               # This file
```

---

## How to Use

1. **Replace logo** — Update `images/logo.png` with your final logo
2. **Replace hero video** — Place your video at `assets/videos/hero/hero.mp4` and update the `<source>` tag in `index.html`
3. **Replace about video** — Place your video at `assets/videos/about.mp4`
4. **Replace project images** — Swap files in `project-images/` keeping the same filenames
5. **Replace award images** — Swap files in `assets/images/awards/`
6. **Update contact details** — Edit email, phone, social links in `index.html`
7. **Update testimonials** — Edit the `testimonials` array in `script.js`

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari / Chrome (iOS & Android)

---

## License

This project is proprietary. All rights reserved.

---

Designed & Developed with ❤️, ☁️, ☕ and AI by [Bhupendra Bhati](https://linkedin.com/in/bhupendrabhati)

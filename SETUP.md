# UE5 Gameplay Programmer Portfolio - Setup Guide

## What's Included

✅ Complete single-page portfolio with all sections:
- **Hero**: WebGL/YouTube placeholder, tech stack grid, CTA buttons
- **Toolbox**: UE5 skills matrix with expandable details
- **Projects**: 3-column responsive grid with modal details
- **Case Studies**: Problem→Solution accordions
- **Timeline**: Learning journey with scroll animations
- **Contact**: Form with job-specific fields

## Tech Stack

- **Vite** + React 18
- **Tailwind CSS** (custom config with electric blue theme)
- **Framer Motion** (smooth animations)
- **Prism.js** (syntax highlighting)
- **Pure CSS** (no extra UI libraries)

## Getting Started

```bash
# Install dependencies (if not already)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization Checklist

### 1. Personal Information
- Update `src/data/personal-info.json` with your actual email and social links
- Update `src/App.jsx` footer name if needed

### 2. Projects
- Edit `src/data/projects.json` with your real projects
- Add thumbnail images to `public/images/` and reference them
- Add video URLs (YouTube unlisted or self-hosted) in `demoVideo`
- Populate `codeSamples` with actual C++/Blueprint code (escaped properly)
- Add architecture diagrams to `public/diagrams/` and update `diagrams` array

### 3. Toolbox
- Update `src/data/toolbox.json` with your actual UE5 system proficiencies
- Adjust mastery levels, descriptions, and details

### 4. Case Studies
- Update `src/data/case-studies.json` with your real problems/solutions
- Add YouTube video links for comparison clips

### 5. Timeline
- Update `src/data/timeline.json` with your actual learning journey
- Add attachment links (screenshots, GitHub, PDFs)

### 6. Static Assets
- Place your resume PDF in `public/resume.pdf`
- Add favicon in `public/favicon.ico` (update `index.html`)
- Add any additional images/videos to `public/`

### 7. Contact Form
- Set up Formspree endpoint:
  - Create account at [formspree.io](https://formspree.io)
  - Add your form ID to `.env` as `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id`
  - Or replace the endpoint in `src/components/ContactForm.jsx`

### 8. WebGL Build (Optional)
- Build your UE5 project to HTML5
- Place `index.html`, `Build/`, `cached/` in `public/builds/hero/` or use YouTube

### 9. Domain & Deployment
- Deploy to Vercel (recommended) or GitHub Pages
- Update `sitemap.xml` with your actual domain
- Update `robots.txt` sitemap location

## Color Scheme

- **Background**: `#0a0a0a`
- **Text**: `#e0e0e0`
- **Accent**: `#00d4ff` (electric blue)
- **Fonts**: Inter (UI), Fira Code (code)

## Performance Notes

- Current bundle size: ~337KB gzipped (good)
- Target: Lighthouse >90 (add real images optimized to <200KB each)
- Videos: compress to <2MB each, use WebM format

## Adding Code Samples (Advanced)

Code samples in ProjectModal require proper JSON escaping. Example format:

```json
{
  "fileName": "MyComponent.cpp",
  "language": "cpp",
  "lines": 45,
  "code": "UCLASS()\\nclass UMyComponent : public UActorComponent\\n{\\n    GENERATED_BODY()\\n};",
  "explanation": "Why this approach...",
  "blueprintEquivalent": true
}
```

Use `\\n` for newlines, `\\"` for double quotes.

---

**Need help?** Check the detailed plan at `C:\Users\prath\.claude\plans\serialized-jumping-moler.md`

# Prompt for Antigravity / Gemini 3.1 Pro — Build NSV Overseas From Scratch

## Project Context

You are working inside an **empty project folder**.

Create a complete modern website from scratch for:

```text
NSV Overseas
```

NSV Overseas is a study abroad consultancy platform. The website should help students explore international study destinations, services, universities, referral benefits, and contact/counselling options.

There are **no existing files, no existing data, and no backend** in this project folder.

You may choose any tech stack. The final result should be beautiful, modern, responsive, performant, and easy to deploy on **Vercel**. It should also be structured so future **Supabase** integration can be added easily.

---

## Main Objective

Build a stunning animated study-abroad website with a scroll-based flight journey experience.

The homepage should feel like the user is travelling with NSV Overseas from India to global study destinations.

Core concept:

1. When the page loads, a flight/airplane labeled **“NSV Overseas”** flies into the screen.
2. As the user scrolls, the plane moves forward along a journey path.
3. Services appear behind or along the flight path as connected journey milestones.
4. After the service journey, the plane starts landing into destination countries one by one.
5. Each country is clickable.
6. Clicking a country opens a dedicated country page with universities and study details.
7. After the country journey, the homepage continues normally into referral and contact sections.
8. A fixed navbar remains visible at the top.

---

## Tech Stack Freedom

There are no strict tech-stack limitations.

Choose a stack that produces the best visual result while remaining Vercel-friendly.

Recommended stack:

```text
Vite
React
React Router
Framer Motion
GSAP with ScrollTrigger, if needed
Tailwind CSS
Lucide React icons
```

You may use any suitable animation library, but keep the site performant.

Avoid unnecessary backend code.

---

## Required Project Setup

Create the full project structure from scratch.

Minimum expected files:

```text
package.json
index.html
vite.config.js
src/
  main.jsx
  App.jsx
  data/
    services.js
    countries.js
    universities.js
  components/
    Navbar.jsx
    FlightHero.jsx
    FlightJourney.jsx
    ServicesTrail.jsx
    CountryJourney.jsx
    ReferralSection.jsx
    ContactSection.jsx
    Footer.jsx
  pages/
    Home.jsx
    CountryDetail.jsx
    Universities.jsx
    Referral.jsx
    Contact.jsx
    NotFound.jsx
  styles/
    global.css
public/
  robots.txt
  sitemap.xml
```

You may adjust this structure if a better one is appropriate.

The app must run with:

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Brand Identity

Create a premium, trustworthy study-abroad brand identity.

Brand name:

```text
NSV Overseas
```

Suggested visual theme:

- Global education
- Travel
- International admissions
- Student success
- Premium consultancy
- Smooth journey from India to the world

Suggested colors:

```text
Deep navy
Royal blue
Sky blue
White
Soft gold/orange accents
Subtle gradients
```

Typography:

- Modern, readable, professional.
- Use a clean Google Font or system font.
- Headings should feel bold and aspirational.
- Body text should be easy to read.

Overall feel:

- Stunning
- Premium
- Smooth
- Professional
- Trustworthy
- Not childish
- Not overly cluttered

---

## Homepage Sections

Create the homepage in this order:

1. Fixed navbar
2. Animated hero section with airplane entrance
3. Scroll-based services journey
4. Scroll-based country landing journey
5. Referral section
6. Contact section
7. Footer

---

## 1. Fixed Navbar

Create a fixed navbar that remains visible throughout the website.

Navbar items:

```text
Home
Services
Countries
Universities
Referral
Contact
```

Optional:

```text
Book Counselling
```

Navbar behavior:

- Fixed at top.
- Transparent or glassmorphism style over hero.
- Becomes more solid after scrolling.
- Smooth scroll for homepage sections.
- Works from subpages.
- Mobile hamburger menu.
- Accessible keyboard navigation.
- Clear CTA button: “Book Free Counselling”.

---

## 2. Hero Section with Flight Entrance

On page load:

- Show a full-screen or near-full-screen hero section.
- Animate a plane flying into the screen.
- The plane should visibly contain the text:

```text
NSV Overseas
```

Hero headline:

```text
Your Study Abroad Journey Starts Here
```

Hero subtext:

```text
From counselling to university selection, applications, visas, loans, and pre-departure support — NSV Overseas helps students plan their global education journey with confidence.
```

CTA buttons:

```text
Explore Countries
Book Free Counselling
```

Hero visual ideas:

- Animated airplane
- Cloud layers
- Subtle world map/grid background
- Curved route line
- Floating country markers
- Gradient sky
- Student/travel inspired design

Important:

- The animation should feel premium and smooth.
- Do not make the airplane cartoonish.
- It can be SVG/CSS-based if no image assets are used.
- The plane should remain visually connected to the scroll journey below.

---

## 3. Scroll-Based Services Journey

Create a section where the airplane continues moving as the user scrolls.

The services should appear as connected milestones behind or along the plane route.

Use the following services:

```text
1. Study Abroad Counselling
2. Course & Career Guidance
3. Country Selection
4. University Shortlisting
5. Application Assistance
6. Scholarship Guidance
7. Education Loan Support
8. Visa Documentation Support
9. Test Preparation Guidance
10. Pre-Departure Support
```

Each service card should include:

- Icon
- Title
- 2–3 line description
- Small visual marker/checkpoint

Service descriptions should be professional and non-misleading.

Example style:

```text
Personalized guidance to help students choose destinations and programs aligned with their academic background, budget, and long-term goals.
```

Animation requirements:

- Cards should fade, slide, or scale in as the user scrolls.
- The flight path line should animate progressively.
- The airplane should appear to move along the path.
- The service cards should feel attached to the journey.
- Use staggered animations.
- On mobile, convert this into a vertical timeline with simplified plane/path animation.
- Respect `prefers-reduced-motion`.

---

## 4. Country Landing Journey

After the services trail, create a country journey section.

The airplane should begin landing into countries one by one.

The journey starts from India and moves toward popular study destinations.

Create these destination countries:

```text
Germany
Netherlands
Italy
France
Ireland
United Kingdom
Canada
United States
Australia
New Zealand
```

Suggested ordering:

Westward route from India:

```text
Germany
Netherlands
Italy
France
Ireland
United Kingdom
Canada
United States
```

Then create a separate subsection:

```text
Other Popular Destinations
Australia
New Zealand
```

Country card requirements:

Each country card should include:

- Country name
- Flag emoji or simple flag-style visual
- Short study destination description
- Popular fields/programs
- CTA: “View Universities”
- Hover animation
- Clickable route to country detail page

Example route:

```text
/countries/germany
/countries/united-kingdom
/countries/canada
```

Animation requirements:

- Plane moves from one country marker to the next.
- Country cards reveal one by one.
- Route line highlights as the plane advances.
- Each country should feel like a landing point.
- Use map-inspired background, route dots, arcs, or coordinates.
- Keep the design clean and readable.

---

## 5. Country Detail Pages

Create a dynamic country detail page using React Router.

Route format:

```text
/countries/:slug
```

Each country detail page should include:

- Country hero section
- Country name
- Short overview
- Why study in this country
- Popular programs
- Approximate intake periods in generic terms
- University cards
- CTA section for counselling

Important:

Do not claim exact rankings, exact fees, guaranteed admission, guaranteed visa approval, or official partnerships unless verified data is provided.

Use editable placeholder/demo university data.

For each country, create 4–6 university cards with generic but realistic names. If possible, use known university names but avoid false claims about partnership or guaranteed admission.

University card fields:

```text
University name
City/location
Popular programs
Short description
Application support CTA
```

Example safe language:

```text
NSV Overseas can help students understand application requirements, document preparation, and available study options for this destination.
```

Do not say:

```text
Guaranteed admission
Guaranteed visa
Official partner university
100% scholarship guaranteed
```

---

## 6. Universities Page

Create a general universities page at:

```text
/universities
```

This page should:

- List all universities grouped by country.
- Include filters/search if practical.
- Allow user to click a country or university card.
- Use the same data as country detail pages.

---

## 7. Referral Section

Create a referral section on homepage and a standalone referral page.

Referral messaging:

```text
Refer a student planning to study abroad and help them connect with NSV Overseas guidance.
```

Include:

- Referral benefits
- How it works
- Simple referral form UI
- Clear disclaimer that the form is frontend-only/demo unless backend is connected
- CTA: “Submit Referral”

Form fields:

```text
Your name
Your phone/email
Student name
Student phone/email
Preferred country
Message
```

Since there is no backend:

- Show a friendly success message after submit.
- Do not pretend that data is saved to a database.
- Structure the form so Supabase can be connected later.

---

## 8. Contact Section

Create a contact section on homepage and a standalone contact page.

Include:

- Contact form
- Phone/email placeholder
- Location placeholder
- Counselling CTA
- Business hours placeholder
- Social links placeholder

Form fields:

```text
Name
Email
Phone
Interested country
Message
```

On submit:

- Show frontend success message.
- Do not store sensitive data.
- Add comments showing where Supabase integration can be added later.

---

## 9. Footer

Footer should include:

- NSV Overseas brand name
- Short description
- Quick links
- Study destinations
- Services
- Contact placeholders
- Copyright

Use current year dynamically if possible.

---

## Animation Quality Requirements

The animation should be one of the strongest parts of the website.

Use a polished combination of:

- Flight entrance animation
- Scroll-driven movement
- Path drawing animation
- Service reveal animation
- Country landing animation
- Cloud parallax
- Floating particles or subtle stars/clouds
- Card hover motion
- Smooth page transitions
- Route line glow
- Button micro-interactions

But avoid:

- Laggy scroll
- Too many distracting effects
- Poor mobile performance
- Unreadable text
- Animation blocking navigation
- Heavy assets

Use reduced-motion support:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable or simplify major animations */
}
```

---

## Content Data

Create structured data files.

### services.js

Include the 10 services listed above.

### countries.js

Include these countries:

```text
Germany
Netherlands
Italy
France
Ireland
United Kingdom
Canada
United States
Australia
New Zealand
```

Each country should have:

```text
name
slug
flag
region
shortDescription
overview
popularPrograms
intakes
whyStudyPoints
```

### universities.js

Create 4–6 university entries per country.

Each university should have:

```text
name
countrySlug
city
popularPrograms
description
```

Use safe editable demo data.

---

## SEO Requirements

Create strong SEO foundation.

Add:

- Proper page titles
- Meta descriptions
- Semantic headings
- Open Graph tags
- Image/SVG alt labels where applicable
- `robots.txt`
- `sitemap.xml`
- Clean routes
- Country-specific SEO titles

Example country title:

```text
Study in Germany | NSV Overseas
```

Example description:

```text
Explore study options, popular programs, and university application support for Germany with NSV Overseas.
```

If using React, use `react-helmet-async` or another simple approach for page metadata.

---

## Vercel Requirements

The final project must be deployable on Vercel.

Ensure:

- `npm run build` works.
- No broken imports.
- No missing files.
- No backend dependency.
- No hardcoded localhost API calls.
- React Router works on Vercel.

If React Router is used, add a Vercel rewrite config if needed:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Supabase Readiness

Do not fully implement Supabase unless specifically required.

But prepare for it:

- Keep forms modular.
- Keep data structured.
- Add clear comments where Supabase insert calls can be added.
- Avoid localStorage for sensitive form data.
- Do not create real `.env` secrets.
- If adding `.env.example`, only include placeholder values.

Example:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Accessibility Requirements

Ensure the website is accessible.

Include:

- Semantic HTML
- Keyboard-accessible navigation
- Alt labels for meaningful visuals
- Good color contrast
- Visible focus states
- Accessible mobile menu
- Reduced motion support
- Proper button/link usage

---

## Responsive Design Requirements

The site must look excellent on:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile behavior:

- Navbar becomes hamburger.
- Flight animation is simplified.
- Journey sections become vertical timelines.
- Cards stack cleanly.
- CTA buttons remain easy to tap.
- Text remains readable.

---

## Pages to Build

Create these pages:

```text
/
Homepage with flight journey

/countries/:slug
Dynamic country detail page

/universities
All universities page

/referral
Referral page

/contact
Contact page

/services
Optional services page if useful

/*
404 Not Found page
```

---

## Copywriting Tone

Use clear, professional, trustworthy language.

Tone:

- Helpful
- Confident
- Student-friendly
- Professional
- Non-misleading

Avoid:

- Guaranteed admission
- Guaranteed visa
- Fake partnerships
- Fake rankings
- Overpromising scholarships
- Unrealistic claims

Use language such as:

```text
Guidance
Support
Assistance
Explore options
Plan your journey
Understand requirements
Prepare documents
```

---

## Expected Final Deliverable

After implementation, provide a final summary explaining:

1. Tech stack used.
2. Main pages created.
3. Animation approach.
4. How to run locally.
5. How to build.
6. How to deploy on Vercel.
7. Where to edit services/countries/universities.
8. Where future Supabase integration can be added.

---

## Final Website Behavior

The final user experience should be:

1. User opens homepage.
2. A beautiful NSV Overseas airplane flies into the hero section.
3. User scrolls.
4. Services appear as connected milestones behind the flight.
5. The plane continues along a route.
6. The plane lands across study destinations one by one.
7. User clicks a destination.
8. Country page opens with universities and study details.
9. User can explore referral/contact pages.
10. Navbar remains fixed and smooth throughout.

---

## Implementation Priorities

Prioritize:

1. Stunning visual quality
2. Smooth scroll animation
3. Working navigation
4. Clean responsive layout
5. Vercel deployability
6. Structured editable data
7. Supabase readiness
8. SEO foundation
9. Accessibility
10. Maintainable code

Please build everything directly in the empty project folder.

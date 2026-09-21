/**
 * SINGLE SOURCE OF TRUTH FOR ALL COPY.
 *
 * Every string below is taken from the official Cascade Residences brochure
 * (BROCHURE/Brochure - Whatsapp and web version.pdf) or the client brief.
 * Headings marked "adapted" are rephrased from brochure language for web hierarchy.
 * NOTHING here is invented: no pricing, unit counts, square footage, yields or dates,
 * because none exist in the supplied project materials.
 */

export const brand = {
  name: "Cascade Residences",
  shortName: "Cascade",
  location: "Negril, Jamaica",
  email: "info@issahomesjamaica.com",
  logo: "/brand/cascade-lockup-white.png",
  mark: "/brand/cascade-mark-white.png",
} as const;

export const nav = [
  { label: "Residences", href: "/#residences" },
  { label: "Building Levels", href: "/#floor-plans" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/#contact" },
] as const;

export const hero = {
  eyebrow: "Negril, Jamaica",
  /** Brochure, page 2 headline */
  titleTop: "Never Ending",
  titleBottom: "Sunsets",
  /** Brochure, page 3 tagline (verbatim) */
  tagline: "Refined living, naturally inspired.",
  primaryCta: "Request Brochure",
  secondaryCta: "Discover Cascade",
  video: "/video/home-hero.mp4",
  poster: "/images/home-hero-poster.jpg",
} as const;

export const intro = {
  index: "01",
  label: "The Project",
  /** Adapted from the brochure's opening paragraph */
  heading: "Where sophistication meets the raw beauty of the Caribbean",
  /** Brochure, page 2 (verbatim) */
  body: [
    "Where the horizon stretches endlessly over turquoise waters, and each day unfolds in quiet perfection. In Negril, sophistication meets the raw beauty of the Caribbean — a landscape of light, texture, and balance.",
    "Here, tropical luxury is defined by refinement: natural materials, crafted details, and an effortless harmony between architecture and nature. A sanctuary shaped by serenity, designed for those who appreciate the art of living beautifully.",
  ],
  image: "/images/front.jpg",
  imageCaption: "Front elevation — Cascade Residences",
} as const;

export const location = {
  index: "02",
  label: "Location",
  /** Brochure, page 24 section title (verbatim) */
  heading: "A serene coastal lifestyle",
  /** Brochure, pages 25–26 (verbatim) */
  body: [
    "Negril moves at the pace of the sea — calm, open, and endlessly serene. Along the Seven Mile Beach, the horizon stretches without interruption, where ocean and sky become one.",
    "Life here is guided by nature: mornings filled with soft light, days shaped by the breeze, and nights framed by quiet reflection. It's a place shaped by nature's quiet rhythm, where simplicity and comfort coexist with refined design and understated luxury.",
  ],
  image: "/images/aerial-view.jpg",
  imageCaption: "Aerial view — Cascade Residences",
} as const;

export const residences = {
  index: "04",
  label: "The Residences",
  /** Brochure, page 11 section title (verbatim) */
  heading: "The Art of Space",
  /** Brochure, page 11 (verbatim) */
  body: [
    "Thoughtfully designed for modern living, each residence features generous interiors and a seamless flow between spaces. Open-concept layouts maximize natural light and ventilation, creating an atmosphere of comfort and tranquility, while expansive windows frame stunning views and refined finishes bring a sense of calm sophistication to everyday life.",
    "Each home reflects a balance between contemporary design and natural harmony. Intelligent spatial planning enhances privacy and functionality, while subtle details — from material selection to lighting — create an environment that feels both elevated and effortlessly livable.",
  ],
  /** Room names exactly as captioned in the brochure, pages 12–18 */
  rooms: [
    { label: "Living Room", image: "/images/living.jpg" },
    { label: "Kitchen", image: "/images/kitchen.jpg" },
    { label: "Primary Bedroom", image: "/images/bedroom.jpg" },
    { label: "Primary Ensuite", image: "/images/master-bath.jpg" },
    { label: "Balcony", image: "/images/balcony.jpg" },
    { label: "Primary Balcony", image: "/images/balcony-master.jpg" },
    { label: "Office", image: "/images/study.jpg" },
  ],
  furniture: {
    /** Brochure, page 22 (verbatim) */
    heading: "Curated Furniture Package",
    tagline: "A carefully selected furniture collection designed to complement Cascade's architectural language.",
    body: "The optional furniture package has been thoughtfully curated to complement Cascade's natural material palette and contemporary architecture. Every piece has been selected to create a cohesive interior, allowing residents to enjoy a fully furnished home with the same level of quality, comfort, and understated elegance found throughout the development.",
  },
} as const;

export const virtualTour = {
  index: "05",
  label: "Virtual Tour",
  heading: "Step Inside",
  body: "Walk through the residence room by room, from the living spaces to the balcony views, wherever you are.",
  /** Paste the tour's embed URL here (e.g. a Matterport share link). Empty shows the placeholder. */
  embedUrl: "",
  poster: "/images/kitchen.jpg",
} as const;

export const floorPlans = {
  index: "06",
  label: "Building Levels",
  heading: "Building Levels",
  intro:
    "Cascade rises across four levels, from the ground floor to the third floor. Each level holds eight residences arranged along a central corridor, framed by balconies, planters and open views.",
  /** Technical drawings supplied by the architects; units read from each drawing */
  levels: [
    { id: "A", name: "Level A", floor: "Ground Floor", units: "A01 – A08", image: "/images/levels/level-a.jpg" },
    { id: "B", name: "Level B", floor: "First Floor", units: "B01 – B08", image: "/images/levels/level-b.jpg" },
    { id: "C", name: "Level C", floor: "Second Floor", units: "C01 – C08", image: "/images/levels/level-c.jpg" },
    { id: "D", name: "Level D", floor: "Third Floor", units: "D01 – D08", image: "/images/levels/level-d.jpg" },
  ],
  unitsLabel: "Residences",
  note: "Architectural drawings for illustration. Dimensions and final specifications available on request.",
  openLabel: "View full drawing",
  cta: "Request Full Plans",
} as const;

export const apartmentPlan = {
  index: "08",
  label: "Apartment Floor Plan",
  heading: "Apartment Floor Plan",
  intro:
    "Every residence at Cascade shares a single, carefully resolved plan: open living at its heart, private suites at either end, and balconies that carry each room out towards the view.",
  image: "/images/apartment-plan.webp",
  /** Read directly from the floor plan render; no dimensions are stated in the source material */
  features: [
    "Primary suite with private balcony and plunge pool",
    "Primary walk-in wardrobe and double-vanity ensuite",
    "Second bedroom with ensuite, wardrobe and its own balcony",
    "Open living and dining opening onto the main balcony",
    "Kitchen with island seating",
    "Dedicated office",
    "Laundry",
  ],
  note: "Illustrative layout. Dimensions and final specifications available on request.",
  cta: "Request Full Plans",
} as const;

export const amenities = {
  index: "07",
  label: "Amenities",
  /** Brochure, page 5 section title (verbatim) */
  heading: "Amenities",
  /** Brochure, page 5 — all five items verbatim, each paired with its render */
  items: [
    {
      name: "Pool",
      description: "Leisure pool with lounge area and deck.",
      image: "/images/pool.jpg",
      alt: "Leisure pool with waterfall feature, cabanas and sun loungers",
    },
    {
      name: "Fitness Centre",
      description: "Equipped gym for everyday training.",
      image: "/images/gym.jpg",
      alt: "Fitness centre with training equipment",
    },
    {
      name: "Gardens and Lagoons",
      description:
        "Integrated gardens with water features connecting the pool, fitness centre, and lagoon spaces.",
      image: "/images/rear.jpg",
      alt: "Landscaped tropical gardens and walkways at the rear of the building",
    },
    {
      name: "24-Hour Reception",
      description: "Continuous support and resident assistance.",
      image: "/images/lobby.jpg",
      alt: "Double-height lobby with stone reception desk",
    },
    {
      name: "Gated Security",
      description: "Controlled entrance with 24-hour monitoring.",
      image: "/images/guard-house.jpg",
      alt: "Gated entrance and guard house",
    },
  ],
} as const;

export type GalleryCategory = "Exterior" | "Amenities" | "Interiors" | "Plans";

export const projectGallery = {
  label: "Gallery",
  heading: "Cascade in Detail",
  intro:
    "Every render and drawing of Cascade Residences in one place: the architecture, the amenities, the interiors and the plans.",
  categories: ["Exterior", "Amenities", "Interiors", "Plans"] as GalleryCategory[],
  /** All project imagery: renders from /IMAGES plus the architectural drawings */
  items: [
    { src: "/images/front.jpg", caption: "Front Elevation", category: "Exterior" },
    { src: "/images/rear.jpg", caption: "Rear Elevation", category: "Exterior" },
    { src: "/images/entry.jpg", caption: "Entrance", category: "Exterior" },
    { src: "/images/guard-house.jpg", caption: "Gated Entrance", category: "Exterior" },
    { src: "/images/pool.jpg", caption: "Leisure Pool", category: "Amenities" },
    { src: "/images/lobby.jpg", caption: "Lobby", category: "Amenities" },
    { src: "/images/gym.jpg", caption: "Fitness Centre", category: "Amenities" },
    { src: "/images/living.jpg", caption: "Living Room", category: "Interiors" },
    { src: "/images/kitchen.jpg", caption: "Kitchen", category: "Interiors" },
    { src: "/images/bedroom.jpg", caption: "Primary Bedroom", category: "Interiors" },
    { src: "/images/master-bath.jpg", caption: "Primary Ensuite", category: "Interiors" },
    { src: "/images/balcony.jpg", caption: "Balcony", category: "Interiors" },
    { src: "/images/balcony-master.jpg", caption: "Primary Balcony", category: "Interiors" },
    { src: "/images/study.jpg", caption: "Office", category: "Interiors" },
    { src: "/images/apartment-plan.webp", caption: "Apartment Floor Plan", category: "Plans" },
    { src: "/images/levels/level-a.jpg", caption: "Level A — Ground Floor", category: "Plans" },
    { src: "/images/levels/level-b.jpg", caption: "Level B — First Floor", category: "Plans" },
    { src: "/images/levels/level-c.jpg", caption: "Level C — Second Floor", category: "Plans" },
    { src: "/images/levels/level-d.jpg", caption: "Level D — Third Floor", category: "Plans" },
  ] as { src: string; caption: string; category: GalleryCategory }[],
  back: "Back to home",
} as const;

export const film = {
  index: "09",
  label: "Film",
  heading: "The Cascade Film",
  description:
    "A cinematic introduction to the architecture, interiors and amenities of Cascade Residences.",
  poster: "/images/rear.jpg",
  src: "/video/cascade-film.mp4",
  duration: "1:46",
} as const;

export const ownership = {
  index: "03",
  label: "Ownership",
  /** Adapted — positioning only. No financial claims: none exist in the source materials. */
  heading: "A residence ready to be lived in",
  /** Brochure, page 22 (verbatim) */
  body: "A fully furnished home with the same level of quality, comfort, and understated elegance found throughout the development — supported by 24-hour reception, gated security with continuous monitoring, and resort amenities set within integrated gardens and lagoons.",
  points: [
    "Optional curated furniture package",
    "24-hour reception and resident assistance",
    "Controlled entrance with 24-hour monitoring",
    "Leisure pool, fitness centre and gardens",
  ],
  image: "/images/balcony.jpg",
  cta: "Request Details",
} as const;

export const contact = {
  index: "10",
  label: "Enquiries",
  /** Brochure, page 27 (verbatim) */
  heading: "Connect with us",
  description:
    "Complete the form and the full Cascade Residences brochure will be sent to your email, along with the details of the project.",
  image: "/images/living.jpg",
  submitLabel: "Request Brochure",
  successMessage:
    "Thank you. The Cascade Residences brochure is on its way to your inbox — a member of our team will be in touch shortly.",
  formNote: "Front-end only in this build. Connect to a form handler or CRM before launch.",
  virtualTour: "Virtual Tour — Coming Soon",
  interests: ["Investment", "Primary residence", "Second home"],
} as const;

export const footer = {
  /** Brochure disclaimer, page 20 (verbatim) */
  disclaimer:
    "Images are intended to illustrate the design direction. Final materials may vary by manufacturer while maintaining the same quality, specification, and design intent.",
  copyright: `© ${new Date().getFullYear()} Cascade Residences. Negril, Jamaica.`,
} as const;

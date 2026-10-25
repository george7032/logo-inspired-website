export const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMG = {
  mara: "1516426122078-c23e76319801",
  amboseli: "1547471080-7cc2caa01a7e",
  zebra: "1523805009345-7448845a9e53",
  elephants: "1535941339077-2dd1c7963098",
  beach: "1507525428034-b723cf961d3e",
  mountain: "1489392191049-fc10c97e64b6",
  hike: "1504432842672-1a79f78e4084",
  pool: "1566073771259-6a8506099945",
  resort: "1520250497591-112f2f40a3f4",
  family: "1511632765486-a01980e01a18",
  romance: "1519741497674-611481863552",
  conference: "1540575467063-178a50c2df87",
  car: "1494976388531-d1058494cdd8",
  lion: "1549366021-9f761d450615",
  giraffe: "1534177616072-ef7dc120449d",
  culture: "1612892483236-52d32a0e0ac1",
  camp: "1504173010664-32509aeebb62",
  food: "1493246507139-91e8fad9978e",
};

export const WHATSAPP = "254799034311";
export const PHONE = "+254 799 034311";
export const waLink = (msg = "Hi, I'd like to enquire about a trip.") => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/** Displayed on the site; mailto links send to EMAIL_TO (the Gmail inbox). */
export const EMAIL = "info@parkkridonellytour.co.ke";
export const EMAIL_TO = "parkkridonellytoursltd@gmail.com";
export const SOCIALS = [
  { label: "TikTok", href: "https://www.tiktok.com/@parkkridonellytoursltd" },
  { label: "Instagram", href: "https://www.instagram.com/parkkridonellytoursltd/" },
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61595773615573" },
] as const;

export type TourType = "Bespoke" | "Group Departure" | "Day Trip" | "Multi-Day Safari";
export type Pkg = {
  slug: string; title: string; type: TourType; destination: string; days: number; priceFrom: number;
  image: string; style: string; badge?: string; rating: number; summary: string;
  highlights: string[]; included: string[]; notIncluded: string[]; bestFor: string; flexibility: string;
  itinerary: { day: string; text: string }[]; gallery: string[]; accommodation: string;
};

const baseNot = ["International flights", "Visa / eTA fees", "Tips and gratuities", "Drinks and personal items"];

export const packages: Pkg[] = [
  {
    slug: "3-day-maasai-mara-classic-safari", title: "3-Day Maasai Mara Classic Safari", type: "Multi-Day Safari", destination: "Maasai Mara", days: 3, priceFrom: 650,
    image: IMG.mara, style: "Family", badge: "Best Seller", rating: 4.9,
    summary: "Kenya's most famous reserve in three unforgettable days: big cats, vast herds and golden savanna sunsets.",
    highlights: ["Big Five game drives", "Great Migration (Jul-Oct)", "Optional Maasai village visit", "Sunset over the Mara plains"],
    included: ["4x4 safari transport with pop-up roof", "Licensed English-speaking guide", "2 nights lodge accommodation", "All meals on safari", "Park entry fees", "Bottled water in the vehicle"],
    notIncluded: [...baseNot, "Hot air balloon safari (optional)"],
    bestFor: "First-time safari-goers, families and wildlife photographers.",
    flexibility: "Available as a group departure or a private tour, any day of the year.",
    itinerary: [
      { day: "Day 1: Nairobi to Maasai Mara", text: "Morning pickup in Nairobi, drive via the Great Rift Valley viewpoint. Lunch at the lodge, then an afternoon game drive." },
      { day: "Day 2: Full day in the Mara", text: "Full-day game drive with picnic lunch by the Mara River, searching for lions, leopards, cheetahs and the migration crossings." },
      { day: "Day 3: Mara to Nairobi", text: "Early morning game drive, breakfast, then drive back to Nairobi arriving late afternoon." },
    ],
    gallery: [IMG.mara, IMG.lion, IMG.zebra, IMG.elephants],
    accommodation: "Comfortable mid-range tented lodge near the reserve gate, with en-suite tents, hot showers and a dining area overlooking the plains. Luxury upgrades available.",
  },
  {
    slug: "amboseli-kilimanjaro-views", title: "Amboseli & Kilimanjaro Views", type: "Multi-Day Safari", destination: "Amboseli", days: 2, priceFrom: 480,
    image: IMG.amboseli, style: "Romantic", rating: 4.8,
    summary: "Huge elephant herds walking beneath snow-capped Kilimanjaro, Africa's tallest peak.",
    highlights: ["Big tusker elephants", "Kilimanjaro sunrise", "Observation Hill", "Swamp birdlife"],
    included: ["4x4 transport", "Licensed guide", "1 night lodge", "All meals", "Park fees"], notIncluded: baseNot,
    bestFor: "Photographers and couples.", flexibility: "Private or group, daily departures.",
    itinerary: [{ day: "Day 1: Nairobi to Amboseli", text: "Drive south, lunch at the lodge and an afternoon game drive." }, { day: "Day 2: Amboseli to Nairobi", text: "Sunrise drive with Kilimanjaro views, then return to Nairobi." }],
    gallery: [IMG.amboseli, IMG.elephants, IMG.giraffe], accommodation: "Lodge with Kilimanjaro views and a swimming pool.",
  },
  {
    slug: "samburu-wildlife-escape", title: "Samburu Wildlife Escape", type: "Multi-Day Safari", destination: "Samburu", days: 3, priceFrom: 720,
    image: IMG.giraffe, style: "Adventure", rating: 4.7,
    summary: "Discover the rare 'Samburu Special Five' in Kenya's wild north.",
    highlights: ["Reticulated giraffe & Grevy's zebra", "Ewaso Nyiro river", "Samburu culture", "Leopard sightings"],
    included: ["4x4 transport", "Licensed guide", "2 nights lodge", "All meals", "Park fees"], notIncluded: baseNot,
    bestFor: "Repeat safari-goers wanting something different.", flexibility: "Private tour, any dates.",
    itinerary: [{ day: "Day 1: Nairobi to Samburu", text: "Drive north past Mt Kenya; evening game drive." }, { day: "Day 2: Samburu", text: "Morning and afternoon game drives, optional village visit." }, { day: "Day 3: Return", text: "Morning drive and return to Nairobi." }],
    gallery: [IMG.giraffe, IMG.zebra, IMG.culture], accommodation: "Riverside tented lodge.",
  },
  {
    slug: "diani-beach-extension", title: "Diani Beach Extension", type: "Bespoke", destination: "Coast", days: 4, priceFrom: 540,
    image: IMG.beach, style: "Romantic", badge: "Private Tour", rating: 4.8,
    summary: "Unwind on white sand after your safari, with turquoise water and coral reefs.",
    highlights: ["White-sand beaches", "Snorkelling at Kisite", "Dhow sunset cruise", "Colobus monkeys"],
    included: ["Flight or SGR ticket", "Airport transfers", "3 nights beach resort", "Breakfast and dinner"], notIncluded: baseNot,
    bestFor: "Honeymooners and families.", flexibility: "Fully customisable dates and hotel.",
    itinerary: [{ day: "Day 1: Fly to Ukunda", text: "Transfer to your beach resort." }, { day: "Days 2-3: Beach & excursions", text: "Relax or join snorkelling and dhow trips." }, { day: "Day 4: Depart", text: "Transfer to the airport." }],
    gallery: [IMG.beach, IMG.resort, IMG.pool], accommodation: "Beachfront resort.",
  },
  {
    slug: "mara-group-departure", title: "Maasai Mara Group Departure", type: "Group Departure", destination: "Maasai Mara", days: 4, priceFrom: 590,
    image: IMG.lion, style: "Family", badge: "Group Departure", rating: 4.7,
    summary: "Join a small, friendly group on fixed dates for the best value Mara safari.",
    highlights: ["Shared 4x4 (max 7)", "Fixed weekly dates", "Great value", "Meet fellow travellers"],
    included: ["Shared 4x4", "Guide", "3 nights camp", "All meals", "Park fees"], notIncluded: baseNot,
    bestFor: "Solo travellers and budget-conscious groups.", flexibility: "Fixed departure dates every Monday and Thursday.",
    itinerary: [{ day: "Day 1", text: "Nairobi to Mara." }, { day: "Days 2-3", text: "Full-day game drives." }, { day: "Day 4", text: "Return to Nairobi." }],
    gallery: [IMG.lion, IMG.mara, IMG.camp], accommodation: "Comfortable permanent tented camp.",
  },
  {
    slug: "nairobi-national-park-day-trip", title: "Nairobi National Park Day Trip", type: "Day Trip", destination: "Nairobi", days: 1, priceFrom: 120,
    image: IMG.zebra, style: "Family", rating: 4.6,
    summary: "Wildlife with a city skyline backdrop, just 20 minutes from the CBD.",
    highlights: ["Rhinos and lions", "Skyline views", "Ideal for layovers"],
    included: ["Hotel pickup", "Guide", "Park fees", "Water"], notIncluded: baseNot,
    bestFor: "Business travellers and layovers.", flexibility: "Half-day or full-day, daily.",
    itinerary: [{ day: "Morning / afternoon", text: "Pickup, 4-hour game drive, drop-off." }],
    gallery: [IMG.zebra, IMG.giraffe], accommodation: "No overnight stay.",
  },
  {
    slug: "giraffe-centre-karen-day-tour", title: "Giraffe Centre & Karen Day Tour", type: "Day Trip", destination: "Nairobi", days: 1, priceFrom: 95,
    image: IMG.giraffe, style: "Cultural", badge: "Best Seller", rating: 4.8,
    summary: "Feed giraffes, visit baby elephants and explore Karen Blixen's home.",
    highlights: ["Giraffe Centre", "Elephant orphanage", "Karen Blixen Museum", "Kazuri beads"],
    included: ["Transport", "Guide", "Entry fees", "Lunch"], notIncluded: baseNot,
    bestFor: "Families with children.", flexibility: "Daily, private or shared.",
    itinerary: [{ day: "Full day", text: "Elephant orphanage at 11am, lunch, Giraffe Centre and museum." }],
    gallery: [IMG.giraffe, IMG.elephants, IMG.culture], accommodation: "No overnight stay.",
  },
  {
    slug: "7-day-kenya-grand-safari", title: "7-Day Kenya Grand Safari", type: "Bespoke", destination: "Multiple", days: 7, priceFrom: 1850,
    image: IMG.elephants, style: "Adventure", badge: "Private Tour", rating: 5,
    summary: "Samburu, Lake Nakuru, Maasai Mara and Amboseli in one tailor-made journey.",
    highlights: ["Four top parks", "Flamingos at Nakuru", "Private vehicle", "Tailored lodges"],
    included: ["Private 4x4", "Guide", "6 nights lodges", "All meals", "Park fees"], notIncluded: baseNot,
    bestFor: "Travellers wanting the complete Kenya experience.", flexibility: "Fully customisable route and lodges.",
    itinerary: [{ day: "Days 1-2: Samburu", text: "Northern wildlife." }, { day: "Day 3: Lake Nakuru", text: "Rhinos and flamingos." }, { day: "Days 4-5: Maasai Mara", text: "Big cats and migration." }, { day: "Days 6-7: Amboseli", text: "Elephants and Kilimanjaro, return to Nairobi." }],
    gallery: [IMG.elephants, IMG.mara, IMG.amboseli, IMG.giraffe], accommodation: "Hand-picked lodges at every stop.",
  },
];

export const testimonials = [
  { name: "Sarah M.", country: "🇬🇧 United Kingdom", text: "Our Mara safari was beyond anything we imagined. Our guide spotted a leopard on day one!" },
  { name: "Daniel K.", country: "🇺🇸 United States", text: "Everything was seamless, from the airport pickup to the beach extension. True professionals." },
  { name: "Lea B.", country: "🇩🇪 Germany", text: "They planned our honeymoon down to the last detail. The bush dinner was magical." },
];

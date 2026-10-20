import { IMG } from "./packages";

export type Exp = {
  slug: "adventure" | "cultural" | "romantic" | "corporate"; title: string; tagline: string; image: string;
  items: { title: string; text: string; image: string }[];
  included: string; bestFor: string; flexibility: string;
  testimonial: { name: string; country: string; text: string };
};

export const experiences: Exp[] = [
  {
    slug: "adventure", title: "Adventure & Outdoor", tagline: "Trek mountains, camp under the stars and chase your adrenaline across Kenya.", image: IMG.hike,
    items: [
      { title: "Mount Kenya Trek", text: "4-5 day climb to Point Lenana through bamboo forest and alpine moorland.", image: IMG.mountain },
      { title: "Mt Longonot Day Hike", text: "Hike the rim of a dormant volcano with Rift Valley views.", image: IMG.hike },
      { title: "Aberdares Camping", text: "Waterfalls, forest trails and wild camping in the Aberdare highlands.", image: IMG.camp },
      { title: "Coast Water Sports", text: "Kitesurfing, diving and snorkelling along the Diani coast.", image: IMG.beach },
    ],
    included: "Certified mountain guides, camping gear, park fees and meals.", bestFor: "Active travellers and outdoor lovers.", flexibility: "Private or small-group, any fitness level.",
    testimonial: { name: "Tom R.", country: "🇦🇺 Australia", text: "Summiting Point Lenana at sunrise was the highlight of my life. Brilliant guides." },
  },
  {
    slug: "cultural", title: "Cultural & Community", tagline: "Meet the people, taste the food and hear the stories behind Kenya.", image: IMG.culture,
    items: [
      { title: "Maasai Community Visit", text: "Spend a day in a Maasai homestead, learning traditions and beadwork.", image: IMG.culture },
      { title: "Nairobi Heritage Walk", text: "Guided walk through historic downtown Nairobi and its markets.", image: IMG.giraffe },
      { title: "Swahili Food Trail & Cooking Class", text: "Cook pilau and biryani with local chefs on the coast.", image: IMG.food },
    ],
    included: "Local hosts, community fees, transport and tastings.", bestFor: "Curious travellers, students and families.", flexibility: "Half-day to multi-day, add to any safari.",
    testimonial: { name: "Aiko S.", country: "🇯🇵 Japan", text: "The Samburu village visit was respectful, genuine and deeply moving." },
  },
  {
    slug: "romantic", title: "Romantic & Milestone Getaways", tagline: "Honeymoons, anniversaries and vow renewals, beautifully arranged.", image: IMG.romance,
    items: [
      { title: "Bush Honeymoon", text: "Secluded tented suite, private game drives and champagne sundowners.", image: IMG.camp },
      { title: "Private Bush Dinner", text: "A candlelit dinner under the stars, just the two of you.", image: IMG.romance },
      { title: "Beach Vow Renewal", text: "Barefoot ceremony on Diani's white sands.", image: IMG.beach },
    ],
    included: "Private setups, decor, champagne and dedicated host.", bestFor: "Couples celebrating something special.", flexibility: "Every detail tailored to you.",
    testimonial: { name: "Lea B.", country: "🇩🇪 Germany", text: "They planned our honeymoon down to the last detail. The bush dinner was magical." },
  },
  {
    slug: "corporate", title: "Corporate & MICE", tagline: "Retreats, team-building, conferences and incentive trips that inspire.", image: IMG.conference,
    items: [
      { title: "Executive Retreats", text: "Strategy sessions at a safari lodge with game drives in between.", image: IMG.resort },
      { title: "Team-Building Outings", text: "Hikes, challenges and cultural activities for teams of any size.", image: IMG.hike },
      { title: "Conference Logistics", text: "Venues, delegate transfers, accommodation and on-site coordination.", image: IMG.conference },
      { title: "Incentive Trips", text: "Reward top performers with an unforgettable Kenya experience.", image: IMG.elephants },
    ],
    included: "Event planning, venues, transport, accommodation and on-site staff.", bestFor: "Companies, NGOs and associations.", flexibility: "Groups from 5 to 500.",
    testimonial: { name: "Grace W.", country: "🇰🇪 Kenya", text: "Our 60-person retreat in Naivasha ran perfectly from start to finish." },
  },
];

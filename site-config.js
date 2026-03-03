// site-config.js
// Single source of truth for the website content.
// Update this file and the whole site updates.

window.SITE = {
  brand: {
    name: "Travana Tacos",
    city: "Rochester, NY",
    tagline: "One taco. Done right. Built for speed. Priced for everyone.",
    mantra: "Mastery is knowing what to leave out.",
    logoSrc: "/images/TravanaLogo.png",
    logoAlt: "Travana Tacos logo"
  },

  operations: {
    cardOnly: true,
    // Flip to true once you're actively serving and updating today's location.
    inOperation: false
  },

  banner: {
    enabled: true,
    line1: "Travana Tacos is not currently in operation.",
    line2:
      "First event: Rochester Lilac Festival (May 8–17, 2026). Serving every Friday, Saturday & Sunday — all day."
  },

  firstEvent: {
    name: "Rochester Lilac Festival",
    dates: "May 8–17, 2026",
    servingSchedule:
      "Serving every Friday, Saturday & Sunday during the festival (May 8–10 and May 15–17) — all day.",
    locationName: "Highland Park",
    address: "1440 South Ave, Rochester, NY 14620",
    admission: "Free admission (some activities may require tickets).",
    highlights:
      "Over 1,200 lilac bushes, the Lilac Parade, Lilac 5K/10K, and 10 days of free concerts.",
    music:
      "Over 80 bands perform at the KeyBank Center Stage. Headliners include Cimafunk, Lee Fields, and The Lone Bellow.",
    parkingTransit:
      "Parking is available at the Main Lot on Elmwood Ave, with free shuttles available from remote designated lots.",
    link: "https://roclilacfest.com/",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Highland+Park+1440+South+Ave+Rochester+NY+14620"
  },

  contact: {
    instagramHandle: "TravanaTacos",
    email: "travis.woods@travanatacos.com",
    phone: "" // leave blank for now
  },

  // "Today" location shown on Home + Find Us (manual update for now).
  // Tip: when you go live, set operations.inOperation=true and update these 3 fields.
  today: {
    status: "Not posted yet",
    hours: "TBD",
    maps: "https://www.google.com/maps/search/?api=1&query=Rochester+NY"
  },

  menu: {
    featuredItemName: "Quesabirria Tacos (Box of 3)",
    featuredItemDesc:
      "We built the whole stand around doing one thing extremely well: crispy, cheesy quesabirria tacos with rich consomé for dipping.",
    includes: [
      "Box of 3 crispy quesabirria tacos",
      "Consomé for dipping",
      "Onion + cilantro (when available)",
      "Lime wedges (when available)"
    ],
    addOns: ["Extra consomé (TBD)", "Extra cheese (TBD)", "Extra tacos (TBD)"],
    drinks: [
      "Aldi PurAqua flavored sparkling water (0 sugar) — flavors vary",
      "Aldi PurAqua flavored water (low/zero sugar) — flavors vary",
      "Bottled water"
    ],
    pricingNote:
      "Pricing will be posted before our first event. The whole point of a tight menu is speed + consistency — and savings passed to you."
  },

  // Images. Replace with real photos as you upload them to /images.
  images: {
    hero1: "/images/BrandedTacos.png",
    hero2: "https://placehold.co/1200x800/png?text=Add+a+real+taco+photo+here",
    about1: "/images/BrandedTacos.png",
    about2:
      "https://placehold.co/1200x800/png?text=Add+a+behind-the-scenes+photo"
  }
};

import type { Service } from "@/lib/site";

const allServices: Service[] = [
  {
    slug: "photo-frames",
    title: "Photo Frames",
    shortDescription: "Customized photo frames for home, office, gifts and special memories.",
    description:
      "Customised photo frames for home, office, gifts and special memories. Choose from a wide range of sizes and finishes with clear, long-lasting prints that keep your moments looking their best.",
    image: "/images/photoframe.png",
    alt: "Framed Lord Ganesha artwork displayed in a home",
    points: ["Multiple sizes and shapes", "Home, office and gifting options", "Clear, long-lasting prints"],
    premium: true,
    gallery: [
      { image: "/images/gallery/frame-table.webp", alt: "Photo frame placed on a wooden table" },
      { image: "/images/gallery/frame-hand.webp", alt: "Photo frame held in hand" },
      { image: "/images/gallery/photo-collage.webp", alt: "Photo collage of printed pictures on a wall" },
      { image: "/images/gallery/portrait-prints.webp", alt: "Printed portrait photographs" },
      { image: "/images/services/photo-printing-user.png", alt: "Printed photo keepsakes arranged on a table" },
      { image: "/images/services/gift-articles.webp", alt: "Customised printed mug gift article" },
      { image: "/images/gifts/personalized.webp", alt: "Wrapped personalised gift box" },
      { image: "/images/gallery/printing-machine.webp", alt: "Printing machine in a print studio" },
    ],
  },
  {
    slug: "id-cards",
    title: "ID Cards",
    shortDescription: "Professional ID cards for schools, colleges, offices, organizations and events.",
    description:
      "Professional ID cards for schools, colleges, offices, organizations and events. Crisp printing, durable card material and clean finishing with lanyards and protective sleeves on request.",
    points: ["Schools, colleges and offices", "Event and staff ID cards", "Lanyards and sleeves available"],
    image: "/images/services/id-cards-user.png",
    alt: "Printed staff ID cards with colorful lanyards",
    gallery: [
      { image: "/images/gallery/id-badge.webp", alt: "Printed ID badge card" },
      { image: "/images/services/visiting-cards-user.png", alt: "Black and gold business cards with a butterfly logo" },
      { image: "/images/hero/business-cards.webp", alt: "Matte black business cards printed for a professional brand" },
      { image: "/images/business/letterhead.webp", alt: "Printed letterhead and office stationery" },
      { image: "/images/services/stickers-labels-user.png", alt: "Sheets of custom blank product labels in different sizes" },
      { image: "/images/business/label.webp", alt: "Custom printed product label on packaging" },
      { image: "/images/gallery/cmyk-chart.webp", alt: "CMYK colour calibration chart used in printing" },
      { image: "/images/gallery/printing-machine.webp", alt: "Printing machine in a print studio" },
    ],
  },
  {
    slug: "wedding-cards",
    title: "Wedding Cards",
    shortDescription: "Beautiful wedding invitations designed and printed for your special day.",
    description:
      "Beautiful wedding invitations designed and printed for your special day. Traditional Indian designs, modern layouts and premium invitation styles printed on quality paper with elegant finishing.",
    points: ["Traditional Indian wedding cards", "Modern wedding cards", "Premium invitation designs"],
    image: "/images/wedding-invitation-premium.jpg",
    alt: "Premium Indian wedding invitation cards with traditional red and gold designs",
    premium: true,
    gallery: [
      { image: "/images/wedding/invitation-large.webp", alt: "Traditional Indian wedding invitation card printed with fine detailing" },
      { image: "/images/wedding/traditional.webp", alt: "Ornate traditional wedding card with decorative border" },
      { image: "/images/wedding/modern.webp", alt: "Modern wedding invitation card with matching envelope" },
      { image: "/images/wedding/gold.webp", alt: "Premium wedding invitation with golden detailing and ring" },
      { image: "/images/wedding/envelope.webp", alt: "Wedding invitation suite arranged on fabric" },
      { image: "/images/hero/invitation-suite.webp", alt: "Printed wedding invitation cards and envelopes on a table" },
      { image: "/images/about/wedding-cards.webp", alt: "Elegant wedding invitation set featuring a peacock design and white orchids on a marble background" },
      { image: "/images/hero/printing-press.webp", alt: "Printing press with coloured ink rollers inside a print studio" },
    ],
  },
  {
    slug: "pamphlets",
    title: "Pamphlets",
    shortDescription: "Attractive promotional pamphlets for businesses, events, offers and campaigns.",
    description:
      "Attractive promotional pamphlets for businesses, events, offers and campaigns. Bright colours, readable layouts and quick turnaround for leaflets, handbills and campaign material.",
    points: ["Offers and promotions", "Events and campaigns", "Single side and double side printing"],
    image: "/images/services/brochures-user.png",
    alt: "Stack of photography brochures featuring event and portrait imagery",
    gallery: [
      { image: "/images/gallery/leaflet.webp", alt: "Colourful printed leaflet held in hand" },
      { image: "/images/business/flyer.webp", alt: "Printed flyer with folded design" },
      { image: "/images/services/brochures.webp", alt: "Folded professional brochure with printed artwork" },
      { image: "/images/business/poster.webp", alt: "Printed promotional poster mounted on a wall" },
      { image: "/images/gallery/posters-room.webp", alt: "Wall covered with printed posters" },
      { image: "/images/services/banners-posters.webp", alt: "Large printed advertising banners and posters on a building" },
      { image: "/images/hero/printing-press.webp", alt: "Printing press with coloured ink rollers inside a print studio" },
      { image: "/images/about/studio.webp", alt: "Colourful printing paper stacks inside a printing studio" },
    ],
  },
  {
    slug: "brochures",
    title: "Brochures",
    shortDescription: "Professional brochures that present your business, products and services beautifully.",
    description:
      "Professional brochures that present your business, products and services beautifully. Bi-fold and tri-fold layouts with balanced design, sharp images and quality paper stock.",
    points: ["Bi-fold and tri-fold options", "Product and service catalogues", "Quality paper and finishing"],
    image: "/images/services/brochures.webp",
    alt: "Tri-fold brochures printed for a business",
    gallery: [
      { image: "/images/hero/brochures.webp", alt: "Printed brochures and paper samples arranged on a surface" },
      { image: "/images/services/pamphlets.webp", alt: "Folded pamphlets and promotional leaflets stacked together" },
      { image: "/images/gallery/leaflet.webp", alt: "Colourful printed leaflet held in hand" },
      { image: "/images/business/flyer.webp", alt: "Printed flyer with folded design" },
      { image: "/images/business/letterhead.webp", alt: "Printed letterhead and office stationery" },
      { image: "/images/services/visiting-cards-user.png", alt: "Black and gold business cards with a butterfly logo" },
      { image: "/images/hero/business-cards.webp", alt: "Matte black business cards printed for a professional brand" },
      { image: "/images/gallery/printing-machine.webp", alt: "Printing machine in a print studio" },
    ],
  },
  {
    slug: "visiting-cards",
    title: "Visiting Cards",
    shortDescription: "Professional visiting cards that create a strong first impression.",
    description:
      "Professional visiting cards that create a strong first impression. Clean layouts, premium paper choices and matte or glossy finishing for businesses, professionals and personal use.",
    points: ["Premium card paper", "Matte and glossy finishing", "Business and personal use"],
    image: "/images/services/visiting-cards-user.png",
    alt: "Black and gold business cards with a butterfly logo",
    gallery: [
      { image: "/images/hero/business-cards.webp", alt: "Matte black business cards printed for a professional brand" },
      { image: "/images/business/letterhead.webp", alt: "Printed letterhead and office stationery" },
      { image: "/images/business/flyer.webp", alt: "Printed flyer with folded design" },
      { image: "/images/business/label.webp", alt: "Custom printed product label on packaging" },
      { image: "/images/services/stickers-labels-user.png", alt: "Sheets of custom blank product labels in different sizes" },
      { image: "/images/services/brochures.webp", alt: "Folded professional brochure with printed artwork" },
      { image: "/images/services/pamphlets.webp", alt: "Folded pamphlets and promotional leaflets stacked together" },
      { image: "/images/gallery/cmyk-chart.webp", alt: "CMYK colour calibration chart used in printing" },
    ],
  },
  {
    slug: "banners-posters",
    title: "Banners & Posters",
    shortDescription: "High-quality banners and posters for promotions, events and advertisements.",
    description:
      "High-quality banners and posters for promotions, events and advertisements. Bold colours and sharp text that stay visible from a distance, in the sizes your space needs.",
    points: ["Promotional and event material", "Custom sizes", "Indoor and outdoor options"],
    image: "/images/services/banners-posters.webp",
    alt: "Large printed banner and poster displayed for a promotion",
    gallery: [
      { image: "/images/business/poster.webp", alt: "Printed promotional poster mounted on a wall" },
      { image: "/images/gallery/posters-room.webp", alt: "Wall covered with printed posters" },
      { image: "/images/services/flex-vinyl.webp", alt: "Large format flex banner being printed on an industrial printer" },
      { image: "/images/hero/printing-press.webp", alt: "Printing press with coloured ink rollers inside a print studio" },
      { image: "/images/about/studio.webp", alt: "Colourful printing paper stacks inside a printing studio" },
      { image: "/images/gallery/color-swatches.webp", alt: "Colour swatch fan deck for print colour matching" },
      { image: "/images/gallery/cmyk-chart.webp", alt: "CMYK colour calibration chart used in printing" },
      { image: "/images/gallery/sticker-wall.webp", alt: "Assorted custom stickers displayed on a wall" },
    ],
  },
  {
    slug: "photo-printing",
    title: "Photo Printing",
    shortDescription: "Quality photo printing in different sizes for personal and professional use.",
    description:
      "Quality photo printing in different sizes for personal and professional use. Accurate colour, sharp detail and neat finishing for albums, portfolios, studio work and everyday prints.",
    points: ["All standard sizes", "Accurate colour reproduction", "Personal and professional prints"],
    image: "/images/services/photo-printing-user.png",
    alt: "Printed photo keepsakes arranged on a table",
    gallery: [
      { image: "/images/gallery/portrait-prints.webp", alt: "Printed portrait photographs" },
      { image: "/images/gallery/photo-collage.webp", alt: "Photo collage of printed pictures on a wall" },
      { image: "/images/gallery/frame-hand.webp", alt: "Photo frame held in hand" },
      { image: "/images/gallery/frame-table.webp", alt: "Photo frame placed on a wooden table" },
      { image: "/images/services/photo-frames.webp", alt: "Customised photo frame placed beside a flower vase" },
      { image: "/images/services/gift-articles.webp", alt: "Customised printed mug gift article" },
      { image: "/images/gifts/personalized.webp", alt: "Wrapped personalised gift box" },
      { image: "/images/gallery/color-swatches.webp", alt: "Colour swatch fan deck for print colour matching" },
    ],
  },
  {
    slug: "gift-articles",
    title: "Gift Articles",
    shortDescription: "Customized gift articles designed specially for your loved ones, events and businesses.",
    description:
      "Customised gift articles designed specially for your loved ones, events and businesses — mugs, keychains, photo gifts, customized bottles and other personalized gifts.",
    points: ["Mugs and keychains", "Photo gifts and bottles", "Personal and corporate gifting"],
    image: "/images/gift-articles-premium.png",
    alt: "Personalized red heart-shaped gift box with a keepsake ornament",
    premium: true,
    gallery: [
      { image: "/images/gifts/mugs-and-drinkware.png", alt: "Personalized mugs and drinkware gifts", title: "Mugs & Drinkware" },
      { image: "/images/gifts/personalized-gifts.png", alt: "Personalized photo frame gift", title: "Personalized Gifts" },
      { image: "/images/gifts/corporate-gifts.png", alt: "Corporate gift set with a notebook, pen and bottle", title: "Corporate Gifts" },
      { image: "/images/gifts/photo-frames.png", alt: "Personalized photo frames with scenic pictures", title: "Photo Frames" },
      { image: "/images/gifts/home-decor-gifts.png", alt: "Decorative home gifts with a Buddha figurine and candle holder", title: "Home Decor Gifts" },
      { image: "/images/gifts/trophies-and-awards.png", alt: "Trophy and crystal awards", title: "Trophies & Awards" },
      { image: "/images/gifts/gift-hampers.png", alt: "Personalized gift hamper with chocolates and keepsakes", title: "Gift Hampers" },
      { image: "/images/gifts/keychains-and-accessories.png", alt: "Personalized keychains and accessories", title: "Keychains & Accessories" },
    ],
  },
  {
    slug: "stickers-labels",
    title: "Stickers & Labels",
    shortDescription: "Custom stickers and labels for businesses, products, packaging and promotions.",
    description:
      "Custom stickers and labels for businesses, products, packaging and promotions. Die-cut shapes, branding stickers, product labels and packaging stickers printed to your size.",
    points: ["Die-cut and standard shapes", "Product and packaging labels", "Branding and promotional stickers"],
    image: "/images/services/stickers-labels-user.png",
    alt: "Sheets of custom blank product labels in different sizes",
    gallery: [
      { image: "/images/gallery/sticker-wall.webp", alt: "Assorted custom stickers displayed on a wall" },
      { image: "/images/business/label.webp", alt: "Custom printed product label on packaging" },
      { image: "/images/business/flyer.webp", alt: "Printed flyer with folded design" },
      { image: "/images/services/pamphlets.webp", alt: "Folded pamphlets and promotional leaflets stacked together" },
      { image: "/images/services/visiting-cards-user.png", alt: "Black and gold business cards with a butterfly logo" },
      { image: "/images/gallery/cmyk-chart.webp", alt: "CMYK colour calibration chart used in printing" },
      { image: "/images/gallery/color-swatches.webp", alt: "Colour swatch fan deck for print colour matching" },
      { image: "/images/gallery/printing-machine.webp", alt: "Printing machine in a print studio" },
    ],
  },
  {
    slug: "flex-vinyl-printing",
    title: "Flex & Vinyl Printing",
    shortDescription: "Durable large-format printing for shops, events, promotions and branding.",
    description:
      "Durable large-format printing for shops, events, promotions and branding. Flex boards, vinyl sheets and hoarding-style prints built to hold up indoors and outdoors.",
    points: ["Shop boards and hoardings", "Indoor and outdoor durability", "Large format output"],
    image: "/images/services/flex-vinyl.webp",
    alt: "Large-format flex banner printing for shop signage",
    gallery: [
      { image: "/images/services/banners-posters.webp", alt: "Large printed advertising banners and posters on a building" },
      { image: "/images/business/poster.webp", alt: "Printed promotional poster mounted on a wall" },
      { image: "/images/gallery/posters-room.webp", alt: "Wall covered with printed posters" },
      { image: "/images/hero/printing-press.webp", alt: "Printing press with coloured ink rollers inside a print studio" },
      { image: "/images/about/studio.webp", alt: "Colourful printing paper stacks inside a printing studio" },
      { image: "/images/gallery/sticker-wall.webp", alt: "Assorted custom stickers displayed on a wall" },
      { image: "/images/gallery/color-swatches.webp", alt: "Colour swatch fan deck for print colour matching" },
      { image: "/images/gallery/printing-machine.webp", alt: "Printing machine in a print studio" },
    ],
  },
  {
    slug: "all-printing",
    title: "All Types of Printing",
    shortDescription:
      "From personal printing to business requirements, we provide a wide range of customized printing solutions.",
    description:
      "From personal printing to business requirements, we provide a wide range of customized printing solutions. If it needs design or printing, bring the idea — we will find a way to print it.",
    image: "/images/services/all-printing.webp",
    alt: "Assorted printed material — cards, flyers, posters and banners produced by a print studio",
    featured: true,
    gallery: [
      { image: "/images/hero/printing-press.webp", alt: "Printing press with coloured ink rollers inside a print studio" },
      { image: "/images/about/studio.webp", alt: "Colourful printing paper stacks inside a printing studio" },
      { image: "/images/gallery/printing-machine.webp", alt: "Printing machine in a print studio" },
      { image: "/images/gallery/color-swatches.webp", alt: "Colour swatch fan deck for print colour matching" },
      { image: "/images/gallery/cmyk-chart.webp", alt: "CMYK colour calibration chart used in printing" },
      { image: "/images/hero/invitation-suite.webp", alt: "Printed wedding invitation cards and envelopes on a table" },
      { image: "/images/hero/business-cards.webp", alt: "Matte black business cards printed for a professional brand" },
      { image: "/images/services/gift-articles.webp", alt: "Customised printed mug gift article" },
    ],
  },
];

/**
 * Premium services are surfaced first across the site, in this exact order:
 * Wedding Cards, Photo Frames and Gift Articles. Every other service follows
 * in the order it is authored above.
 */
const premiumSlugs = ["wedding-cards", "photo-frames", "gift-articles"];

const premiumServices = premiumSlugs
  .map((slug) => allServices.find((service) => service.slug === slug))
  .filter((service): service is Service => Boolean(service));

export const services: Service[] = [
  ...premiumServices,
  ...allServices.filter((service) => !service.premium),
];

export const serviceCategories = services
  .filter((s) => !s.featured)
  .map((s) => ({ slug: s.slug, title: s.title }));

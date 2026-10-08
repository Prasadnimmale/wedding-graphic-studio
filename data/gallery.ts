export type GalleryCategory =
  | "wedding"
  | "frames"
  | "id-cards"
  | "visiting-cards"
  | "brochures"
  | "pamphlets"
  | "gifts"
  | "posters"
  | "printing";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  image: string;
  alt: string;
  /** Visual weight in the grid — "wide" items span two columns on large screens. */
  shape?: "normal" | "wide" | "tall";
};

export const galleryFilters: { key: "all" | GalleryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wedding", label: "Wedding Cards" },
  { key: "frames", label: "Frames" },
  { key: "id-cards", label: "ID Cards" },
  { key: "visiting-cards", label: "Visiting Cards" },
  { key: "brochures", label: "Brochures" },
  { key: "pamphlets", label: "Pamphlets" },
  { key: "gifts", label: "Gift Articles" },
  { key: "posters", label: "Posters" },
  { key: "printing", label: "Printing" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "wedding-traditional",
    title: "Traditional Wedding Invitation",
    category: "wedding",
    categoryLabel: "Wedding Cards",
    image: "/images/wedding/invitation-large.webp",
    alt: "Traditional Indian wedding invitation card printed with fine detailing",
    shape: "wide",
  },
  {
    id: "wedding-card-ornate",
    title: "Ornate Wedding Card",
    category: "wedding",
    categoryLabel: "Wedding Cards",
    image: "/images/wedding/traditional.webp",
    alt: "Ornate traditional wedding card with decorative border",
  },
  {
    id: "wedding-modern",
    title: "Modern Invitation Suite",
    category: "wedding",
    categoryLabel: "Wedding Cards",
    image: "/images/wedding/modern.webp",
    alt: "Modern wedding invitation card with matching envelope",
  },
  {
    id: "wedding-gold",
    title: "Premium Golden Invitation",
    category: "wedding",
    categoryLabel: "Wedding Cards",
    image: "/images/wedding/gold.webp",
    alt: "Premium wedding invitation with golden detailing and ring",
  },
  {
    id: "wedding-suite",
    title: "Complete Invitation Suite",
    category: "wedding",
    categoryLabel: "Wedding Cards",
    image: "/images/wedding/envelope.webp",
    alt: "Wedding invitation suite arranged on fabric",
  },
  {
    id: "wedding-card-clean",
    title: "Elegant Wedding Card",
    category: "wedding",
    categoryLabel: "Wedding Cards",
    image: "/images/services/wedding-cards.webp",
    alt: "Elegant wedding invitation card printed on premium paper",
  },

  {
    id: "frame-vase",
    title: "Custom Photo Frame",
    category: "frames",
    categoryLabel: "Frames",
    image: "/images/services/photo-frames.webp",
    alt: "Customised photo frame placed beside a flower vase",
  },
  {
    id: "frame-hand",
    title: "Framed Memory",
    category: "frames",
    categoryLabel: "Frames",
    image: "/images/gallery/frame-hand.webp",
    alt: "Photo frame held in hand",
  },
  {
    id: "frame-table",
    title: "Table Top Frame",
    category: "frames",
    categoryLabel: "Frames",
    image: "/images/gallery/frame-table.webp",
    alt: "Photo frame placed on a wooden table",
  },
  {
    id: "frame-collage",
    title: "Printed Photo Collage",
    category: "frames",
    categoryLabel: "Frames",
    image: "/images/gallery/photo-collage.webp",
    alt: "Photo collage of printed pictures on a wall",
    shape: "wide",
  },

  {
    id: "id-lanyard",
    title: "Staff ID Cards",
    category: "id-cards",
    categoryLabel: "ID Cards",
    image: "/images/services/id-cards.webp",
    alt: "Printed identity cards attached to lanyards",
  },
  {
    id: "id-badge",
    title: "Event ID Badge",
    category: "id-cards",
    categoryLabel: "ID Cards",
    image: "/images/gallery/id-badge.webp",
    alt: "Printed ID badge card",
  },

  {
    id: "visiting-marble",
    title: "Premium Visiting Cards",
    category: "visiting-cards",
    categoryLabel: "Visiting Cards",
    image: "/images/services/visiting-cards.webp",
    alt: "Set of premium visiting cards on a marble surface",
    shape: "wide",
  },
  {
    id: "visiting-black",
    title: "Matte Black Business Cards",
    category: "visiting-cards",
    categoryLabel: "Visiting Cards",
    image: "/images/hero/business-cards.webp",
    alt: "Matte black business cards printed for a professional brand",
  },

  {
    id: "brochure-fold",
    title: "Folded Business Brochure",
    category: "brochures",
    categoryLabel: "Brochures",
    image: "/images/services/brochures.webp",
    alt: "Folded professional brochure with printed artwork",
  },
  {
    id: "brochure-samples",
    title: "Brochure & Paper Samples",
    category: "brochures",
    categoryLabel: "Brochures",
    image: "/images/hero/brochures.webp",
    alt: "Printed brochures and paper samples arranged on a surface",
  },

  {
    id: "pamphlet-stack",
    title: "Promotional Pamphlets",
    category: "pamphlets",
    categoryLabel: "Pamphlets",
    image: "/images/services/pamphlets.webp",
    alt: "Folded pamphlets and promotional leaflets stacked together",
  },
  {
    id: "pamphlet-hand",
    title: "Colourful Leaflet",
    category: "pamphlets",
    categoryLabel: "Pamphlets",
    image: "/images/gallery/leaflet.webp",
    alt: "Colourful printed leaflet held in hand",
  },
  {
    id: "pamphlet-flyer",
    title: "Campaign Flyer",
    category: "pamphlets",
    categoryLabel: "Pamphlets",
    image: "/images/business/flyer.webp",
    alt: "Printed flyer with folded design",
  },

  {
    id: "gift-mug",
    title: "Printed Coffee Mug",
    category: "gifts",
    categoryLabel: "Gift Articles",
    image: "/images/services/gift-articles.webp",
    alt: "Customised printed mug gift article",
  },
  {
    id: "gift-keychain",
    title: "Custom Keychain",
    category: "gifts",
    categoryLabel: "Gift Articles",
    image: "/images/gifts/keychain.webp",
    alt: "Customised metal keychain gift",
  },
  {
    id: "gift-box",
    title: "Personalised Gift Box",
    category: "gifts",
    categoryLabel: "Gift Articles",
    image: "/images/gifts/personalized.webp",
    alt: "Wrapped personalised gift box",
  },
  {
    id: "gift-bottle",
    title: "Printed Bottle",
    category: "gifts",
    categoryLabel: "Gift Articles",
    image: "/images/gifts/bottle.webp",
    alt: "Printed personalised bottles",
  },
  {
    id: "gift-corporate",
    title: "Corporate Gifting",
    category: "gifts",
    categoryLabel: "Gift Articles",
    image: "/images/gifts/corporate.webp",
    alt: "Corporate gift boxes with printed branding",
  },

  {
    id: "poster-wall",
    title: "Printed Poster on Wall",
    category: "posters",
    categoryLabel: "Posters",
    image: "/images/business/poster.webp",
    alt: "Printed promotional poster mounted on a wall",
  },
  {
    id: "posters-room",
    title: "Poster Series",
    category: "posters",
    categoryLabel: "Posters",
    image: "/images/gallery/posters-room.webp",
    alt: "Wall covered with printed posters",
  },
  {
    id: "banner-building",
    title: "Outdoor Banners",
    category: "posters",
    categoryLabel: "Posters",
    image: "/images/services/banners-posters.webp",
    alt: "Large printed advertising banners and posters on a building",
    shape: "wide",
  },

  {
    id: "printing-press",
    title: "Printing Press",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/hero/printing-press.webp",
    alt: "Printing press with coloured ink rollers inside a print studio",
    shape: "wide",
  },
  {
    id: "flex-printing",
    title: "Large Format Flex Printing",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/services/flex-vinyl.webp",
    alt: "Large format flex banner being printed on an industrial printer",
  },
  {
    id: "studio-paper",
    title: "Print Studio Paper Stock",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/about/studio.webp",
    alt: "Colourful printing paper stacks inside a printing studio",
  },
  {
    id: "colour-swatches",
    title: "Colour Matching",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/gallery/color-swatches.webp",
    alt: "Colour swatch fan deck for print colour matching",
  },
  {
    id: "cmyk-chart",
    title: "CMYK Calibration",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/gallery/cmyk-chart.webp",
    alt: "CMYK colour calibration chart used in printing",
  },
  {
    id: "sticker-sheet",
    title: "Stickers & Labels",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/services/stickers-labels.webp",
    alt: "Assorted custom printed stickers and labels",
  },
  {
    id: "photo-prints",
    title: "Photo Prints",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/services/photo-printing.webp",
    alt: "Quality printed photographs spread on a table",
  },
  {
    id: "letterhead",
    title: "Letterhead Printing",
    category: "printing",
    categoryLabel: "Printing",
    image: "/images/business/letterhead.webp",
    alt: "Printed letterhead and office stationery",
  },
];

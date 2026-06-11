export type Product = {
  id: string;
  name: string;
  category: "Chutneys" | "Spice Blends" | "Sherbets" | "Artisanal Sweets";
  region: string;
  state: string;
  khojedIn: string;
  blurb: string;
  price: number;
  featured?: boolean;
  image: string;
};

export const products: Product[] = [
  {
    id: "chamba-chukh",
    name: "Chamba Chukh",
    category: "Chutneys",
    region: "Chamba",
    state: "Himachal Pradesh",
    khojedIn: "Chamba",
    blurb:
      "A fiery Pahadi green chilli chutney made the old way — slow-pounded, smoke-kissed, dangerously addictive.",
    price: 600,
    featured: true,
    image: "/img/chamba-chukh.png",
  },
  {
    id: "sattu-laddoo",
    name: "Sattu Laddoo",
    category: "Artisanal Sweets",
    region: "Patna",
    state: "Bihar",
    khojedIn: "Bihar",
    blurb:
      "Earthy, nutty laddoos rolled from roasted gram, jaggery and ghee. Pulled straight from a grandmother's steel dabba.",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1635952346904-95f2ccfcd029?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "imli-plum-sherbet",
    name: "Imli Plum Sherbet",
    category: "Sherbets",
    region: "Amritsar",
    state: "Punjab",
    khojedIn: "Punjab",
    blurb:
      "Tangy summer nostalgia bottled like a memory — tamarind, plum, black salt, and the loud quiet of June afternoons.",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1579888944884-c7fc5a553848?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "haara-namak",
    name: "Haara Namak",
    category: "Spice Blends",
    region: "Rohtak",
    state: "Haryana",
    khojedIn: "Haryana",
    blurb:
      "A green herbed salt blend from old North-Indian kitchens. Mint, coriander, rock salt — for everything you cook from scratch.",
    price: 129,
    image: "/img/haara-namak.png",
  },
];

export const categories = [
  "All",
  "Chutneys",
  "Spice Blends",
  "Sherbets",
  "Artisanal Sweets",
] as const;

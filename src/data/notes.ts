export type FieldNote = {
  no: string;
  place: string;
  type: "FIELD RECIPE" | "RITUAL" | "MEMORY" | "INGREDIENT" | "PLAYLIST";
  title: string;
  body: string;
};

export const fieldNotes: FieldNote[] = [
  {
    no: "№ 012",
    place: "CHAMBA, HP",
    type: "FIELD RECIPE",
    title: "Notes on a green chilli",
    body: "Three days in a stone-walled kitchen, learning the chukh between songs.",
  },
  {
    no: "№ 018",
    place: "PATNA, BR",
    type: "RITUAL",
    title: "Sattu before the heat",
    body: "A grandmother's measuring cup is a fist. Her ratios never lie.",
  },
  {
    no: "№ 023",
    place: "AMRITSAR, PB",
    type: "MEMORY",
    title: "June, bottled.",
    body: "Black salt, plum, and the loud quiet of a verandah at three in the afternoon.",
  },
  {
    no: "№ 031",
    place: "ROHTAK, HR",
    type: "INGREDIENT",
    title: "Green salt, plain truth.",
    body: "Sometimes the most radical thing in a kitchen is the salt.",
  },
  {
    no: "№ 037",
    place: "ON THE ROAD",
    type: "PLAYLIST",
    title: "Playlist: Highway 1A",
    body: "Lo-fi qawwalis, dadra, and the hiss of cassette tape.",
  },
];

export const fieldNotesCover = {
  image:
    "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?auto=format&fit=crop&w=1200&q=80",
  eyebrow: "COVER · VOL. 01",
  title: "A travel diary of taste.",
};

export const mixtape = {
  eyebrow: "NOW PLAYING — MIXTAPE № 04",
  title: "Highway 1A, after dark.",
  tracks: [
    { title: "Tere Bin", artist: "NUSRAT FATEH ALI KHAN", time: "7:42" },
    { title: "Jugni", artist: "CLINTON CEREJO · VISHAL DADLANI", time: "5:30" },
    { title: "Iktara", artist: "AMIT TRIVEDI", time: "4:08" },
    { title: "Kho Gaye Hum Kahan", artist: "PRATEEK KUHAD", time: "4:28" },
    { title: "Pareshaan", artist: "AMIT TRIVEDI", time: "4:45" },
  ],
};

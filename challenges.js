// Dad's Challenge Board - Challenges Database
// Easy to add/remove challenges! Just modify the array below.

const CHALLENGES = [
  {
    id: "album-cover-remix",
    title: "Album Cover Remix",
    points: 40,
    icon: "🎧",
    category: "art",
    description: "Pick a favorite song and design a brand-new album cover for it. Include the song title, artist name, and at least 3 visual clues that match the mood or lyrics. Submit the drawing and explain the 3 clues."
  },
  {
    id: "math-treasure-map",
    title: "Math Treasure Map",
    points: 35,
    icon: "🗺️",
    category: "math",
    description: "Create a treasure map where each step is unlocked by solving a math problem. Include at least 6 stops using addition, subtraction, multiplication, division, fractions, or patterns. Submit the map and answer key."
  },
  {
    id: "household-beat-lab",
    title: "Household Beat Lab",
    points: 30,
    icon: "🥁",
    category: "creative",
    description: "Make a 30-second rhythm track using only household objects like cups, pencils, boxes, tables, or cans. Use at least 4 different sounds. Submit the object list and either perform it or describe the beat pattern."
  },
  {
    id: "symmetry-monster",
    title: "Symmetry Creature",
    points: 25,
    icon: "🪞",
    category: "art",
    description: "Draw half of a creature on one side of a page, then mirror it on the other side as closely as possible. Add color patterns that repeat symmetrically. Submit the finished creature and name it."
  },
  {
    id: "tablet-minecraft-music-stage",
    title: "Minecraft Music Stage",
    points: 60,
    icon: "🎤",
    category: "building",
    description: "Build a small concert stage in Minecraft on tablet. It must include a stage, lights, audience area, backstage area, and at least one pretend instrument made from blocks. Submit screenshots or a sketch of the build."
  },
  {
    id: "shape-secret-code",
    title: "Shape Secret Code",
    points: 35,
    icon: "🔺",
    category: "crypto",
    description: "Invent a code where shapes, symbols, or colors stand for letters. Write a secret message of at least 10 words and include a key so someone else can decode it. Bonus: add one fake symbol to confuse them."
  },
  {
    id: "time-travel-rules",
    title: "Time Travel Ruleset",
    points: 45,
    icon: "⏳",
    category: "writing",
    description: "Create the rules for a time-travel universe. Include 5 rules, 1 paradox, and what happens if someone breaks the rules. Submit the rules and a short example story showing the paradox."
  },
  {
    id: "prime-number-lock",
    title: "Prime Number Lock",
    points: 40,
    icon: "🔢",
    category: "math",
    description: "Design a puzzle lock where the final code is created from prime numbers, factors, or multiples. It must have at least 4 clues and one final 3- or 4-digit answer. Submit the puzzle and solution."
  },
  {
    id: "binary-secret-message",
    title: "Binary Secret Message",
    points: 45,
    icon: "💾",
    category: "crypto",
    description: "Write a short message and encode it using binary ASCII. Then decode it back to prove it works. Submit the original message, binary version, and decoded version."
  },
  {
    id: "pc-minecraft-time-machine",
    title: "Minecraft Time Machine Room",
    points: 75,
    icon: "🌀",
    category: "building",
    description: "Build a time-machine room in Minecraft on PC. It must include a power source, control panel, portal or chamber, warning sign, and one hidden clue about what year it travels to. Submit screenshots."
  },
  {
    id: "mini-logic-grid",
    title: "Mini Logic Mystery",
    points: 60,
    icon: "🧩",
    category: "math",
    description: "Create a small logic puzzle with 3 people, 3 objects, and 3 locations or times. Write at least 5 clues so someone can solve who matches with what. Submit the puzzle, grid, and answer."
  },
  {
    id: "cipher-field-manual",
    title: "Cipher Field Manual",
    points: 90,
    icon: "📓",
    category: "crypto",
    description: "Make a mini field manual explaining 3 secret codes, such as Caesar shift, Atbash, Pigpen, Morse, A1Z26, or binary. Include one example message for each code and one challenge message for someone else to solve."
  },
  {
    id: "cardboard-puzzle-box",
    title: "Cardboard Puzzle Box",
    points: 90,
    icon: "📦",
    category: "building",
    description: "Build a small puzzle box, envelope, or container from cardboard or paper. It must require at least 3 clues or steps before it can be opened. Submit photos or drawings and explain the solution."
  },
  {
    id: "one-room-escape-puzzle",
    title: "One-Room Escape Puzzle",
    points: 150,
    icon: "🚪",
    category: "crypto",
    description: "Create a mini escape-room challenge in one room. It must include 3 connected clues and one final code or answer. Someone else must be able to solve it without help. Submit the clues, final answer, and how long it took them."
  },
  {
    id: "family-quiz-show",
    title: "Family Quiz Show",
    points: 60,
    icon: "📺",
    category: "creative",
    description: "Create and host a family quiz show with 20 questions: 5 math, 5 music or art, 5 Minecraft or games, and 5 weird facts. Include scoring rules and one bonus round. Submit the questions and winner."
  },
  {
    id: "future-invention-ad",
    title: "Future Invention Ad",
    points: 45,
    icon: "🚀",
    category: "creative",
    description: "Invent a product from 100 years in the future and create an advertisement for it. Include the product name, what problem it solves, 3 features, a price, and one ridiculous warning label."
  }
];

// Dad's Challenge Board - Challenges Database
// Easy to add/remove challenges! Just modify the array below.

const CHALLENGES = [
  {
    id: "scavenger-hunt",
    title: "Indoor Scavenger Hunt",
    points: 10,
    icon: "🔍",
    description: "Find 10 things around the house: something magnetic, something older than you, something with a serial number, something that floats, something that is exactly 12 inches long, something translucent, a leaf from outside, a coin from before 2010, something that plugs in but has no screen, and a blue button/peg."
  },
  {
    id: "paper-tower",
    title: "Build a Paper Tower",
    points: 15,
    icon: "🗼",
    description: "Build the tallest tower you can using only 5 sheets of standard paper and 1 meter of tape. No external supports allowed. It must stand on its own for at least 10 seconds. Measure the height and write it down!"
  },
  {
    id: "secret-code",
    title: "Cipher Breaker Duel",
    points: 25,
    icon: "🔐",
    description: "Create a two-layer secret message for your brother to crack. Layer 1 must be a Caesar shift, Atbash, or A1Z26 code. Layer 2 must be a clue that tells him which cipher/key to use. Submit the encrypted message, the answer, and the clue. Bonus bragging rights if he needs more than 10 minutes."
  },
  {
    id: "spy-laser-maze",
    title: "Hallway Spy Laser Maze",
    points: 20,
    icon: "🕸️",
    description: "Use yarn, painter's tape, string, or streamers to build a laser maze in a hallway or room. Crawl through without touching any laser. Time your run, then redesign the maze to make it harder for your brother. Submit your best time and one photo or sketch of the maze layout."
  },
  {
    id: "rube-goldberg",
    title: "Rube Goldberg Mini Machine",
    points: 25,
    icon: "⚙️",
    description: "Use household items (books, balls, dominos, toy cars, gravity) to knock over a plastic cup, ring a bell, or trigger a mechanism. The machine must have a minimum of 5 distinct steps. Film it or describe all the steps in your submission!"
  },
  {
    id: "kitchen-forensics",
    title: "Kitchen Forensics Lab",
    points: 20,
    icon: "🧪",
    description: "Run three safe kitchen tests: build a floating/sinking prediction chart for 8 objects, separate a mystery mix like rice + paper clips + salt using household tools, and identify one powder by how it reacts with water or vinegar. Submit your predictions, results, and what surprised you."
  },
  {
    id: "lego-bridge",
    title: "Lego / Block Bridge",
    points: 15,
    icon: "🌉",
    description: "Build a bridge between two chairs or large books spaced exactly 12 inches (30cm) apart. You can only use Lego bricks or standard toy blocks. Test how many coins or small toy cars it can support before collapsing!"
  },
  {
    id: "paper-aircraft-test-pilot",
    title: "Paper Aircraft Test Pilot",
    points: 20,
    icon: "✈️",
    description: "Design three different paper aircraft: distance, accuracy, and hang-time. Test each one with at least three flights in the same room or hallway. Submit the best distance, closest landing to a target, longest air time, and which design won overall."
  },
  {
    id: "boardgame-boss-mode",
    title: "Board Game Boss Mode",
    points: 20,
    icon: "🎲",
    description: "Choose an existing board game or card game and create one 'boss mode' rule set with 3 new rules, one power-up, and one penalty. Play at least 10 minutes. Submit the rules and explain which rule made the game more chaotic, strategic, or unfair."
  },
  {
    id: "sound-effects-studio",
    title: "Movie Sound Effects Studio",
    points: 15,
    icon: "🎙️",
    description: "Create 8 movie sound effects using only household objects: footsteps, thunder, a monster growl, a door creak, a laser blast, a sword clash, rain, and an explosion. Submit the object used for each sound and which effect was most convincing."
  },
  {
    id: "domino-chain-reaction",
    title: "Domino Chain Reaction",
    points: 25,
    icon: "🧱",
    description: "Build a chain reaction with at least 25 pieces using dominoes, books, blocks, cards, or small toys. It must include one turn, one ramp, and one final target knockdown. Submit the number of pieces, how many attempts it took, and what failed first."
  },
  {
    id: "memory-palace",
    title: "Memory Palace Sprint",
    points: 15,
    icon: "🧠",
    description: "Ask someone to write a list of 20 random objects. Study it for 2 minutes, wait 5 minutes, then recite as many as you can in order. Submit your score and the memory trick you used. Add 5 bonus objects if you want a harder run."
  },
  {
    id: "no-oven-snack-inventor",
    title: "No-Oven Snack Inventor",
    points: 20,
    icon: "🥨",
    description: "Invent a no-oven snack using at least 4 ingredients already in the house. Give it a ridiculous product name, rate it on taste and weirdness, and write a one-sentence pitch. Clean up the kitchen to make the challenge count."
  }
];

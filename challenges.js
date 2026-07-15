// Dad's Challenge Board - Challenges Database
// Easy to add/remove challenges! Just modify the array below.

const CHALLENGES = [
  // {
  //   id: "scavenger-hunt",
  //   title: "Indoor Scavenger Hunt",
  //   points: 10,
  //   icon: "🔍",
  //   description: "Find 10 things around the house: something magnetic, something older than you, something with a serial number, something that floats, something that is exactly 12 inches long, something translucent, a leaf from outside, a coin from before 2010, something that plugs in but has no screen, and a blue button/peg."
  // },
  // {
  //   id: "paper-tower",
  //   title: "Build a Paper Tower",
  //   points: 15,
  //   icon: "🗼",
  //   description: "Build the tallest tower you can using only 5 sheets of standard paper and 1 meter of tape. No external supports allowed. It must stand on its own for at least 10 seconds. Measure the height and write it down!"
  // },
  {
    id: "secret-code",
    title: "Cipher Breaker Duel",
    points: 25,
    icon: "🔐",
    category: "crypto",
    description: "Create a two-layer secret message for your brother to crack. Layer 1 must be a Caesar shift, Atbash, or A1Z26 code. Layer 2 must be a clue that tells him which cipher/key to use. Submit the encrypted message, the answer, and the clue. Bonus bragging rights if he needs more than 10 minutes."
  },
  {
    id: "spy-laser-maze",
    title: "Hallway Spy Laser Maze",
    points: 20,
    icon: "🕸️",
    category: "sports",
    description: "Use yarn, painter's tape, string, or streamers to build a laser maze in a hallway or room. Crawl through without touching any laser. Time your run, then redesign the maze to make it harder for your brother. Submit your best time and one photo or sketch of the maze layout."
  },
  {
    id: "rube-goldberg",
    title: "Rube Goldberg Mini Machine",
    points: 25,
    icon: "⚙️",
    category: "science",
    description: "Use household items (books, balls, dominos, toy cars, gravity) to knock over a plastic cup, ring a bell, or trigger a mechanism. The machine must have a minimum of 5 distinct steps. Film it or describe all the steps in your submission!"
  },
  {
    id: "kitchen-forensics",
    title: "Kitchen Forensics Lab",
    points: 20,
    icon: "🧪",
    category: "science",
    description: "Run three safe kitchen tests: build a floating/sinking prediction chart for 8 objects, separate a mystery mix like rice + paper clips + salt using household tools, and identify one powder by how it reacts with water or vinegar. Submit your predictions, results, and what surprised you."
  },
  {
    id: "lego-bridge",
    title: "Lego / Block Bridge",
    points: 15,
    icon: "🌉",
    category: "science",
    description: "Build a bridge between two chairs or large books spaced exactly 12 inches (30cm) apart. You can only use Lego bricks or standard toy blocks. Test how many coins or small toy cars it can support before collapsing!"
  },
  {
    id: "paper-aircraft-test-pilot",
    title: "Paper Aircraft Test Pilot",
    points: 20,
    icon: "✈️",
    category: "science",
    description: "Design three different paper aircraft: distance, accuracy, and hang-time. Test each one with at least three flights in the same room or hallway. Submit the best distance, closest landing to a target, longest air time, and which design won overall."
  },
  {
    id: "boardgame-boss-mode",
    title: "Board Game Boss Mode",
    points: 20,
    icon: "🎲",
    category: "gaming",
    description: "Choose an existing board game or card game and create one 'boss mode' rule set with 3 new rules, one power-up, and one penalty. Play at least 10 minutes. Submit the rules and explain which rule made the game more chaotic, strategic, or unfair."
  },
  {
    id: "random-creature",
    title: "Random Creature Challenge",
    points: 20,
    icon: "🎲",
    category: "art",
    description: "Create a character using these random traits: Animal: Shark. Transportation: Skateboard. Job: Chef. Power: Invisibility. Mood: Grumpy. Draw it, build it, act it out, or write a short story/comic about it. Submit the creature's name and explain how all 5 traits show up!"
  },
  {
    id: "three-style-drawing",
    title: "Three Style Drawing",
    points: 15,
    icon: "🎨",
    category: "art",
    description: "Pick something simple, like a bike, tree, or dog. Draw it three different ways: realistic, cartoon, and video game style. Submit what object you picked and describe one detail that makes each version match its style."
  },
  {
    id: "code-a-decoder",
    title: "Code a Decoder",
    points: 25,
    icon: "🕵️",
    category: "coding",
    description: "Build a program that can encode a message by shifting each letter with a Caesar cipher, decode a message, ignore punctuation, and let the user choose the shift amount. Bonus: make it crack a message when the shift is unknown by trying all 26 possibilities."
  },
  {
    id: "conways-game-of-life",
    title: "Conway's Game of Life",
    points: 30,
    icon: "🟩",
    category: "coding",
    description: "Create a program that simulates a world made of tiny square cells. Each cell is either alive or dead. For every cell, count its 8 neighbors: up, down, left, right, and the four diagonals. Then apply these rules to every cell at the same time: 1) A live cell with fewer than 2 live neighbors dies. 2) A live cell with 2 or 3 live neighbors stays alive. 3) A live cell with more than 3 live neighbors dies. 4) A dead cell with exactly 3 live neighbors becomes alive."
  },
  {
    id: "one-hundred-lockers",
    title: "The 100 Lockers",
    points: 20,
    icon: "🔐",
    category: "math",
    description: "There are 100 closed lockers. A student walks by and opens every locker. A second student changes every 2nd locker, open to closed or closed to open. A third changes every 3rd locker. A fourth changes every 4th locker. Continue until the 100th student changes only locker 100. Which lockers are open at the end? Bonus: explain why those lockers stay open."
  },
  {
    id: "river-crossing",
    title: "River Crossing",
    points: 15,
    icon: "🚣",
    category: "math",
    description: "A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat only holds the farmer and one item. If left alone, the wolf eats the goat, and the goat eats the cabbage. How can the farmer get everything across safely? Submit the exact trip order."
  },
  {
    id: "fibonacci-golden-ratio",
    title: "Fibonacci & the Golden Ratio",
    points: 20,
    icon: "🌀",
    category: "math",
    description: "Investigate one of the most famous patterns in mathematics. Step 1: write down the first 15 Fibonacci numbers. The sequence starts with 1, 1, and every number after that is the sum of the previous two numbers. Step 2: divide each Fibonacci number by the one before it, like 2 ÷ 1 = 2.000, 3 ÷ 2 = 1.500, 5 ÷ 3 = 1.667, and 8 ÷ 5 = 1.600. Continue until you have calculated all the ratios. What number do your answers seem to be approaching?"
  },
  {
    id: "cube-tower",
    title: "Cube Tower",
    points: 20,
    icon: "🧊",
    category: "math",
    description: "You have 36 cubes and want to build the tallest possible tower. Every level must be a square. The bottom can be any size. Each higher level must be smaller than the one below it. What is the tallest tower you can build? Draw it and submit your level sizes."
  },
  {
    id: "dragon-wanted-poster",
    title: "Dragon Wanted Poster",
    points: 15,
    icon: "🐉",
    category: "art",
    description: "A dragon is causing trouble. Create a wanted poster that includes the dragon's name, picture, crimes committed, reward, last known location, and weaknesses. Submit the dragon's name and describe the best detail on your poster."
  },
  {
    id: "bring-a-memory-to-life",
    title: "Bring a Memory to Life",
    points: 100,
    icon: "✍️",
    category: "writing",
    description: "Choose one real family memory that means something to you. Imagine you are writing to someone who has never met you or your family, and describe it so well that the reader feels like they were actually there. Include the people who were part of the memory: what they looked like, about how old they were, their personalities, habits or funny quirks, and how they acted during the memory. Be honest, but kind, and do not include anything that would hurt someone's feelings."
  },
  {
    id: "lost-cartoon-vault",
    title: "Super Bonus: Lost Cartoon Vault",
    points: 150,
    icon: "🗝️",
    category: "crypto",
    description: "Complete a printable 60-120 minute secret-agent puzzle mission with 11 connected puzzles. Each solved puzzle reveals one letter needed for the final vault phrase. Open the printable mission, solve every page, and submit the final phrase plus one puzzle that was the hardest.",
    printUrl: "lost-cartoon-vault.html"
  },
  {
    id: "hidden-messages",
    title: "Hidden",
    points: 15,
    icon: "🎙️",
    category: "art",
    description: "Create 8 movie sound effects using only household objects: footsteps, thunder, a monster growl, a door creak, a laser blast, a sword clash, rain, and an explosion. Submit the object used for each sound and which effect was most convincing."
  },
  {
    id: "domino-chain-reaction",
    title: "Domino Chain Reaction",
    points: 25,
    icon: "🧱",
    category: "science",
    description: "Build a chain reaction with at least 25 pieces using dominoes, books, blocks, cards, or small toys. It must include one turn, one ramp, and one final target knockdown. Submit the number of pieces, how many attempts it took, and what failed first."
  },
  {
    id: "memory-palace",
    title: "Memory Palace Sprint",
    points: 15,
    icon: "🧠",
    category: "reading",
    description: "Ask someone to write a list of 20 random objects. Study it for 2 minutes, wait 5 minutes, then recite as many as you can in order. Submit your score and the memory trick you used. Add 5 bonus objects if you want a harder run."
  },
  {
    id: "no-oven-snack-inventor",
    title: "No-Oven Snack Inventor",
    points: 20,
    icon: "🥨",
    category: "science",
    description: "Invent a no-oven snack using at least 4 ingredients already in the house. Give it a ridiculous product name, rate it on taste and weirdness, and write a one-sentence pitch. Clean up the kitchen to make the challenge count."
  }
];

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
    title: "Secret Code Message",
    points: 10,
    icon: "🔐",
    description: "Make a coded message using an encryption method of your choice (A1Z26, Caesar shift (+3), custom symbols, or your own invented cipher). Write down your cipher key and a short message. Give it to your brother—he has to decode it to prove it works!"
  },
  {
    id: "kitchen-measurement",
    title: "Kitchen Measurement Puzzle",
    points: 15,
    icon: "🧪",
    description: "Estimate first, then measure: 1 cup of cereal (exactly), 100g of a dry ingredient (like sugar or pasta), and exactly 1 liter of water. Write down your estimates and the actual numbers. The brother with the closest estimates wins!"
  },
  {
    id: "rube-goldberg",
    title: "Rube Goldberg Mini Machine",
    points: 25,
    icon: "⚙️",
    description: "Use household items (books, balls, dominos, toy cars, gravity) to knock over a plastic cup, ring a bell, or trigger a mechanism. The machine must have a minimum of 5 distinct steps. Film it or describe all the steps in your submission!"
  },
  {
    id: "math-escape-room",
    title: "Math Escape Room",
    points: 20,
    icon: "🔢",
    description: "Solve these 4 short puzzles to find the 4-digit 'lock code'. \n1) If a shirt and a hat cost $110 in total, and the shirt costs $100 more than the hat, how much does the hat cost? \n2) Complete the sequence: 2, 6, 12, 20, 30, ? \n3) I am a three-digit number. My tens digit is 5 more than my ones digit. My hundreds digit is 8 less than my tens digit. What number am I? \n4) Solve: 8 + 8 ÷ 8 + 8 × 8 - 8 = ? \n5) How many triangles are in a pentagram (5-pointed star)?"
  },
  {
    id: "lego-bridge",
    title: "Lego / Block Bridge",
    points: 15,
    icon: "🌉",
    description: "Build a bridge between two chairs or large books spaced exactly 12 inches (30cm) apart. You can only use Lego bricks or standard toy blocks. Test how many coins or small toy cars it can support before collapsing!"
  },
  {
    id: "commercial-challenge",
    title: "Commercial Challenge",
    points: 15,
    icon: "📺",
    description: "Pick a random, boring household object (like a potato masher, a toilet paper roll, or a single sock). Perform a funny 30-second commercial to convince Dad and your brother to buy it for $1,000. Write down your catchphrase!"
  },
  {
    id: "boardgame-remix",
    title: "Board Game Remix",
    points: 20,
    icon: "🎲",
    description: "Choose an existing board game or card game (like Uno, Monopoly, or Chess). Invent 3 new rules that completely change how the game is played. Play one round with your brother or Dad and explain how the new rules affected the strategy."
  },
  {
    id: "random-creature",
    title: "Random Creature Challenge",
    points: 20,
    icon: "🎲",
    description: "Create a character using these random traits: Animal: Shark. Transportation: Skateboard. Job: Chef. Power: Invisibility. Mood: Grumpy. Draw it, build it, act it out, or write a short story/comic about it. Submit the creature's name and explain how all 5 traits show up!"
  },
  {
    id: "three-style-drawing",
    title: "Three Style Drawing",
    points: 15,
    icon: "🎨",
    description: "Pick something simple, like a bike, tree, or dog. Draw it three different ways: realistic, cartoon, and video game style. Submit what object you picked and describe one detail that makes each version match its style."
  },
  {
    id: "code-a-decoder",
    title: "Code a Decoder",
    points: 25,
    icon: "🕵️",
    description: "Build a program that can encode a message by shifting each letter with a Caesar cipher, decode a message, ignore punctuation, and let the user choose the shift amount. Bonus: make it crack a message when the shift is unknown by trying all 26 possibilities."
  },
  {
    id: "conways-game-of-life",
    title: "Conway's Game of Life",
    points: 30,
    icon: "🟩",
    description: "Create a program that simulates a world made of tiny square cells. Each cell is either alive or dead. For every cell, count its 8 neighbors: up, down, left, right, and the four diagonals. Then apply these rules to every cell at the same time: 1) A live cell with fewer than 2 live neighbors dies. 2) A live cell with 2 or 3 live neighbors stays alive. 3) A live cell with more than 3 live neighbors dies. 4) A dead cell with exactly 3 live neighbors becomes alive."
  },
  {
    id: "one-hundred-lockers",
    title: "The 100 Lockers",
    points: 20,
    icon: "🔐",
    description: "There are 100 closed lockers. A student walks by and opens every locker. A second student changes every 2nd locker, open to closed or closed to open. A third changes every 3rd locker. A fourth changes every 4th locker. Continue until the 100th student changes only locker 100. Which lockers are open at the end? Bonus: explain why those lockers stay open."
  },
  {
    id: "river-crossing",
    title: "River Crossing",
    points: 15,
    icon: "🚣",
    description: "A farmer needs to cross a river with a wolf, a goat, and a cabbage. The boat only holds the farmer and one item. If left alone, the wolf eats the goat, and the goat eats the cabbage. How can the farmer get everything across safely? Submit the exact trip order."
  },
  {
    id: "fibonacci-golden-ratio",
    title: "Fibonacci & the Golden Ratio",
    points: 20,
    icon: "🌀",
    description: "Investigate one of the most famous patterns in mathematics. Step 1: write down the first 15 Fibonacci numbers. The sequence starts with 1, 1, and every number after that is the sum of the previous two numbers. Step 2: divide each Fibonacci number by the one before it, like 2 ÷ 1 = 2.000, 3 ÷ 2 = 1.500, 5 ÷ 3 = 1.667, and 8 ÷ 5 = 1.600. Continue until you have calculated all the ratios. What number do your answers seem to be approaching?"
  },
  {
    id: "cube-tower",
    title: "Cube Tower",
    points: 20,
    icon: "🧊",
    description: "You have 36 cubes and want to build the tallest possible tower. Every level must be a square. The bottom can be any size. Each higher level must be smaller than the one below it. What is the tallest tower you can build? Draw it and submit your level sizes."
  },
  {
    id: "hidden-messages",
    title: "Hidden",
    points: 15,
    icon: "🕵️‍♂️",
    description: "Find the hidden messages in this website! Find the #3 hidden messages that tell us what the earth elements are"
  }
];

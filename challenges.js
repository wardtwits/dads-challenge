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
    description: "Solve these 5 short puzzles to find the 5-digit 'lock code'. \n1) If a shirt and a hat cost $110 in total, and the shirt costs $100 more than the hat, how much does the hat cost? \n2) Complete the sequence: 2, 6, 12, 20, 30, ? \n3) I am a three-digit number. My tens digit is 5 more than my ones digit. My hundreds digit is 8 less than my tens digit. What number am I? \n4) Solve: 8 + 8 ÷ 8 + 8 × 8 - 8 = ? \n5) How many triangles are in a pentagram (5-pointed star)?"
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
    id: "hot-day-survival",
    title: "Hot Day Survival Design",
    points: 15,
    icon: "❄️",
    description: "Design the 'ultimate cooling fort' using household materials (blankets, chairs, cardboard, fans, ice packs, etc.). Explain how you set up the airflow and why your design keeps the temperature inside lower than the rest of the room."
  }
];

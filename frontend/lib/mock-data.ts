export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller: string;
  date: string;
  image: string;
  condition: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  type: "lost" | "found";
  location: string;
  date: string;
  contact: string;
  image: string;
  category: string;
}

export const CATEGORIES = [
  "All",
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Sports",
  "Stationery",
  "Other",
];

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: "m1",
    title: "Calculus: Early Transcendentals",
    description: "James Stewart 8th Edition. Barely used, minor highlights in first 3 chapters. Perfect for MATH 201.",
    price: 45,
    category: "Textbooks",
    seller: "Priya M.",
    date: "2 hours ago",
    image: "/items/textbook.jpg",
    condition: "Like New",
  },
  {
    id: "m2",
    title: 'Dell UltraSharp 27" Monitor',
    description: "4K IPS monitor, great for coding and design. Includes HDMI and USB-C cables.",
    price: 180,
    category: "Electronics",
    seller: "Jake R.",
    date: "5 hours ago",
    image: "/items/monitor.jpg",
    condition: "Good",
  },
  {
    id: "m3",
    title: "IKEA MALM Desk - White",
    description: "Perfect study desk with 2 drawers. Moving out, need to sell by end of month.",
    price: 60,
    category: "Furniture",
    seller: "Sara K.",
    date: "1 day ago",
    image: "/items/desk.jpg",
    condition: "Good",
  },
  {
    id: "m4",
    title: "TI-84 Plus CE Calculator",
    description: "Graphing calculator in great condition. Essential for engineering and math courses.",
    price: 55,
    category: "Electronics",
    seller: "Mike D.",
    date: "1 day ago",
    image: "/items/calculator.jpg",
    condition: "Excellent",
  },
  {
    id: "m5",
    title: "North Face Backpack",
    description: "Borealis model, black. Very spacious with laptop compartment. Minor wear on bottom.",
    price: 35,
    category: "Clothing",
    seller: "Emma L.",
    date: "2 days ago",
    image: "/items/backpack.jpg",
    condition: "Good",
  },
  {
    id: "m6",
    title: "Organic Chemistry Lab Kit",
    description: "Complete molecular model set + goggles + lab coat (size M). Used for one semester.",
    price: 30,
    category: "Stationery",
    seller: "Chris P.",
    date: "2 days ago",
    image: "/items/labkit.jpg",
    condition: "Good",
  },
  {
    id: "m7",
    title: "Sony WH-1000XM4 Headphones",
    description: "Noise-cancelling headphones. Battery life still amazing. Comes with carry case.",
    price: 120,
    category: "Electronics",
    seller: "Aisha N.",
    date: "3 days ago",
    image: "/items/headphones.jpg",
    condition: "Excellent",
  },
  {
    id: "m8",
    title: "Mini Fridge - Midea 3.3 cu ft",
    description: "Compact fridge perfect for dorm rooms. Freezer compartment works great. Graduating, must sell!",
    price: 70,
    category: "Furniture",
    seller: "Tom B.",
    date: "3 days ago",
    image: "/items/fridge.jpg",
    condition: "Good",
  },
  {
    id: "m9",
    title: "Yoga Mat + Resistance Bands",
    description: "Thick yoga mat (non-slip) + set of 5 resistance bands. Great for home workouts.",
    price: 20,
    category: "Sports",
    seller: "Lily W.",
    date: "4 days ago",
    image: "/items/yoga.jpg",
    condition: "Like New",
  },
  {
    id: "m10",
    title: "Introduction to Psychology (Nolen-Hoeksema)",
    description: "7th edition. Some notes in margins, otherwise clean. Required for PSYCH 101.",
    price: 25,
    category: "Textbooks",
    seller: "David H.",
    date: "4 days ago",
    image: "/items/psych-book.jpg",
    condition: "Good",
  },
  {
    id: "m11",
    title: "Desk Lamp - LED Adjustable",
    description: "3 brightness modes, USB charging port, flexible arm. Bought 6 months ago.",
    price: 15,
    category: "Furniture",
    seller: "Nina S.",
    date: "5 days ago",
    image: "/items/lamp.jpg",
    condition: "Excellent",
  },
  {
    id: "m12",
    title: "Campus Bike - Schwinn Hybrid",
    description: "21-speed hybrid bike with lock included. Perfect for commuting across campus.",
    price: 95,
    category: "Sports",
    seller: "Ryan G.",
    date: "1 week ago",
    image: "/items/bike.jpg",
    condition: "Good",
  },
];

export const LOST_FOUND_ITEMS: LostFoundItem[] = [
  {
    id: "lf1",
    title: "Blue Hydro Flask Water Bottle",
    description: "32oz blue Hydro Flask with stickers on it (one says 'Adventure Awaits'). Left in the Science Building lecture hall.",
    type: "lost",
    location: "Science Building - Room 204",
    date: "Today, 10:30 AM",
    contact: "alex@campus.edu",
    image: "/items/bottle.jpg",
    category: "Personal Items",
  },
  {
    id: "lf2",
    title: "AirPods Pro (2nd Gen) in White Case",
    description: "Found a pair of AirPods Pro on a bench near the student center fountain. Has initials 'RK' engraved.",
    type: "found",
    location: "Student Center - Near Fountain",
    date: "Today, 2:15 PM",
    contact: "campus-security@campus.edu",
    image: "/items/airpods.jpg",
    category: "Electronics",
  },
  {
    id: "lf3",
    title: "Black Leather Wallet",
    description: "Lost my black leather wallet somewhere between the library and the parking lot. Contains student ID and cards.",
    type: "lost",
    location: "Between Library and Lot C",
    date: "Yesterday, 5:00 PM",
    contact: "jordan@campus.edu",
    image: "/items/wallet.jpg",
    category: "Personal Items",
  },
  {
    id: "lf4",
    title: "Set of Keys with Red Lanyard",
    description: "Found a set of 4 keys on a red campus lanyard near the gym entrance. Turned into lost and found office.",
    type: "found",
    location: "Recreation Center - Main Entrance",
    date: "Yesterday, 8:00 AM",
    contact: "lost-found@campus.edu",
    image: "/items/keys.jpg",
    category: "Keys & IDs",
  },
  {
    id: "lf5",
    title: "Silver MacBook Pro 14-inch",
    description: "Left my MacBook Pro in the library study room B-12. Has a purple case and a 'CS Club' sticker.",
    type: "lost",
    location: "University Library - Study Room B-12",
    date: "2 days ago",
    contact: "sarah@campus.edu",
    image: "/items/macbook.jpg",
    category: "Electronics",
  },
  {
    id: "lf6",
    title: "Gray Nike Hoodie (Size L)",
    description: "Found a gray Nike hoodie left on the bleachers after the basketball game. Available at campus security.",
    type: "found",
    location: "Sports Arena - Section B",
    date: "2 days ago",
    contact: "campus-security@campus.edu",
    image: "/items/hoodie.jpg",
    category: "Clothing",
  },
  {
    id: "lf7",
    title: "Student ID Card - Mia Chen",
    description: "Found a student ID card for Mia Chen (Class of 2027) on the walkway near the engineering building.",
    type: "found",
    location: "Engineering Building - Walkway",
    date: "3 days ago",
    contact: "lost-found@campus.edu",
    image: "/items/id-card.jpg",
    category: "Keys & IDs",
  },
  {
    id: "lf8",
    title: "TI-Nspire CX Calculator",
    description: "Lost my graphing calculator during the Math 301 midterm. It has my name scratched on the back.",
    type: "lost",
    location: "Exam Hall - Room 101",
    date: "4 days ago",
    contact: "kevin@campus.edu",
    image: "/items/calc-lost.jpg",
    category: "Electronics",
  },
  {
    id: "lf9",
    title: "Prescription Glasses - Ray-Ban",
    description: "Found Ray-Ban prescription glasses (brown/tortoise frame) left in the cafeteria during lunch rush.",
    type: "found",
    location: "Main Cafeteria - Table 14",
    date: "4 days ago",
    contact: "lost-found@campus.edu",
    image: "/items/glasses.jpg",
    category: "Personal Items",
  },
  {
    id: "lf10",
    title: "Green Umbrella - Compact",
    description: "Lost a small green compact umbrella somewhere in the Arts Building after the rain on Tuesday.",
    type: "lost",
    location: "Arts Building",
    date: "5 days ago",
    contact: "robin@campus.edu",
    image: "/items/umbrella.jpg",
    category: "Personal Items",
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya M.",
    text: "Sold all my textbooks in 2 days! Campora is a lifesaver for end-of-semester sales.",
    role: "Senior, Biology",
  },
  {
    name: "Jake R.",
    text: "Found my lost calculator through Campora the same day I posted about it. Amazing community!",
    role: "Junior, Engineering",
  },
  {
    name: "Sara K.",
    text: "Best campus marketplace by far. The interface is so smooth and easy to use.",
    role: "Sophomore, CS",
  },
  {
    name: "Mike D.",
    text: "I furnished my entire dorm room from Campora listings. Saved hundreds!",
    role: "Freshman, Business",
  },
  {
    name: "Emma L.",
    text: "Someone found my AirPods and returned them through the lost & found section. So grateful!",
    role: "Junior, Psychology",
  },
  {
    name: "Chris P.",
    text: "As an RA, I recommend Campora to every student moving in. It just works.",
    role: "Senior, Education",
  },
];

// ============================================
//   ANATEN AI — Company Configuration File
//   Change these values for any company
// ============================================

window.ANATEN_CONFIG = {

  // --- Company Info ---
  companyName: "Brew & Batter",
  companyTagline: "Your personal bakery assistant",
  companyEmoji: "🧁",
  companyDescription: "A cozy artisan bakery specializing in freshly baked goods, specialty coffees, and custom cakes.",

  // --- Brand Colors ---
  colors: {
    primary: "#7C6FF7",        // Main purple
    secondary: "#F472B6",      // Pink accent
    gradientFrom: "#EEF2FF",   // Light lavender
    gradientTo: "#FDF2F8",     // Light pink
    bubbleBot: "#ffffff",
    bubbleUser: "#7C6FF7",
    textBot: "#1e1e2e",
    textUser: "#ffffff",
  },

  // --- n8n Webhook URL ---
  webhookUrl: "https://bbaabaloch.app.n8n.cloud/webhook/chat",

  // --- Welcome Message ---
  welcomeMessage: "Hi there! 👋 Welcome to Brew & Batter. I can help you explore our menu, place an order, or answer any questions. What can I get for you today?",

  // --- Quick Reply Buttons ---
  quickReplies: [
    { label: "🍽️ Show menu", message: "Show me the menu" },
    { label: "⭐ Today's specials", message: "What are today's specials?" },
    { label: "🛒 Place an order", message: "I want to place an order" },
    { label: "🕐 Opening hours", message: "What are your opening hours?" },
  ],

  // --- Company Data (Ground Truth for AI) ---
  // This is what the AI uses to answer questions
  companyData: `
    Company: Brew & Batter
    Type: Artisan Bakery & Cafe
    Location: 123 Baker Street, Islamabad
    Phone: +92 300 1234567
    Opening Hours: Mon-Sat 8am-9pm, Sunday 10am-6pm

    MENU:
    === Baked Goods ===
    - Croissant: Rs. 250
    - Chocolate Muffin: Rs. 200
    - Blueberry Muffin: Rs. 200
    - Cinnamon Roll: Rs. 300
    - Sourdough Bread (loaf): Rs. 600
    - Banana Bread (slice): Rs. 180

    === Cakes & Pastries ===
    - Chocolate Lava Cake: Rs. 450
    - Red Velvet Slice: Rs. 400
    - Cheesecake Slice: Rs. 420
    - Custom Cakes: Starting from Rs. 2500 (24hr notice)

    === Drinks ===
    - Espresso: Rs. 250
    - Cappuccino: Rs. 350
    - Latte: Rs. 380
    - Cold Brew: Rs. 400
    - Hot Chocolate: Rs. 350
    - Chai Latte: Rs. 300

    === Today's Specials ===
    - Strawberry Tart: Rs. 380
    - Matcha Croissant: Rs. 320
    - Iced Brown Sugar Latte: Rs. 420

    POLICIES:
    - Orders can be placed in-store or via this chat
    - Custom cake orders require 24 hours notice
    - We offer delivery within 5km radius
    - Minimum delivery order: Rs. 1000
    - Payment: Cash, EasyPaisa, JazzCash, Card
  `
};

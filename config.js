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
    primary: "#7C6FF7",
    secondary: "#F472B6",
    gradientFrom: "#EEF2FF",
    gradientTo: "#FDF2F8",
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
    { label: "🍽️ Show Menu",       message: "Show me the menu" },
    { label: "⭐ Today's Specials", message: "What are today's specials?" },
    { label: "🛒 Place Order",      message: "I want to place an order" },
    { label: "🕐 Opening Hours",    message: "What are your opening hours?" },
  ],

  // --- Company Knowledge Base ---
  // This is what the AI uses to answer questions
  companyData: `
========================
BREW & BATTER
========================

ABOUT

Brew & Batter is a cozy artisan bakery and cafe serving fresh pastries,
handcrafted coffee, breakfast, desserts and sandwiches.

ADDRESS

123 Baker Street
Islamabad

CONTACT

Phone: +92 300 1234567
Email: hello@brewandbatter.pk

OPENING HOURS

Monday - Thursday  8:00 AM - 9:00 PM
Friday             8:00 AM - 10:00 PM
Saturday           9:00 AM - 10:00 PM
Sunday             9:00 AM - 8:00 PM

========================
MENU
========================

COFFEE

Espresso           Rs. 250
Americano          Rs. 300
Cappuccino         Rs. 350
Latte              Rs. 380
Mocha              Rs. 450

ICED DRINKS

Cold Brew          Rs. 400
Iced Latte         Rs. 420
Caramel Frappe     Rs. 520

BREAKFAST

Classic Pancakes   Rs. 650
Belgian Waffles    Rs. 750
French Toast       Rs. 700
Breakfast Platter  Rs. 1,250

BAKERY

Butter Croissant      Rs. 250
Chocolate Croissant   Rs. 300
Blueberry Muffin      Rs. 220
Chocolate Muffin      Rs. 220
Cinnamon Roll         Rs. 320

SANDWICHES

Club Sandwich      Rs. 900
Chicken Panini     Rs. 850
Veggie Sandwich    Rs. 750

DESSERTS

Chocolate Brownie       Rs. 350
Chocolate Lava Cake     Rs. 500
Cheesecake              Rs. 450
Red Velvet Slice        Rs. 450

========================
TODAY'S SPECIALS
========================

Matcha Croissant                 Rs. 350
Honey Almond Latte               Rs. 450
Strawberry Danish                Rs. 320
Chocolate Hazelnut Cheesecake    Rs. 550

========================
ORDERING
========================

Customers can order through this chat.

Available Order Types:
• Dine In
• Takeaway
• Delivery

Delivery Radius:         8 km
Minimum Delivery Order:  Rs. 1,000
Estimated Delivery Time: 30–45 minutes

When taking an order:
1. Confirm every item and mention its price.
2. Ask for quantity if not given.
3. Calculate the total.
4. Ask whether the customer wants Delivery, Takeaway, or Dine-In.
5. Ask if they want to add anything else.
6. Ask for name and phone number.
7. If Delivery, ask for delivery address.
8. Ask for payment method.
9. Confirm the complete order summary.

========================
PAYMENT METHODS
========================

Cash
Credit Card
Debit Card
EasyPaisa
JazzCash

========================
GIFT CARDS
========================

Available denominations:
• Rs. 1,000
• Rs. 2,500
• Rs. 5,000

Available as Digital or Physical Gift Cards.

========================
LOYALTY PROGRAM
========================

Buy 9 coffees and get the 10th coffee free.

========================
FAQ
========================

Q: Do you have Wi-Fi?          A: Yes.
Q: Do you deliver?             A: Yes.
Q: Can I reserve a table?      A: Yes.
Q: Do you have vegan options?  A: Yes.
Q: Can I customize my coffee?  A: Yes.
Q: Do you make birthday cakes? A: Yes. Custom cakes require 24 hours notice.

========================
POLICIES
========================

• Delivery available within 8 km.
• Custom cake orders require 24 hours notice.
• Outside food is not allowed.
• No smoking inside the cafe.
• Free parking available.
• Free Wi-Fi available.
• Refunds are only available before food preparation begins.

========================
IMPORTANT
========================

Only answer questions related to Brew & Batter.

If someone asks about science, math, politics, sports, history, programming,
or any unrelated topic, politely reply:

  "I'm sorry, I can only assist with questions related to Brew & Batter.
   Please ask me about our menu, drinks, opening hours, ordering, delivery,
   or other cafe services."

Never invent menu items or prices.
If information is unavailable, politely ask the customer to call the cafe.
`,

};

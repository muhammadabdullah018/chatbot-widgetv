# Anaten AI — Embeddable Chat Widget

A white-label AI chat widget that plugs into any business website. Customers type a question, Gemini AI answers using your company's data, and every conversation gets logged to Google Sheets automatically.

Built to be reused. Swap `config.js` and it becomes a different business.

---

## How It Works

```
User types a message
        ↓
chat.js sends POST request to n8n webhook
        ↓
n8n extracts message + company knowledge base
        ↓
Google Gemini 2.5 Flash generates a reply
        ↓
n8n formats the response + logs it to Google Sheets
        ↓
Widget displays the reply in the chat UI
```

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | HTML, CSS, JavaScript   |
| Hosting    | Vercel                  |
| Backend    | n8n Cloud               |
| AI Model   | Google Gemini 2.5 Flash |
| Logging    | Google Sheets           |

---

## Project Structure

```
chatbot-widget/
├── index.html      # Main UI — landing screen + chat screen
├── style.css       # All styles, animations, responsive layout
├── chat.js         # Core logic — sends messages, handles responses
├── config.js       # Company config — name, colors, menu, webhook URL
├── vercel.json     # Vercel deployment config + CORS headers
└── README.md
```

---

## n8n Workflow

The backend is a single n8n workflow with 6 nodes:

```
Webhook → Code (parse input) → Message a Model (Gemini) → Code (format output) → Append Row (Sheets) → Respond to Webhook
```

| Node              | What It Does                                      |
|-------------------|---------------------------------------------------|
| Webhook           | Receives POST from the widget                     |
| Code (1st)        | Extracts `message`, `companyName`, `companyData`  |
| Message a Model   | Sends prompt to Gemini 2.5 Flash                  |
| Code (2nd)        | Formats reply, adds timestamp                     |
| Append Row        | Logs conversation to Google Sheets                |
| Respond to Webhook| Returns the reply to the widget                   |

---

## Google Sheets Log Structure

Sheet name: `Anaten - Conversation Logs`  
Tab name: `Logs`

| Column | Value         |
|--------|---------------|
| A      | Timestamp     |
| B      | Company Name  |
| C      | User Message  |
| D      | Bot Reply     |
| E      | Source        |

---

## Customizing for a New Company

Everything that needs to change lives in `config.js`. That's it.

```js
window.ANATEN_CONFIG = {
  companyName: "Your Business Name",
  companyEmoji: "🏪",
  companyTagline: "Your tagline here",
  webhookUrl: "https://your-n8n-instance/webhook/chat",

  colors: {
    primary: "#7C6FF7",
    secondary: "#F472B6",
    gradientFrom: "#EEF2FF",
    gradientTo: "#FDF2F8",
  },

  welcomeMessage: "Hi! How can I help you today?",

  quickReplies: [
    { label: "📋 Services", message: "What services do you offer?" },
    { label: "🕐 Hours",    message: "What are your opening hours?" },
  ],

  companyData: `
    Paste all business info here.
    Menu, prices, hours, policies, FAQs.
    This is what the AI reads to answer questions.
  `
};
```

The AI only answers questions based on `companyData`. It won't invent prices or go off-topic.

---

## Deploying to Vercel

1. Push all files to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Set **Root Directory** to `chatbot-widget`
4. Click **Deploy**
5. Update `webhookUrl` in `config.js` if your n8n instance URL changes

---

## Current Demo Company

**Brew & Batter** — Artisan Bakery & Cafe  
📍 123 Baker Street, Islamabad  
Configured with full menu, ordering flow, delivery info, and FAQs.

---

## Security Note

The webhook URL in `config.js` is client-side and therefore visible in the browser. To prevent abuse, configure your n8n webhook to validate a shared secret in the request headers.

---

## Built By

**Abdullah Baloch** — [Sazaan Studios](https://sazaanstudios.com)  
White-label AI chat solution. Any business. Any industry. Just change `config.js`.

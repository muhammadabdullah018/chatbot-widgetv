Abdullah Baloch — Chatbot Widget

Brew & Batter Edition

A white-label AI chatbot widget built for bakeries and businesses. Powered by Google Gemini AI via n8n automation, hosted on Vercel.


What This Is

A beautiful chat widget that can be embedded on any company website. Customers can ask questions, browse the menu, and get instant AI-powered replies — all logged automatically to Google Sheets.


Tech Stack

LayerTechnologyFrontendHTML, CSS, JavaScriptHostingVercelBackendn8n CloudAI ModelGoogle Gemini 2.5 FlashLoggingGoogle Sheets


Project Structure

chatbot-widget/
├── index.html       — Main UI (landing + chat screens)
├── style.css        — All styles and animations
├── chat.js          — Chat logic, webhook calls, message handling
├── config.js        — Company config (name, colors, menu, webhook URL)
├── vercel.json      — Vercel deployment config with CORS headers
└── README.md        — This file


How It Works

User types message
       ↓
chat.js sends POST to n8n webhook
       ↓
n8n extracts message + company data
       ↓
Gemini AI generates reply using company data
       ↓
n8n formats response + logs to Google Sheets
       ↓
Widget displays the reply


n8n Workflow Nodes

Webhook → Code (clean input) → Message a Model (Gemini) → Code (format response) → Append Row in Sheet → Respond to Webhook

NodePurposeWebhookReceives POST from widgetCode (1st)Extracts message, companyName, companyDataMessage a ModelSends prompt to Gemini 2.5 FlashCode (2nd)Formats Gemini reply, adds timestampAppend RowLogs conversation to Google SheetsRespond to WebhookSends reply back to widget


Webhook URL

https://bbaabaloch.app.n8n.cloud/webhook/chat


Google Sheets Setup

Sheet name: Anaten - Conversation Logs

Tab name: Logs

ColumnValueA — TimestampAuto-filledB — CompanyAuto-filledC — User MessageAuto-filledD — Bot ReplyAuto-filledE — Sourceweb-widget


Customizing for a New Company

All you need to change is config.js:

jswindow.ANATEN_CONFIG = {
  companyName: "Your Company Name",
  companyEmoji: "🏪",
  companyTagline: "Your tagline here",
  webhookUrl: "https://your-n8n-url/webhook/chat",
  colors: {
    primary: "#7C6FF7",
    secondary: "#F472B6",
  },
  welcomeMessage: "Hi! How can I help you today?",
  quickReplies: [
    { label: "📋 Our Services", message: "What services do you offer?" },
  ],
  companyData: `
    // Paste all company info here
    // Menu, prices, hours, policies
    // This is what the AI uses to answer questions
  `
};


Deploying to Vercel


Push all files to a GitHub repo
Go to vercel.com → New Project → Import repo
Set Root Directory to chatbot-widget
Click Deploy
Update webhookUrl in config.js if needed



Current Test Company

Brew & Batter — Artisan Bakery & Cafe

📍 123 Baker Street, Islamabad

📞 +92 300 1234567




Built By

Abdullah Baloch — Universal Chatbot Widget Platform

Any company. Any industry. Just change config.js.
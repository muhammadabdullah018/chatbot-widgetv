// ============================================
//   ANATEN AI — Chat Logic
//   Connects frontend to n8n webhook
// ============================================

(function () {
  // ---- State ----
  let isLoading = false;
  let conversationHistory = [];

  // ---- DOM Elements ----
  const screenLanding = document.getElementById('screen-landing');
  const screenChat = document.getElementById('screen-chat');
  const btnStart = document.getElementById('btn-start');
  const btnBack = document.getElementById('btn-back');
  const btnClear = document.getElementById('btn-clear');
  const btnSend = document.getElementById('btn-send');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const typingIndicator = document.getElementById('typing-indicator');
  const quickReplies = document.getElementById('quick-replies');

  // ---- Apply config ----
  function applyConfig() {
    const cfg = window.ANATEN_CONFIG;
    if (!cfg) return;

    // Apply colors as CSS variables
    const root = document.documentElement;
    if (cfg.colors) {
      if (cfg.colors.primary) root.style.setProperty('--primary', cfg.colors.primary);
      if (cfg.colors.secondary) root.style.setProperty('--secondary', cfg.colors.secondary);
      if (cfg.colors.gradientFrom) root.style.setProperty('--grad-from', cfg.colors.gradientFrom);
      if (cfg.colors.gradientTo) root.style.setProperty('--grad-to', cfg.colors.gradientTo);
    }

    // Apply company emoji
    if (cfg.companyEmoji) {
      document.querySelectorAll('.header-avatar, .msg-avatar:not(.small)').forEach(el => {
        el.textContent = cfg.companyEmoji;
      });
    }

    // Apply company name
    if (cfg.companyName) {
      const nameEl = document.querySelector('.header-name');
      const badgeEl = document.querySelector('.brand-badge span:last-child');
      if (nameEl) nameEl.textContent = cfg.companyName;
      if (badgeEl) badgeEl.textContent = cfg.companyName;
    }

    // Apply tagline
    if (cfg.companyTagline) {
      const subEl = document.querySelector('.landing-sub');
      if (subEl) subEl.textContent = cfg.companyTagline;
    }

    // Apply welcome message
    if (cfg.welcomeMessage) {
      const welcomeBubble = document.querySelector('#welcome-msg .msg-bubble');
      if (welcomeBubble) welcomeBubble.innerHTML = cfg.welcomeMessage;
    }

    // Apply quick replies
    if (cfg.quickReplies && quickReplies) {
      quickReplies.innerHTML = '';
      cfg.quickReplies.forEach(qr => {
        const btn = document.createElement('button');
        btn.className = 'quick-btn';
        btn.dataset.msg = qr.message;
        btn.textContent = qr.label;
        btn.addEventListener('click', () => handleQuickReply(qr.message));
        quickReplies.appendChild(btn);
      });
    }
  }

  // ---- Screen transitions ----
  function showChat() {
    screenLanding.classList.remove('screen-enter');
    screenLanding.classList.add('hidden');
    screenChat.classList.remove('hidden');
    screenChat.classList.add('screen-enter');
    chatInput.focus();
  }

  function showLanding() {
    screenChat.classList.remove('screen-enter');
    screenChat.classList.add('hidden');
    screenLanding.classList.remove('hidden');
    screenLanding.classList.add('screen-enter');
  }

  // ---- Message helpers ----
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendMessage(text, sender, isError = false) {
    const isBot = sender === 'bot';
    const cfg = window.ANATEN_CONFIG || {};

    const msgEl = document.createElement('div');
    msgEl.className = `message ${isBot ? 'bot-message' : 'user-message'}`;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'msg-avatar';
    avatarEl.textContent = isBot ? (cfg.companyEmoji || '🤖') : '👤';

    const contentEl = document.createElement('div');
    contentEl.className = 'msg-content';

    const bubbleEl = document.createElement('div');
    bubbleEl.className = `msg-bubble${isError ? ' error-bubble' : ''}`;
    bubbleEl.innerHTML = formatMessage(text);

    const timeEl = document.createElement('div');
    timeEl.className = 'msg-time';
    timeEl.textContent = getTime();

    contentEl.appendChild(bubbleEl);
    contentEl.appendChild(timeEl);

    if (isBot) {
      msgEl.appendChild(avatarEl);
      msgEl.appendChild(contentEl);
    } else {
      msgEl.appendChild(contentEl);
      msgEl.appendChild(avatarEl);
    }

    chatMessages.appendChild(msgEl);
    scrollToBottom();

    return msgEl;
  }

  function formatMessage(text) {
    // Convert newlines to <br>
    // Convert **bold** to <strong>
    // Convert bullet points
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  function scrollToBottom() {
    chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
  }

  function showTyping() {
    typingIndicator.classList.remove('hidden');
    scrollToBottom();
  }

  function hideTyping() {
    typingIndicator.classList.add('hidden');
  }

  function hideQuickReplies() {
    if (quickReplies) {
      quickReplies.style.opacity = '0';
      quickReplies.style.transform = 'translateY(-8px)';
      quickReplies.style.transition = 'all 0.3s ease';
      setTimeout(() => quickReplies.remove(), 300);
    }
  }

  // ---- Send message to n8n webhook ----
  async function sendMessage(userText) {
    if (!userText.trim() || isLoading) return;

    const cfg = window.ANATEN_CONFIG;
    if (!cfg || !cfg.webhookUrl) {
      appendMessage('Configuration error: No webhook URL found.', 'bot', true);
      return;
    }

    isLoading = true;
    btnSend.disabled = true;
    chatInput.value = '';
    chatInput.style.height = 'auto';

    hideQuickReplies();
    appendMessage(userText, 'user');

    conversationHistory.push({ role: 'user', content: userText });

    showTyping();

    try {
      const payload = {
        message: userText,
        companyName: cfg.companyName || 'Company',
        companyData: cfg.companyData || '',
        conversationHistory: conversationHistory.slice(-10), // Last 10 messages for context
        timestamp: new Date().toISOString(),
        source: 'web-widget'
      };

      const response = await fetch(cfg.webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      hideTyping();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Handle different response formats from n8n
      let botReply = extractReply(data);

      if (!botReply) {
        botReply = "I'm sorry, I didn't quite catch that. Could you rephrase?";
      }

      appendMessage(botReply, 'bot');
      conversationHistory.push({ role: 'assistant', content: botReply });

    } catch (error) {
      hideTyping();
      console.error('Webhook error:', error);

      const errorMsg = error.message.includes('Failed to fetch')
        ? "I'm having trouble connecting right now. Please check your internet and try again."
        : "Something went wrong on my end. Please try again in a moment.";

      appendMessage(errorMsg, 'bot', true);
    }

    isLoading = false;
    btnSend.disabled = false;
    chatInput.focus();
  }
  // Nothing

  // ---- Extract reply from various n8n response formats ----
 function extractReply(data) {
  if (typeof data === 'string') return data;
  if (data.response) return data.response;
  if (data.reply) return data.reply;
  if (data.text) return data.text;
  if (data.output) return data.output;
  if (data.message && typeof data.message === 'string') return data.message;

  // n8n sometimes wraps in array
  if (Array.isArray(data) && data[0]) {
    const d = data[0];
    if (d.response) return d.response;
    if (d.reply) return d.reply;
    if (d.text) return d.text;
    if (d.json && d.json.response) return d.json.response;
  }

  // n8n nested body
  if (data.body) {
    if (typeof data.body === 'string') {
      try { 
        const parsed = JSON.parse(data.body); 
        return parsed.response || parsed.text || parsed.reply || null;
      } catch(e) { 
        return data.body; 
      }
    }
    if (data.body.response) return data.body.response;
  }

  return null;
}

  // ---- Quick reply handler ----
  function handleQuickReply(msg) {
    sendMessage(msg);
  }

  // ---- Clear chat ----
  function clearChat() {
    const cfg = window.ANATEN_CONFIG || {};

    // Remove all messages except first
    const messages = chatMessages.querySelectorAll('.message, .quick-replies');
    messages.forEach(m => m.remove());

    conversationHistory = [];

    // Re-add welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'message bot-message';
    welcomeMsg.id = 'welcome-msg';
    welcomeMsg.innerHTML = `
      <div class="msg-avatar">${cfg.companyEmoji || '🤖'}</div>
      <div class="msg-content">
        <div class="msg-bubble">${cfg.welcomeMessage || 'Hello! How can I help you today?'}</div>
        <div class="msg-time">Just now</div>
      </div>
    `;
    chatMessages.appendChild(welcomeMsg);

    // Re-add quick replies
    if (cfg.quickReplies) {
      const qrContainer = document.createElement('div');
      qrContainer.className = 'quick-replies';
      qrContainer.id = 'quick-replies';
      cfg.quickReplies.forEach(qr => {
        const btn = document.createElement('button');
        btn.className = 'quick-btn';
        btn.dataset.msg = qr.message;
        btn.textContent = qr.label;
        btn.addEventListener('click', () => handleQuickReply(qr.message));
        qrContainer.appendChild(btn);
      });
      chatMessages.appendChild(qrContainer);
    }
  }

  // ---- Auto-resize textarea ----
  function autoResize() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
  }

  // ---- Event Listeners ----
  btnStart.addEventListener('click', showChat);
  btnBack.addEventListener('click', showLanding);
  btnClear.addEventListener('click', clearChat);

  btnSend.addEventListener('click', () => {
    sendMessage(chatInput.value);
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  chatInput.addEventListener('input', autoResize);

  // ---- Init ----
  applyConfig();

})();

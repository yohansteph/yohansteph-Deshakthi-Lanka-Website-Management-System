(function() {
    if (document.getElementById('deshakthi-chatbot')) return;

    const chatbotDiv = document.createElement('div');
    chatbotDiv.id = 'deshakthi-chatbot';
    chatbotDiv.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:9999; font-family:Poppins,sans-serif;';
    chatbotDiv.innerHTML = `
        <div id="chatbot-toggle" style="background:#2e6f40; color:white; width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 15px rgba(0,0,0,0.2);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div id="chatbot-window" style="display:none; position:absolute; bottom:70px; right:0; width:340px; height:480px; background:white; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.2); flex-direction:column; overflow:hidden;">
            <div style="background:#002244; color:white; padding:12px; display:flex; justify-content:space-between;"><span><strong>Deshakthi Assistant</strong></span><span id="chatbot-close" style="cursor:pointer;">&times;</span></div>
            <div id="chatbot-messages" style="flex:1; overflow-y:auto; padding:15px; background:#f5f5f5;"><div class="chat-message bot"><div style="background:#e9ecef; padding:10px; border-radius:15px;">👋 Hi! Ask about jobs or careers.</div></div></div>
            <div style="display:flex; padding:12px; gap:8px;"><input id="chatbot-input" placeholder="Ask me..." style="flex:1; padding:8px; border-radius:30px; border:1px solid #ddd;"><button id="chatbot-send" style="background:#2e6f40; border:none; color:white; width:40px; border-radius:50%;">➤</button></div>
        </div>
    `;
    document.body.appendChild(chatbotDiv);

    const toggle = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const msgs = document.getElementById('chatbot-messages');
    let isOpen = false;

    function addMsg(text, isUser) {
        const div = document.createElement('div');
        div.className = `chat-message ${isUser ? 'user' : 'bot'}`;
        div.style.margin = '8px 0';
        div.style.textAlign = isUser ? 'right' : 'left';
        div.innerHTML = `<div style="display:inline-block; padding:8px 14px; border-radius:20px; background:${isUser ? '#2e6f40' : '#e9ecef'}; color:${isUser ? 'white' : '#333'}; max-width: 85%; white-space: pre-wrap; word-break: break-word;">${text}</div>`;
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
    }

    const CHATBOT_API_URL = 'http://localhost:3000/api/chatbot';

    async function sendChat() {
        const msg = input.value.trim();
        if (!msg) return;
        addMsg(msg, true);
        input.value = '';
        addMsg('Typing...', false);
        try {
            const response = await fetch(CHATBOT_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });
            if (!response.ok) {
                throw new Error(`API returned status ${response.status}`);
            }
            const data = await response.json();
            msgs.lastChild && msgs.lastChild.remove();
            addMsg(data.reply || 'Sorry, I could not get a response right now.', false);
        } catch (err) {
            msgs.lastChild && msgs.lastChild.remove();
            addMsg('Sorry, the chat service is unavailable. Please try again later.', false);
            console.error('Chatbot API error:', err);
        }
    }

    toggle.onclick = () => {
        isOpen = !isOpen;
        win.style.display = isOpen ? 'flex' : 'none';
        if (isOpen) input.focus();
    };

    closeBtn.onclick = () => {
        isOpen = false;
        win.style.display = 'none';
    };

    sendBtn.onclick = sendChat;
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });
})();

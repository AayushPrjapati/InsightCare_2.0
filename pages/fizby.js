// Predefined buddy responses for common chats
const responses = {
    "hello": "Hey there! 👋 What's up?",
    "hi": "Hi friend! How's your day been so far?",
    "hey": "Hey hey! Good to see you. What's on your mind? ✨",
    "how are you": "I'm doing great, just chilling and waiting to chat! How about you? ✨",
    "what is your name": "I'm Fitzy! Your friendly neighborhood buddy. 🦸‍♂️ And honestly, I'm just here for you.",
    "joke": "Okay, here's one: What do you call a fake noodle? An impasta! 🍝😂 ...I'll see myself out.",
    "sad": "Oh no, I'm really sorry you're feeling that way. 🥺 Want to talk about what's bringing you down? I'm all ears. 💙",
    "vent": "Go for it. This is a 100% judgment-free zone. Let it all out, I'm here listening.",
    "anxious": "Let's take a deep breath together... Inhale... Exhale... 🌬️ It's completely okay to feel overwhelmed sometimes. I'm right here.",
    "tired": "Make sure you're resting! Your body works hard and you deserve a break. 🛋️",
    "health": "Health is super important but baby steps are key. Don't be too hard on yourself. Make sure you drink some water today! 💧",
    "bye": "Catch you later! Don't hesitate to drop by if you want to chat again. Take care! ✌️",
    "default": "Hmm, tell me more about that! 🤔 (I'm still learning, but I love listening!)"
};

// Quick reply suggestions for the user
const quickReplies = [
    "I need to vent 🗣️",
    "Tell me a joke 😄",
    "Feeling anxious..."
];

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
    // Focus the input
    document.getElementById("user-input").focus();
    
    // Add quick replies initially
    showQuickReplies();

    const inputArea = document.getElementById("user-input");
    
    // Monitor input to disable/enable send button visually
    inputArea.addEventListener("input", function() {
        const sendBtn = document.getElementById("send-btn");
        if(this.value.trim() !== "") {
            sendBtn.classList.add("bg-brand-600");
            sendBtn.classList.remove("bg-brand-500");
        } else {
            sendBtn.classList.add("bg-brand-500");
            sendBtn.classList.remove("bg-brand-600");
        }
    });

    // Handle scroll physics on chat load
    scrollToBottom();
});

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Shows floating quick reply buttons
function showQuickReplies() {
    const container = document.getElementById("quick-replies");
    container.innerHTML = "";
    
    quickReplies.forEach(reply => {
        const btn = document.createElement("button");
        btn.className = "px-4 py-2 bg-white/80 backdrop-blur-md border border-brand-100 text-brand-600 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-white hover:border-brand-200 transition-all pointer-events-auto pop-in";
        btn.innerText = reply;
        btn.onclick = () => {
            document.getElementById("user-input").value = reply.replace(/[^a-zA-Z\s]/g, '').trim(); // Remove emoji for cleaner search, though it can stay in UI
            document.getElementById("user-input").value = reply; // Actually just send the exact text
            sendMessage();
        };
        container.appendChild(btn);
    });
}

function clearQuickReplies() {
    const container = document.getElementById("quick-replies");
    container.innerHTML = "";
}

function sendMessage() {
    const userInputElement = document.getElementById("user-input");
    const userInput = userInputElement.value;
    
    if (userInput.trim() === "") return;

    // Clear quick replies once user starts talking
    clearQuickReplies();

    // Add user message to chatbox
    addMessage(userInput, "user");

    // Clear input field
    userInputElement.value = "";
    document.getElementById("user-input").focus();

    // Show typing indicator
    showTypingIndicator();

    // Calculate dynamic response time to feel natural (1 - 2.5s)
    const delay = 1000 + (Math.random() * 1500);

    // Get bot response
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getResponse(userInput);
        addMessage(botResponse, "bot");
    }, delay);
}

function addMessage(text, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageWrapper = document.createElement("div");
    
    // Format timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if(sender === "user") {
        messageWrapper.className = "flex justify-end animate-pop-in mb-1 w-full";
        messageWrapper.innerHTML = `
            <div class="flex flex-col items-end max-w-[85%] sm:max-w-[75%]">
                <div class="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-[0_4px_14px_rgba(59,130,246,0.25)] text-[15px] leading-relaxed relative">
                    ${text}
                </div>
                <span class="text-[11px] text-slate-400 mt-1 font-medium mr-1">${timeString}</span>
            </div>
        `;
    } else {
        messageWrapper.className = "flex items-end gap-3 max-w-[85%] sm:max-w-[75%] animate-pop-in mb-1 w-full";
        messageWrapper.innerHTML = `
            <div class="w-8 h-8 rounded-full flex-shrink-0 bg-white shadow-sm overflow-hidden p-1 self-end mb-5">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Lucky" alt="Fitzy">
            </div>
            <div class="flex flex-col items-start w-full">
                <div class="bg-white text-slate-700 px-5 py-3.5 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 text-[15px] leading-relaxed">
                    ${text}
                </div>
                <span class="text-[11px] text-slate-400 mt-1 font-medium ml-1">${timeString}</span>
            </div>
        `;
    }
    
    chatbox.appendChild(messageWrapper);
    scrollToBottom();
}

function showTypingIndicator() {
    const chatbox = document.getElementById("chatbox");
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
    indicator.className = "flex items-end gap-3 max-w-[85%] sm:max-w-[75%] animate-pop-in mb-1 mt-2 w-full";
    indicator.innerHTML = `
        <div class="w-8 h-8 rounded-full flex-shrink-0 bg-white shadow-sm overflow-hidden p-1 self-end mb-1">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Lucky" alt="Fitzy">
        </div>
        <div class="bg-white px-4 py-4 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 flex items-center gap-1.5 h-12 w-16 justify-center">
            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
            <div class="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
        </div>
    `;
    chatbox.appendChild(indicator);
    scrollToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if(indicator) {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(10px)';
        indicator.style.transition = 'all 0.2s ease-out';
        setTimeout(() => indicator.remove(), 200);
    }
}

function getResponse(input) {
    // Strip emojis for matching
    input = input.replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim().toLowerCase();
    
    for(const key in responses) {
        if(input.includes(key) && key !== "default") {
            return responses[key];
        }
    }
    return responses["default"];
}

function scrollToBottom() {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTo({
        top: chatbox.scrollHeight,
        behavior: 'smooth'
    });
}

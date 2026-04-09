<<<<<<< HEAD
// Predefined responses for common questions
const responses = {
    "hello": "Hello! I'm Fitzy, your personal health AI. How can I assist you today?",
    "hi": "Hi there! How can I help you?",
    "how are you": "I'm always running optimally, thanks for asking! Need any health advice?",
    "what is your name": "I'm Fitzy, your AI healthcare assistant from InsightCare.",
    "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field... but remember to get some sun for Vitamin D!",
    "headache": "I'm sorry you're dealing with a headache. Make sure you're hydrated and rested. If it persists, consider a Quick Consultation.",
    "diet": "A balanced diet rich in leafy greens, lean protein, and complex carbs is great! Consider logging your meals in the MediTools section.",
    "bye": "Goodbye! Stay healthy and have a great day!",
    "default": "I'm still learning and might not understand that. Rephrase, or try saying 'hello' or asking about 'diet'."
};

=======
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

>>>>>>> 4d2fe5e (Enhanced Features)
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

<<<<<<< HEAD
// Function to send a message
function sendMessage() {
    const userInputElement = document.getElementById("user-input");
    const userInput = userInputElement.value;
    if (userInput.trim() === "") return;

=======
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

>>>>>>> 4d2fe5e (Enhanced Features)
    // Add user message to chatbox
    addMessage(userInput, "user");

    // Clear input field
    userInputElement.value = "";
<<<<<<< HEAD
=======
    document.getElementById("user-input").focus();
>>>>>>> 4d2fe5e (Enhanced Features)

    // Show typing indicator
    showTypingIndicator();

<<<<<<< HEAD
=======
    // Calculate dynamic response time to feel natural (1 - 2.5s)
    const delay = 1000 + (Math.random() * 1500);

>>>>>>> 4d2fe5e (Enhanced Features)
    // Get bot response
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getResponse(userInput);
        addMessage(botResponse, "bot");
<<<<<<< HEAD
    }, 1000 + Math.random() * 500); // Random delay to feel human
}

// Function to add a message to the chatbox
=======
    }, delay);
}

>>>>>>> 4d2fe5e (Enhanced Features)
function addMessage(text, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageWrapper = document.createElement("div");
    
<<<<<<< HEAD
    if(sender === "user") {
        messageWrapper.className = "flex justify-end animate-fade-in-up mb-4";
        messageWrapper.innerHTML = `
            <div class="bg-brand-500 text-white p-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%] inline-block text-sm">
                ${text}
            </div>
        `;
    } else {
        messageWrapper.className = "flex justify-start animate-fade-in-up mb-4";
        messageWrapper.innerHTML = `
            <div class="flex items-end gap-2 max-w-[80%]">
                <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 text-sm">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div class="bg-white border border-slate-100 text-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm">
                    ${text}
                </div>
=======
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
>>>>>>> 4d2fe5e (Enhanced Features)
            </div>
        `;
    }
    
    chatbox.appendChild(messageWrapper);
<<<<<<< HEAD
    chatbox.scrollTop = chatbox.scrollHeight;  // Auto-scroll
=======
    scrollToBottom();
>>>>>>> 4d2fe5e (Enhanced Features)
}

function showTypingIndicator() {
    const chatbox = document.getElementById("chatbox");
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
<<<<<<< HEAD
    indicator.className = "flex justify-start animate-fade-in-up mb-4";
    indicator.innerHTML = `
        <div class="flex items-end gap-2 max-w-[80%]">
            <div class="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 text-sm">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="bg-white border border-slate-100 text-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm text-sm flex gap-1 items-center h-12">
                <span class="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style="animation-duration: 0.6s"></span>
                <span class="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style="animation-delay: 0.2s; animation-duration: 0.6s"></span>
                <span class="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style="animation-delay: 0.4s; animation-duration: 0.6s"></span>
            </div>
        </div>
    `;
    chatbox.appendChild(indicator);
    chatbox.scrollTop = chatbox.scrollHeight;
=======
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
>>>>>>> 4d2fe5e (Enhanced Features)
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if(indicator) {
<<<<<<< HEAD
        indicator.remove();
    }
}

// Function to retrieve bot response
function getResponse(input) {
    input = input.toLowerCase().trim();
    // basic matching
=======
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(10px)';
        indicator.style.transition = 'all 0.2s ease-out';
        setTimeout(() => indicator.remove(), 200);
    }
}

function getResponse(input) {
    // Strip emojis for matching
    input = input.replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim().toLowerCase();
    
>>>>>>> 4d2fe5e (Enhanced Features)
    for(const key in responses) {
        if(input.includes(key) && key !== "default") {
            return responses[key];
        }
    }
    return responses["default"];
}
<<<<<<< HEAD
=======

function scrollToBottom() {
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTo({
        top: chatbox.scrollHeight,
        behavior: 'smooth'
    });
}
>>>>>>> 4d2fe5e (Enhanced Features)

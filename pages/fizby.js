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

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Function to send a message
function sendMessage() {
    const userInputElement = document.getElementById("user-input");
    const userInput = userInputElement.value;
    if (userInput.trim() === "") return;

    // Add user message to chatbox
    addMessage(userInput, "user");

    // Clear input field
    userInputElement.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Get bot response
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getResponse(userInput);
        addMessage(botResponse, "bot");
    }, 1000 + Math.random() * 500); // Random delay to feel human
}

// Function to add a message to the chatbox
function addMessage(text, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageWrapper = document.createElement("div");
    
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
            </div>
        `;
    }
    
    chatbox.appendChild(messageWrapper);
    chatbox.scrollTop = chatbox.scrollHeight;  // Auto-scroll
}

function showTypingIndicator() {
    const chatbox = document.getElementById("chatbox");
    const indicator = document.createElement("div");
    indicator.id = "typing-indicator";
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
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if(indicator) {
        indicator.remove();
    }
}

// Function to retrieve bot response
function getResponse(input) {
    input = input.toLowerCase().trim();
    // basic matching
    for(const key in responses) {
        if(input.includes(key) && key !== "default") {
            return responses[key];
        }
    }
    return responses["default"];
}

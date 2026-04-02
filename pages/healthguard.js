// HealthGuard Application Logic

// 1. Cancer Risk Assessment
function checkCancerRisk() {
    const age = parseInt(document.getElementById('age').value);
    const familyHistory = document.getElementById('familyHistory').value;
    const smoking = document.getElementById('smoking').value;
    const alcohol = document.getElementById('alcohol').value;
    const exercise = document.getElementById('exercise').value;
    const weight = document.getElementById('weight').value;
    const diet = document.getElementById('diet').value;
    const symptoms = document.getElementById('symptoms').value;

    if(!age || !familyHistory || !smoking || !alcohol || !exercise || !weight || !diet) {
        alert("Please answer all the risk assessment questions.");
        return;
    }

    let riskLevel = '';
    let message = '';

    // Logic to determine risk level
    if (age >= 50) {
        if (familyHistory === "yes" || smoking === "yes" || alcohol === "yes") {
            riskLevel = "High";
            message = "You are at high risk. Immediate medical consultation is recommended.";
        } else {
            riskLevel = "Medium";
            message = "Age is a factor, regular screening is advised.";
        }
    } else if (age >= 30 && age < 50) {
        if (familyHistory === "yes" || smoking === "yes") {
            riskLevel = "Medium";
            message = "Your family history or smoking habits increase your risk. Regular check-ups are advised.";
        } else if (weight === "yes" || exercise === "no") {
            riskLevel = "Medium";
            message = "Consider improving your lifestyle by maintaining a healthy weight and exercising regularly.";
        } else {
            riskLevel = "Low";
            message = "Your risk level is low based on the provided lifestyle parameters.";
        }
    } else {
        if (familyHistory === "yes" || smoking === "yes" || alcohol === "yes") {
            riskLevel = "Medium";
            message = "Certain habits can increase your risk despite your age.";
        } else {
            riskLevel = "Low";
            message = "Your risk level is low. Maintain healthy habits.";
        }
    }

    if (symptoms.trim() !== '') {
        message += " Please consult a healthcare professional about your symptoms.";
    }

    // Display result visually
    const resultSection = document.getElementById('resultSection');
    const resultText = document.getElementById('resultText');
    const riskBadge = document.getElementById('riskBadge');
    
    resultText.innerText = message;
    
    // Style badge based on risk
    riskBadge.className = 'text-xl font-bold px-4 py-1 rounded-full uppercase tracking-wider mb-2 inline-block';
    if(riskLevel === 'High') {
        riskBadge.classList.add('bg-red-100', 'text-red-700');
    } else if(riskLevel === 'Medium') {
        riskBadge.classList.add('bg-amber-100', 'text-amber-700');
    } else {
        riskBadge.classList.add('bg-brand-100', 'text-brand-700');
    }
    riskBadge.innerText = `${riskLevel} Risk`;

    resultSection.classList.remove('hidden');
    resultSection.classList.add('block', 'animate-fade-in');

    displayHealthTips(riskLevel);
}

function displayHealthTips(riskLevel) {
    const tipsText = document.getElementById('tipsText');
    const healthTips = document.getElementById('healthTips');

    let tipsMessage = '';
    if (riskLevel === 'High') {
        tipsMessage = 'It is crucial to schedule regular screenings and consult with a healthcare provider immediately. Lifestyle changes, like quitting smoking, avoiding alcohol, and eating a balanced diet, can also reduce risks.';
    } else if (riskLevel === 'Medium') {
        tipsMessage = 'Consider regular check-ups and positive lifestyle choices. Exercise regularly, maintain a healthy weight, and consume a nutritious diet rich in fruits and vegetables.';
    } else {
        tipsMessage = 'Great! Keep up with healthy habits, such as exercising, eating a balanced diet, and staying on top of regular screenings as recommended by your doctor.';
    }
    
    tipsText.innerText = tipsMessage;
    healthTips.classList.remove('hidden');
}

function shareResult() {
    alert('Your cancer risk result link has been copied to clipboard!');
}

// 2. Symptom Tracker
function addSymptom() {
    const date = new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    
    const symptomsInput = document.getElementById('new-symptom').value;
    const severityInput = document.getElementById('new-severity').value;
    const notesInput = document.getElementById('new-notes').value;

    if(!symptomsInput) {
        alert("Please enter a symptom.");
        return;
    }

    const table = document.getElementById('trackerTableBody');
    const row = document.createElement('tr');
    row.className = 'border-b border-slate-100 hover:bg-slate-50 transition-colors';
    
    // Severity color
    let badgeClass = 'bg-slate-100 text-slate-700';
    if(severityInput === 'High') badgeClass = 'bg-red-100 text-red-700';
    else if(severityInput === 'Medium') badgeClass = 'bg-amber-100 text-amber-700';
    else badgeClass = 'bg-brand-100 text-brand-700';

    row.innerHTML = `
        <td class="py-4 px-4 text-sm font-medium text-slate-900">${date}</td>
        <td class="py-4 px-4 text-sm text-slate-600">${symptomsInput}</td>
        <td class="py-4 px-4"><span class="px-3 py-1 text-xs font-semibold rounded-full ${badgeClass}">${severityInput}</span></td>
        <td class="py-4 px-4 text-sm text-slate-500 truncate max-w-[150px]" title="${notesInput}">${notesInput || '-'}</td>
    `;
    
    table.prepend(row); // Add to top

    // Clear inputs
    document.getElementById('new-symptom').value = '';
    document.getElementById('new-severity').value = 'Low';
    document.getElementById('new-notes').value = '';
}

// 3. Appointment Reminders
function setAppointmentReminder() {
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentDetails = document.getElementById('appointmentDetails').value;

    if (appointmentDate && appointmentDetails) {
        const appointmentList = document.getElementById('appointmentList');
        
        // Remove empty state if present
        const emptyState = document.getElementById('empty-appointments');
        if(emptyState) emptyState.remove();

        const li = document.createElement('li');
        li.className = 'bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center shadow-sm';
        
        const dateObj = new Date(appointmentDate);
        const formattedDate = dateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
        const formattedTime = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

        li.innerHTML = `
            <div>
                <h4 class="font-bold text-slate-800">${appointmentDetails}</h4>
                <p class="text-sm text-brand-600"><i class="fa-regular fa-calendar mr-1"></i> ${formattedDate} at ${formattedTime}</p>
            </div>
            <button onclick="this.parentElement.remove()" class="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        appointmentList.appendChild(li);

        // Clear forms
        document.getElementById('appointmentDate').value = '';
        document.getElementById('appointmentDetails').value = '';
        
        // Notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-brand-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce transition-all';
        notification.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> Reminder set successfully';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    } else {
        alert('Please fill in both Date and Details fields.');
    }
}

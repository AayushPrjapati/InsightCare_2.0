const isSighnedIN = false; 

function switchTab(tabName) {
    // Hide all indicator views
    const tabContents = document.querySelectorAll('.indicator-view');
    tabContents.forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('block');
    });

    // Remove active styles from all buttons
    const tabs = document.querySelectorAll('.indicator-tab');
    tabs.forEach(tab => {
        tab.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
        tab.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-50');
    });

    // Show selected view
    const view = document.getElementById(tabName);
    if(view) {
        view.classList.remove('hidden');
        view.classList.add('block');
        // trigger animation
        const animatedContent = view.querySelector('.content-anim');
        if(animatedContent) {
            animatedContent.classList.remove('animate-fade-in-up');
            void animatedContent.offsetWidth; // trigger reflow
            animatedContent.classList.add('animate-fade-in-up');
        }
    }

    // Add active styles to clicked tab
    const activeTab = document.querySelector(`.indicator-tab[onclick="switchTab('${tabName}')"]`);
    if(activeTab) {
        activeTab.classList.add('bg-brand-500', 'text-white', 'shadow-md');
        activeTab.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50');
    }

    // clear global result
    document.getElementById("global-result").innerHTML = "";
    document.getElementById("global-result").classList.add('hidden');
}

function checkHealth(indicator) {
    let value, resultMessage;
    const resultBox = document.getElementById("global-result");
    resultBox.classList.remove('hidden', 'bg-red-50', 'bg-green-50', 'border-red-200', 'border-green-200');
    resultBox.classList.add('bg-slate-50', 'border-slate-200');
    
    const inputElement = document.getElementById(`${indicator}-value`);
    const inputValue = inputElement ? inputElement.value.trim() : '';

    if (!inputValue) {
        resultBox.innerHTML = '<div class="text-amber-500 flex items-center gap-2 font-medium"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a value to check.</div>';
        resultBox.classList.remove('hidden');
        resultBox.classList.add('bg-amber-50', 'border-amber-200');
        return;
    }

    // Simulate loading
    resultBox.innerHTML = '<div class="flex items-center gap-3 text-brand-600"><i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing biometrics...</div>';
    resultBox.classList.remove('hidden');

    setTimeout(() => {
        let isNormal = false;
        
        switch (indicator) {
            case 'bmi':
                value = parseFloat(inputValue);
                if (isNaN(value)) {
                    resultMessage = 'Please enter a valid BMI number.';
                } else if (value >= 18.5 && value <= 24.9) {
                    isNormal = true;
                    resultMessage = `Your BMI (${value}) is within the normal range.`;
                } else if (value < 18.5) {
                    resultMessage = `Your BMI (${value}) indicates you are underweight.`;
                } else {
                    resultMessage = `Your BMI (${value}) indicates you are overweight/obese.`;
                }
                break;

            case 'bloodPressure':
                if (/^\d{2,3}\/\d{2,3}$/.test(inputValue)) {
                    const [systolic, diastolic] = inputValue.split('/').map(Number);
                    if (systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90) {
                        resultMessage = `Your blood pressure (${inputValue}) is outside the normal range.`;
                    } else {
                        isNormal = true;
                        resultMessage = `Your blood pressure (${inputValue}) is normal.`;
                    }
                } else {
                    resultMessage = 'Invalid format. Use Systolic/Diastolic (e.g., 120/80).';
                }
                break;

            case 'cholesterol':
                value = parseFloat(inputValue);
                if (isNaN(value)) {
                    resultMessage = 'Please enter a valid cholesterol number.';
                } else if (value < 200) {
                    isNormal = true;
                    resultMessage = `Your cholesterol (${value} mg/dL) is normal.`;
                } else {
                    resultMessage = `Your cholesterol (${value} mg/dL) is high.`;
                }
                break;

            case 'bloodSugar':
                value = parseFloat(inputValue);
                if (isNaN(value)) {
                    resultMessage = 'Please enter a valid blood sugar number.';
                } else if (value >= 70 && value <= 130) {
                    isNormal = true;
                    resultMessage = `Your fasting blood sugar (${value} mg/dL) is normal.`;
                } else {
                    resultMessage = `Your fasting blood sugar (${value} mg/dL) is abnormal.`;
                }
                break;

            case 'waistHip':
                value = parseFloat(inputValue);
                if (isNaN(value)) {
                    resultMessage = 'Please enter a valid ratio.';
                } else if (value < 0.85) {
                    isNormal = true;
                    resultMessage = `Your waist-to-hip ratio (${value}) is normal (female standard).`;
                } else if (value < 0.90) {
                    isNormal = true;
                    resultMessage = `Your waist-to-hip ratio (${value}) is normal (male standard).`;
                } else {
                    resultMessage = `Your waist-to-hip ratio (${value}) is high, indicating higher health risks.`;
                }
                break;

            case 'restingHeartRate':
                value = parseInt(inputValue);
                if (isNaN(value)) {
                    resultMessage = 'Please enter a valid heart rate.';
                } else if (value >= 60 && value <= 100) {
                    isNormal = true;
                    resultMessage = `Your resting heart rate (${value} bpm) is normal.`;
                } else {
                    resultMessage = `Your resting heart rate (${value} bpm) is outside the normal range.`;
                }
                break;

            default:
                resultMessage = 'Invalid input. Please try again.';
        }

        resultBox.classList.remove('bg-slate-50', 'border-slate-200');
        if(isNormal) {
            resultBox.classList.add('bg-emerald-50', 'border-emerald-200');
            resultBox.innerHTML = `<div class="text-emerald-700 flex items-start gap-3"><i class="fa-solid fa-circle-check mt-1 text-emerald-500"></i><div><p class="font-bold">Normal Result</p><p>${resultMessage}</p></div></div>`;
        } else {
            resultBox.classList.add('bg-red-50', 'border-red-200');
            resultBox.innerHTML = `<div class="text-red-700 flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation mt-1 text-red-500"></i><div><p class="font-bold">Attention Needed</p><p>${resultMessage}</p></div></div>`;
        }

    }, 800);
}

function addToDailyReport(indicator) {
    const resultBox = document.getElementById("global-result");
    resultBox.classList.remove('hidden', 'bg-red-50', 'bg-emerald-50');
    
    if (!isSighnedIN) {
        resultBox.classList.add('bg-amber-50', 'border-amber-200');
        resultBox.innerHTML = `<div class="text-amber-700 flex items-start gap-3"><i class="fa-solid fa-lock mt-1"></i><div><p class="font-bold">Authentication Required</p><p>Please Register or Login to MindfulMed to log your readings securely.</p></div></div>`;
        return;
    }

    // Normally would send to backend...
}

// init
window.onload = () => {
    switchTab('bmi');
};

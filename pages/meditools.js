const isSighnedIN = false; 
let localLogs = JSON.parse(localStorage.getItem('meditoolsLogs') || '[]');

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
            void animatedContent.offsetWidth; 
            animatedContent.classList.add('animate-fade-in-up');
        }
    }

    // Add active styles to clicked tab
    const activeTab = document.querySelector(`.indicator-tab[onclick="switchTab('${tabName}')"]`);
    if(activeTab) {
        activeTab.classList.add('bg-brand-500', 'text-white', 'shadow-md');
        activeTab.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50', 'bg-transparent');
    }

    // Mobile UX: Scroll down to content and auto-close details menu
    if (window.innerWidth < 768) {
        setTimeout(() => {
            const contentArea = document.getElementById('main-content-area');
            if (contentArea) contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            if (tabName !== 'fullAssessment') {
                const details = document.getElementById('details-individual');
                if (details) details.removeAttribute('open');
            }
        }, 50);
    }

    // clear global result boxes and reports
    const resultBox = document.getElementById("global-result");
    if(resultBox) {
        resultBox.innerHTML = "";
        resultBox.classList.add('hidden');
    }
    
    // hide all-in-one results if switching tabs
    const scoreResult = document.getElementById('score-result');
    if(scoreResult) scoreResult.classList.add('hidden');
    
    const reportBox = document.getElementById('detailed-report');
    if(reportBox) reportBox.classList.add('hidden');
}

// ----- Auto Calculation Logic for All-In-One Form -----
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('auto-calc')) {
        // BMI Calc
        const h = parseFloat(document.getElementById('all-height').value);
        const w = parseFloat(document.getElementById('all-weight').value);
        const bmiDisplay = document.getElementById('all-bmi-display');
        if(bmiDisplay) {
            if (h && w) {
                const hMeters = h / 100;
                const bmi = (w / (hMeters * hMeters)).toFixed(1);
                bmiDisplay.innerText = `BMI: ${bmi}`;
            } else {
                bmiDisplay.innerText = '';
            }
        }
    }

    // Sleep Calc All-In-One
    if(e.target.classList.contains('sleep-time-all')) {
        calculateSleepDuration('all');
    }
    // Sleep Calc Single
    if(e.target.classList.contains('sleep-time-single')) {
        calculateSleepDuration('single');
    }
});

let sleepMode = { all: 'direct', single: 'direct' };

function toggleSleepMode(context) {
    const directWrap = document.getElementById(`${context}-sleep-direct-wrap`);
    const calcWrap = document.getElementById(`${context}-sleep-calc-wrap`);
    const directInput = document.getElementById(`${context}-sleep`);
    const display = document.getElementById(`${context}-sleep-display`);

    if (sleepMode[context] === 'direct') {
        sleepMode[context] = 'calc';
        directWrap.classList.add('hidden');
        directWrap.classList.remove('block');
        calcWrap.classList.remove('hidden');
        calcWrap.classList.add('flex');
        directInput.value = ''; // clear direct
        if (display) display.classList.remove('hidden');
    } else {
        sleepMode[context] = 'direct';
        calcWrap.classList.add('hidden');
        calcWrap.classList.remove('flex');
        directWrap.classList.remove('hidden');
        directWrap.classList.add('block');
        document.getElementById(`${context}-sleep-start`).value = '';
        document.getElementById(`${context}-sleep-end`).value = '';
        if (display) {
            display.classList.add('hidden');
            display.innerText = '';
        }
    }
}

function calculateSleepDuration(context) {
    const start = document.getElementById(`${context}-sleep-start`).value;
    const end = document.getElementById(`${context}-sleep-end`).value;
    const directInput = document.getElementById(`${context}-sleep`);
    const display = document.getElementById(`${context}-sleep-display`);

    if (start && end) {
        let [startH, startM] = start.split(':').map(Number);
        let [endH, endM] = end.split(':').map(Number);
        
        // Handle midnight crossing
        if (endH < startH || (endH === startH && endM < startM)) {
            endH += 24;
        }

        const totalHours = (endH - startH) + (endM - startM) / 60;
        const rounded = totalHours.toFixed(1);
        
        directInput.value = rounded; // secretly store it in the original input
        if (display) display.innerText = `${rounded} Hrs`;
    }
}

let reportDataStore = []; // holds the breakdown strings

function toggleDetailedReport() {
    const reportBox = document.getElementById('detailed-report');
    const chevron = document.getElementById('report-chevron');
    if(!reportBox) return;

    if (reportBox.classList.contains('hidden')) {
        reportBox.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
        renderReportItems('report-items', reportDataStore);
    } else {
        reportBox.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    }
}

function renderReportItems(containerId, dataArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = dataArray.length === 0 
        ? '<div class="p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 flex gap-3"><i class="fa-solid fa-circle-check mt-0.5"></i> Exceptional! No negative insights found.</div>'
        : dataArray.map(item => `
            <div class="p-3 bg-${item.color}-50 text-${item.color}-700 rounded-lg border border-${item.color}-100 flex items-start gap-3">
                <i class="fa-solid fa-${item.icon} mt-0.5 shadow-sm text-lg w-5 text-center"></i>
                <div>
                    <span class="font-bold block">${item.title}</span>
                    <span class="opacity-90">${item.desc}</span>
                </div>
            </div>
        `).join('');
}


function calculateOverallScore() {
    // Get all new inputs
    const h = parseFloat(document.getElementById('all-height').value);
    const w = parseFloat(document.getElementById('all-weight').value);
    const bp = document.getElementById('all-bp').value.trim();
    const hr = parseFloat(document.getElementById('all-hr').value);
    const spo2 = parseFloat(document.getElementById('all-spo2').value);
    const temp = parseFloat(document.getElementById('all-temp').value);
    const sugar = parseFloat(document.getElementById('all-sugar').value);
    const sleep = parseFloat(document.getElementById('all-sleep').value);

    if (!h && !w && !bp && !hr && !spo2 && !temp && !sugar && !sleep) {
        alert("Please fill at least one metric to generate a daily log.");
        return;
    }

    let score = 100;
    reportDataStore = []; // reset report

    // BMI penalty & tracking
    if (h && w) {
        const hMeters = h / 100;
        const bmi = parseFloat((w / (hMeters * hMeters)).toFixed(1));
        if (bmi < 18.5) {
            score -= 5;
            reportDataStore.push({color: 'amber', icon: 'weight-scale', title: 'Underweight', desc: `Your BMI is ${bmi}, which is below normal weight.`});
        } else if (bmi >= 25 && bmi < 30) {
            score -= 5;
            reportDataStore.push({color: 'amber', icon: 'weight-scale', title: 'Overweight', desc: `Your BMI is ${bmi}. Consider a balanced diet and regular exercise.`});
        } else if (bmi >= 30) {
            score -= 10;
            reportDataStore.push({color: 'red', icon: 'weight-scale', title: 'Obesity Class', desc: `Your BMI is ${bmi}. Consult a doctor for a health plan.`});
        } else {
            reportDataStore.push({color: 'emerald', icon: 'weight-scale', title: 'Optimal Weight', desc: `Your BMI is ${bmi}, which is right in the healthy pocket (18.5 - 24.9).`});
        }
    }

    // BP penalty & tracking
    if (bp) {
        if (/^\d{2,3}\/\d{2,3}$/.test(bp)) {
            const [sys, dia] = bp.split('/').map(Number);
            if (sys > 140 || dia > 90) {
                score -= 15;
                reportDataStore.push({color: 'red', icon: 'heart-crack', title: 'High BP (Hypertension)', desc: `BP ${bp} is significantly elevated. Medical advice is recommended immediately.`});
            } else if (sys > 120 || dia > 80) {
                score -= 8;
                reportDataStore.push({color: 'amber', icon: 'heart-crack', title: 'Elevated BP', desc: `BP ${bp} is higher than the normal target of <120/80.`});
            } else if (sys < 90 || dia < 60) {
                score -= 8;
                reportDataStore.push({color: 'amber', icon: 'heart-crack', title: 'Low BP (Hypotension)', desc: `BP ${bp} is considered low.`});
            } else {
                reportDataStore.push({color: 'emerald', icon: 'heart-circle-check', title: 'Excellent Blood Pressure', desc: `BP ${bp} is perfectly within healthy targets.`});
            }
        } else {
            alert("Invalid Blood Pressure format. Please use Sys/Dia (e.g. 120/80).");
            return;
        }
    }

    // HR penalty & tracking
    if (hr) {
        if (hr < 50) {
            score -= 5;
            reportDataStore.push({color: 'amber', icon: 'heart-pulse', title: 'Low Heart Rate', desc: `Resting HR of ${hr} bpm is quite low, unless you are an athlete.`});
        } else if (hr > 100) {
            score -= 10;
            reportDataStore.push({color: 'red', icon: 'heart-pulse', title: 'High Heart Rate', desc: `Resting HR of ${hr} bpm is high (Tachycardia).`});
        } else {
            reportDataStore.push({color: 'emerald', icon: 'heart-pulse', title: 'Healthy Heart Rate', desc: `${hr} bpm indicates excellent resting cardiovascular health.`});
        }
    }

    // SpO2 penalty & tracking
    if (spo2) {
        if (spo2 < 90) {
            score -= 20;
            reportDataStore.push({color: 'red', icon: 'lungs', title: 'Critical SpO2', desc: `Oxygen saturation at ${spo2}% is alarmingly low. Seek urgent medical attention.`});
        } else if (spo2 < 95) {
            score -= 10;
            reportDataStore.push({color: 'amber', icon: 'lungs', title: 'Low SpO2', desc: `Oxygen saturation at ${spo2}% is below optimal (95-100%).`});
        } else {
            reportDataStore.push({color: 'emerald', icon: 'lungs', title: 'Optimal Oxygenation', desc: `SpO2 at ${spo2}% shows your blood is fully saturated with oxygen.`});
        }
    }

    // Temp tracking
    if (temp) {
        if (temp > 38) {
            score -= 15;
            reportDataStore.push({color: 'red', icon: 'temperature-high', title: 'High Fever', desc: `Body temperature ${temp}°C signifies a significant fever.`});
        } else if (temp >= 37.3) {
            score -= 5;
            reportDataStore.push({color: 'amber', icon: 'temperature-half', title: 'Low-grade Fever', desc: `Body temperature ${temp}°C is slightly elevated.`});
        } else if (temp < 35) {
            score -= 15;
            reportDataStore.push({color: 'red', icon: 'temperature-arrow-down', title: 'Hypothermia Risk', desc: `Body temperature ${temp}°C is dangerously low.`});
        } else {
            reportDataStore.push({color: 'emerald', icon: 'temperature-empty', title: 'Normal Temperature', desc: `Body temperature ${temp}°C is stable.`});
        }
    }

    // Blood Sugar tracking
    if (sugar) {
        if (sugar > 130) {
            score -= 10;
            reportDataStore.push({color: 'amber', icon: 'cubes-stacked', title: 'High Blood Sugar', desc: `Fasting glucose ${sugar} mg/dL is elevated above normal (70-100).`});
        } else if (sugar < 70) {
            score -= 10;
            reportDataStore.push({color: 'amber', icon: 'cubes-stacked', title: 'Low Blood Sugar (Hypoglycemia)', desc: `Fasting glucose ${sugar} mg/dL is too low.`});
        } else {
            reportDataStore.push({color: 'emerald', icon: 'cubes-stacked', title: 'Healthy Blood Glucose', desc: `Fasting glucose at ${sugar} mg/dL sits perfectly within healthy range.`});
        }
    }

    // Sleep tracking
    if (sleep) {
        if (sleep < 5) {
            score -= 10;
            reportDataStore.push({color: 'red', icon: 'bed', title: 'Sleep Deprivation', desc: `Only ${sleep} hours of sleep highly impacts daily recovery and immunity.`});
        } else if (sleep < 7) {
            score -= 5;
            reportDataStore.push({color: 'amber', icon: 'bed', title: 'Suboptimal Sleep', desc: `${sleep} hours is slightly below the recommended 7-9 hours.`});
        } else if (sleep > 11) {
            score -= 5;
            reportDataStore.push({color: 'amber', icon: 'bed', title: 'Oversleeping', desc: `Sleeping ${sleep} hours regularly can indicate underlying fatigue.`});
        } else {
            reportDataStore.push({color: 'emerald', icon: 'bed', title: 'Great Sleep Duration', desc: `${sleep} hours lands beautifully in the 7-9 hour nightly recommendation.`});
        }
    }

    if (score < 0) score = 0;

    // Display The Score Ring
    const resultDiv = document.getElementById('score-result');
    resultDiv.classList.remove('hidden');
    
    // Hide detailed UI if it was open
    document.getElementById('detailed-report').classList.add('hidden');
    document.getElementById('report-chevron').style.transform = 'rotate(0deg)';

    resultDiv.classList.remove('animate-fade-in-up');
    void resultDiv.offsetWidth;
    resultDiv.classList.add('animate-fade-in-up');

    // Animate ring
    const ring = document.getElementById('score-ring');
    const offset = 283 - (283 * score) / 100;
    
    ring.classList.remove('text-emerald-500', 'text-amber-500', 'text-red-500');
    let title = "", desc = "";
    if (score >= 90) {
        ring.classList.add('text-emerald-500');
        title = "Excellent Health!";
        desc = "Your daily metrics are fantastic. Click to view detailed report.";
    } else if (score >= 70) {
        ring.classList.add('text-amber-500');
        title = "Fair Health";
        desc = "Some metrics deviate. Click to view detailed report on the basis.";
    } else {
        ring.classList.add('text-red-500');
        title = "Attention Required";
        desc = "Significant metrics are outside bounds. Click to review evaluation.";
    }

    document.getElementById('score-title').innerText = title;
    document.getElementById('score-desc').innerText = desc;
    
    // animate number counter
    let currentScore = 0;
    const numDisplay = document.getElementById('score-number');
    const interval = setInterval(() => {
        if (currentScore >= score) {
            clearInterval(interval);
            numDisplay.innerText = score;
            ring.style.strokeDashoffset = offset;
        } else {
            currentScore += 2;
            if (currentScore > score) currentScore = score;
            numDisplay.innerText = currentScore;
        }
    }, 20);

    // Save to Log including reportDataStore!
    const logItem = {
        indicator: 'Daily Profile',
        value: score + '/100',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        reportData: [...reportDataStore]
    };
    localLogs.unshift(logItem); 
    if (localLogs.length > 15) localLogs.pop(); 
    localStorage.setItem('meditoolsLogs', JSON.stringify(localLogs));

    // Save Height/Weight defaults if provided
    if (h) localStorage.setItem('meditools_height', h);
    if (w) localStorage.setItem('meditools_weight', w);
    
    updateLogsDisplay();
}


// ----- Individual Tab Logic (Refactored for daily tools) -----
function checkHealthSingle(indicator) {
    let resultMessage, isNormal = false;
    reportDataStore = []; // reset single item report

    const resultBox = document.getElementById("global-result");
    resultBox.classList.remove('hidden', 'bg-red-50', 'bg-emerald-50', 'bg-amber-50', 'border-red-200', 'border-emerald-200', 'border-amber-200');
    
    let inputValueToSave = "";

    function showError(msg) {
        resultBox.classList.remove('hidden');
        resultBox.classList.add('bg-amber-50', 'border-amber-200');
        resultBox.innerHTML = `<div class="text-amber-700 flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation mt-1"></i><div><p class="font-bold">Error</p><p>${msg}</p></div></div>`;
    }

    switch (indicator) {
        case 'bmi':
            const h = parseFloat(document.getElementById('single-height').value);
            const w = parseFloat(document.getElementById('single-weight').value);
            if (!h || !w) { showError("Please enter both height and weight."); return; }
            const bmi = (w / ((h/100) * (h/100))).toFixed(1);
            inputValueToSave = bmi;
            if (bmi >= 18.5 && bmi <= 24.9) {
                isNormal = true;
                resultMessage = `Your BMI is ${bmi} (Normal).`;
                reportDataStore.push({color: 'emerald', icon: 'weight-scale', title: 'Optimal Weight', desc: `Your BMI is ${bmi}, perfectly in the healthy pocket.`});
            } else {
                resultMessage = `Your BMI is ${bmi} (Outside Normal Range).`;
                reportDataStore.push({color: 'red', icon: 'weight-scale', title: 'Weight Alert', desc: `Your BMI is ${bmi}, which requires attention based on standard guidelines.`});
            }
            localStorage.setItem('meditools_height', h);
            localStorage.setItem('meditools_weight', w);
            break;

        case 'bloodPressure':
            const bp = document.getElementById('single-bp').value.trim();
            if (!bp) { showError("Please enter BP."); return; }
            if (/^\d{2,3}\/\d{2,3}$/.test(bp)) {
                const [sys, dia] = bp.split('/').map(Number);
                inputValueToSave = bp;
                if (sys <= 120 && dia <= 80 && sys >= 90 && dia >= 60) {
                    isNormal = true;
                    resultMessage = `Your BP (${bp}) is optimal.`;
                    reportDataStore.push({color: 'emerald', icon: 'heart-circle-check', title: 'Excellent BP', desc: `Sys/Dia ${bp} falls entirely in the ideal zone.`});
                } else {
                    resultMessage = `Your BP (${bp}) requires attention.`;
                    reportDataStore.push({color: 'amber', icon: 'heart-crack', title: 'BP Out of Target', desc: `The measurement ${bp} implies elevated or excessively low pressure.`});
                }
            } else {
                showError("Invalid format."); return;
            }
            break;
            
        case 'restingHeartRate':
            const hr = parseFloat(document.getElementById('single-hr').value);
            if (!hr) { showError("Please enter heart rate."); return; }
            inputValueToSave = hr + ' bpm';
            if (hr >= 60 && hr <= 100) {
                isNormal = true;
                resultMessage = `Heart rate (${hr} bpm) is perfectly normal.`;
                reportDataStore.push({color: 'emerald', icon: 'heart-pulse', title: 'Healthy HR', desc: `Your resting heart rate is well-regulated.`});
            } else {
                resultMessage = `Heart rate (${hr} bpm) is out of bounds.`;
                reportDataStore.push({color: 'red', icon: 'heart-pulse', title: 'Irregular HR', desc: `Your heart rate implies stress or irregularities.`});
            }
            break;

        case 'spO2':
            const spo2 = parseFloat(document.getElementById('single-spo2').value);
            if (!spo2) { showError("Please enter SpO2 %."); return; }
            if (spo2 > 100) { showError("Max SpO2 is 100%."); return; }
            inputValueToSave = spo2 + '%';
            if (spo2 >= 95) {
                isNormal = true;
                resultMessage = `Blood Oxygen (${spo2}%) is healthy.`;
                reportDataStore.push({color: 'emerald', icon: 'lungs', title: 'Optimal Oxygen', desc: `Your blood is successfully saturated.`});
            } else {
                resultMessage = `Blood Oxygen (${spo2}%) is low!`;
                reportDataStore.push({color: 'red', icon: 'lungs', title: 'Low Oxygen Alert', desc: `SpO2 levels below 95% often require immediate verification.`});
            }
            break;

        case 'temperature':
            const temp = parseFloat(document.getElementById('single-temp').value);
            if (!temp) { showError("Please enter body temperature."); return; }
            inputValueToSave = temp + '°C';
            if (temp >= 36.1 && temp <= 37.2) {
                isNormal = true;
                resultMessage = `Body Temperature (${temp}°C) is normal.`;
                reportDataStore.push({color: 'emerald', icon: 'temperature-half', title: 'Normal Temp', desc: `You are showing no signs of fever.`});
            } else {
                resultMessage = `Your temperature (${temp}°C) implies risk.`;
                reportDataStore.push({color: 'red', icon: 'temperature-high', title: 'Fever or Hypothermia', desc: `Temperature is far from baseline regulation.`});
            }
            break;

        case 'bloodSugar':
            const bs = parseFloat(document.getElementById('single-sugar').value);
            if (!bs) { showError("Please enter blood sugar."); return; }
            inputValueToSave = bs + ' mg/dL';
            if (bs >= 70 && bs <= 100) {
                isNormal = true;
                resultMessage = `Fasting glucose (${bs} mg/dL) is normal.`;
                reportDataStore.push({color: 'emerald', icon: 'cubes-stacked', title: 'Stable Glucose', desc: `Your sugars sit perfectly within standard limits.`});
            } else {
                resultMessage = `Fasting glucose (${bs} mg/dL) needs attention.`;
                reportDataStore.push({color: 'amber', icon: 'cubes-stacked', title: 'Irregular Glucose', desc: `Your intake or fasting glucose is concerning.`});
            }
            break;

        case 'sleep':
            const sleep = parseFloat(document.getElementById('single-sleep').value);
            if (!sleep) { showError("Please enter sleep hours."); return; }
            inputValueToSave = sleep + ' hrs';
            if (sleep >= 7 && sleep <= 9) {
                isNormal = true;
                resultMessage = `You got ${sleep} hours of sleep, which is ideal!`;
                reportDataStore.push({color: 'emerald', icon: 'bed', title: 'Great Sleep', desc: `You hit the optimal 7-9hr window.`});
            } else {
                resultMessage = `You got ${sleep} hours of sleep, which is non-ideal.`;
                reportDataStore.push({color: 'amber', icon: 'bed', title: 'Poor Sleep Habits', desc: `You are heavily missing out on recovery or oversleeping.`});
            }
            break;
    }

    resultBox.classList.remove('hidden');
    resultBox.classList.remove('animate-fade-in-up');
    void resultBox.offsetWidth;
    resultBox.classList.add('animate-fade-in-up');

    if(isNormal) {
        resultBox.classList.add('bg-emerald-50', 'border-emerald-200');
        resultBox.innerHTML = `<div class="text-emerald-700 flex items-start gap-3"><i class="fa-solid fa-circle-check mt-1 text-emerald-500"></i><div><p class="font-bold">Normal Result</p><p>${resultMessage}</p></div></div>`;
    } else {
        resultBox.classList.add('bg-amber-50', 'border-amber-200');
        resultBox.innerHTML = `<div class="text-amber-700 flex items-start gap-3"><i class="fa-solid fa-triangle-exclamation mt-1 text-amber-500"></i><div><p class="font-bold">Attention Needed</p><p>${resultMessage}</p></div></div>`;
    }

    // Save to Log
    const logItem = {
        indicator: indicator,
        value: inputValueToSave,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        reportData: [...reportDataStore]
    };
    localLogs.unshift(logItem); 
    if (localLogs.length > 15) localLogs.pop(); 
    localStorage.setItem('meditoolsLogs', JSON.stringify(localLogs));
    
    updateLogsDisplay();
}

function clearLogs() {
    localLogs = [];
    localStorage.removeItem('meditoolsLogs');
    updateLogsDisplay();
}

function updateLogsDisplay() {
    const logsContainer = document.getElementById('recent-logs-list');
    if (!logsContainer) return;

    if (localLogs.length === 0) {
        logsContainer.innerHTML = '<p class="text-xs text-slate-400 italic">No history logged.</p>';
        return;
    }

    const labels = {
        'bmi': 'BMI',
        'bloodPressure': 'Blood Pressure',
        'restingHeartRate': 'Heart Rate',
        'spO2': 'SpO2 Oxygen',
        'temperature': 'Temperature',
        'bloodSugar': 'Glucose',
        'sleep': 'Sleep Duration',
        'Daily Profile': 'Daily Report'
    };

    logsContainer.innerHTML = localLogs.map((log, index) => `
        <div onclick="openHistoryModal(${index})" class="flex flex-col text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100 transition-all hover:bg-slate-100 group cursor-pointer hover:shadow-sm">
            <div class="flex justify-between items-center mb-1">
                <span class="font-bold ${log.indicator === 'Daily Profile' ? 'text-brand-600' : 'text-slate-700'} group-hover:text-brand-500 transition-colors">${labels[log.indicator] || log.indicator}</span>
                <span class="font-semibold text-slate-800">${log.value}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-[9px] text-slate-400 uppercase tracking-widest">${log.date}</span>
                <i class="fa-solid fa-chevron-right text-[8px] text-slate-300 group-hover:text-brand-400"></i>
            </div>
        </div>
    `).join('');
}


// --- History Modal Logic ---
function openHistoryModal(index) {
    const modal = document.getElementById('history-modal');
    const content = document.getElementById('history-modal-content');
    
    const log = localLogs[index];
    if(!log) return;
    
    // Set labels
    const labels = {
        'bmi': 'BMI Log', 'bloodPressure': 'BP Log', 'restingHeartRate': 'Heart Rate Log',
        'spO2': 'O2 Log', 'temperature': 'Temperature Log', 'bloodSugar': 'Glucose Log',
        'sleep': 'Sleep Tracker', 'Daily Profile': 'Full Assessment Report'
    };
    document.getElementById('hm-indicator').innerText = labels[log.indicator] || log.indicator;
    document.getElementById('hm-value').innerText = log.value;
    document.getElementById('hm-date').innerText = log.date;
    
    // Set breakdown basis
    const itemsData = log.reportData || [];
    renderReportItems('hm-report-items', itemsData);

    // Show modal
    modal.classList.remove('hidden');
    // slight delay for animation trigger
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
    }, 10);
}

function closeHistoryModal() {
    const modal = document.getElementById('history-modal');
    const content = document.getElementById('history-modal-content');
    
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300); // transition duration
}


// init
window.onload = () => {
    switchTab('fullAssessment');
    updateLogsDisplay();

    // Preferentially fill height and weight from previous saves
    const savedH = localStorage.getItem('meditools_height');
    const savedW = localStorage.getItem('meditools_weight');
    
    if (savedH) {
        document.getElementById('all-height').value = savedH;
        document.getElementById('single-height').value = savedH;
    }
    if (savedW) {
        document.getElementById('all-weight').value = savedW;
        document.getElementById('single-weight').value = savedW;
    }
    
    if (savedH && savedW) {
        const hMeters = parseFloat(savedH) / 100;
        const bmi = (parseFloat(savedW) / (hMeters * hMeters)).toFixed(1);
        const display = document.getElementById('all-bmi-display');
        if(display) display.innerText = `BMI: ${bmi}`;
    }
};

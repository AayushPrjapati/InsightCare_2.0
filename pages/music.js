function recommendMusic() {
    // Get selected values
    const disease = document.getElementById('disease').value;
    const ageGroup = document.getElementById('age').value;
    const gender = document.getElementById('sex').value;

    // Generate recommendations based on disease, age, and gender
    const recommendations = getRecommendations(disease, ageGroup, gender);

    // Display recommendations with premium styling
    const recommendationsDiv = document.getElementById('recommendations');
    
    let html = '<h3 class="text-xl font-bold text-slate-800 mb-4 border-b pb-2"><i class="fa-solid fa-headphones text-brand-500 mr-2"></i> Your Recommended Playlist</h3><ul class="space-y-3">';
    
    recommendations.forEach(song => {
        html += `
        <li class="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center shadow-sm hover:shadow-md hover:border-brand-200 transition-all hover:-translate-y-1 cursor-pointer">
            <div class="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-4 flex-shrink-0">
                <i class="fa-solid fa-music"></i>
            </div>
            <span class="text-slate-700 font-medium">${song}</span>
        </li>`;
    });
    
    html += '</ul>';
    
    recommendationsDiv.innerHTML = html;
    
    // Add scroll reveal effect directly
    recommendationsDiv.classList.remove('opacity-0', 'translate-y-4');
    recommendationsDiv.classList.add('opacity-100', 'translate-y-0');
}

function getRecommendations(disease, ageGroup, gender) {
    const recommendationList = [];
    const diseaseRecommendations = getDiseaseRecommendations(disease);
    recommendationList.push(...diseaseRecommendations);
    const ageRecommendations = getAgeRecommendations(ageGroup);
    recommendationList.push(...ageRecommendations);
    const genderRecommendations = getGenderRecommendations(gender);
    recommendationList.push(...genderRecommendations);
    return recommendationList;
}

function getDiseaseRecommendations(disease) {
    switch (disease) {
        case "stress": return ["Relaxing Nature Sounds - Nature's Lullaby", "Soft Instrumental Jazz - Relax and Unwind", "Guided Meditation Music - Deep Breathing Exercises"];
        case "anxiety": return ["Calming Piano Music - Serenity Now", "Ambient Electronic - Peaceful Waves", "Deep Breathing Music - Calm Your Nerves"];
        case "depression": return ["Uplifting Acoustic Songs - Joyful Moods", "Chilled Indie Music - Reflect and Heal", "Positive Vibes Playlist - Feel the Sunshine"];
        case "insomnia": return ["Rain Sounds for Sleep - Drift Off to Dreamland", "White Noise for Better Sleep - Restful Sleep", "Classical Music for Relaxation - Peaceful Slumbers"];
        case "bipolar": return ["Soothing Classical Music - Peace and Calm", "Relaxing Jazz - Smooth and Soothing", "Soft Rock Music - Comfort and Hope"];
        case "ptsd": return ["Calming Meditation Music - Mindful Moments", "Relaxing Soundscapes - Gentle Soothing Sounds", "Peaceful Ambient Sounds - Calm Your Mind"];
        case "eating-disorder": return ["Gentle Acoustic Music - Finding Inner Peace", "Soft Indie Tunes - Healing Energy", "Relaxing Nature Sounds - Grounding Yourself"];
        case "ocd": return ["Relaxing Ambient Music - Clear Your Mind", "Soothing Nature Sounds - Gentle Flow", "Guided Meditation Music - Letting Go of Tension"];
        case "addiction": return ["Calming Soundscapes - Let Go of the Past", "Positive Vibes - Healing Through Music", "Calming Meditation Music - Finding Balance"];
        default: return ["Peaceful Instrumental Music - Relax Your Mind"];
    }
}

function getAgeRecommendations(ageGroup) {
    switch (ageGroup) {
        case "child": return ["Fun and Upbeat Children's Songs - Joyful Tunes", "Relaxing Classical Music - Calm and Focused", "Sounds of Nature for Kids - Peaceful and Relaxing"];
        case "teen": return ["Upbeat Pop and Rock - Energizing Beats", "Electronic Chill Music - Calm and Cool", "Indie Alternative Music - Youthful Vibes"];
        case "adult": return ["Acoustic and Indie Music - Cozy and Reflective", "Chillhop and Lofi Beats - Focus and Relax", "Relaxing Jazz Music - Smooth and Calm"];
        case "senior": return ["Classical Music for Relaxation - Soothing and Calm", "Oldies but Goldies - Timeless Melodies", "Calming Nature Music - Peaceful Harmony"];
        default: return ["Relaxing Classical Music - Timeless Peace", "Jazz for Focus - Smooth Sounds"];
    }
}

function getGenderRecommendations(gender) {
    if (gender === "male") {
        return ["Classic Rock for Relaxation - Timeless Rock", "Lo-fi Beats for Focus - Chill and Unwind", "Upbeat Electronic Music - Energize Your Day"];
    } else if (gender === "female") {
        return ["Chilled Indie Music - Calm and Relaxed", "Soft Pop for Relaxation - Gentle Tunes", "Guided Meditation Music - Mindfulness Moments"];
    } else if (gender === "non-binary") {
        return ["Ambient Music for Relaxation - Calming Sounds", "Soft Jazz and Blues - Chill and Comfort", "Lofi and Chill Beats - Relaxing Flow"];
    } else {
        return ["Ambient Soundscapes - Relax and Focus", "Lofi and Chill Beats - Stay Calm", "Classical Music - Soothing for Everyone"];
    }
}

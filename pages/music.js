<<<<<<< HEAD
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
=======
// music.js
const therapeuticData = {
    stress: {
        title: "Stress Relief & Calm",
        color: "bg-blue-500",
        tracks: [
            { title: "Weightless", artist: "Marconi Union" },
            { title: "Electra", artist: "Airstream" },
            { title: "Mellomaniac (Chill Out Mix)", artist: "DJ Shah" },
            { title: "Watermark", artist: "Enya" },
            { title: "Strawberry Swing", artist: "Coldplay" }
        ]
    },
    anxiety: {
        title: "Anxiety Reduction",
        color: "bg-teal-500",
        tracks: [
            { title: "Clair de Lune", artist: "Claude Debussy" },
            { title: "Canzonetta Sull'aria", artist: "Mozart" },
            { title: "Someone Like You", artist: "Adele" },
            { title: "Pure Shores", artist: "All Saints" },
            { title: "Please Don't Go", artist: "Barcelona" }
        ]
    },
    depression: {
        title: "Uplift & Healing",
        color: "bg-amber-400",
        tracks: [
            { title: "Here Comes The Sun", artist: "The Beatles" },
            { title: "Walking on Sunshine", artist: "Katrina & The Waves" },
            { title: "Good Vibrations", artist: "The Beach Boys" },
            { title: "Don't Stop Me Now", artist: "Queen" },
            { title: "I'm Yours", artist: "Jason Mraz" }
        ]
    },
    insomnia: {
        title: "Deep Sleep State",
        color: "bg-indigo-600",
        tracks: [
            { title: "Deep Sleep Softly", artist: "Binaural Beats" },
            { title: "Rain Sounds", artist: "Nature Sounds" },
            { title: "Gymnopédie No.1", artist: "Erik Satie" },
            { title: "Stars of the Lid", artist: "And Their Refinement of the Decline" },
            { title: "Spiegel im Spiegel", artist: "Arvo Pärt" }
        ]
    },
    bipolar: {
        title: "Emotional Balance",
        color: "bg-purple-500",
        tracks: [
            { title: "River Flows in You", artist: "Yiruma" },
            { title: "Experience", artist: "Ludovico Einaudi" },
            { title: "Nocturne Op. 9 No. 2", artist: "Chopin" },
            { title: "Comptine d'un autre été", artist: "Yann Tiersen" },
            { title: "The Blue Notebooks", artist: "Max Richter" }
        ]
    },
    fatigue: {
        title: "Energy & Focus",
        color: "bg-rose-500",
        tracks: [
            { title: "Levels", artist: "Avicii" },
            { title: "Titanium", artist: "David Guetta" },
            { title: "Wake Me Up", artist: "Avicii" },
            { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars" },
            { title: "Can't Stop the Feeling!", artist: "Justin Timberlake" }
        ]
    },
    focus: {
        title: "Deep Work Flow",
        color: "bg-cyan-500",
        tracks: [
            { title: "Lofi Girl Radio", artist: "Lofi Girl" },
            { title: "Time", artist: "Hans Zimmer" },
            { title: "Cornfield Chase", artist: "Hans Zimmer" },
            { title: "Snowfall", artist: "Øneheart" },
            { title: "TRON Legacy (End Titles)", artist: "Daft Punk" }
        ]
    }
};

let currentPlaylistTheme = null;

function generateSoundscape() {
    const btn = document.getElementById('generateBtn');
    
    // Animate button state
    const originalContent = '<span class="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span><i class="fa-solid fa-play relative z-10"></i><span class="relative z-10 w-max">Generate Curated Playlist</span>';
    btn.innerHTML = `<span class="absolute inset-0 w-full h-full bg-slate-800 transition-opacity duration-500"></span><i class="fa-solid fa-circle-notch fa-spin relative z-10"></i> <span class="relative z-10 w-max">Curating Sounds...</span>`;
    
    setTimeout(() => {
        // Get user inputs
        const diseaseElement = document.querySelector('input[name="disease"]:checked');
        const disease = diseaseElement && diseaseElement.value !== "other" ? diseaseElement.value :
                        (document.getElementById('moreMoodsTrigger').checked ? document.getElementById('moreMoodsTrigger').value : 'stress');
        
        // Find corresponding playlist
        const playlistData = therapeuticData[disease] || therapeuticData['stress'];
        currentPlaylistTheme = playlistData.title;

        // Update UI
        renderPlaylist(playlistData);
        
        // Reset button
        btn.innerHTML = originalContent;
    }, 800); // Simulate processing delay
}

function renderPlaylist(data) {
    const emptyState = document.getElementById('emptyState');
    const playlistState = document.getElementById('playlistState');
    const playlistTitle = document.getElementById('playlistTitle');
    const playlistItems = document.getElementById('playlistItems');
    const ambientGlow = document.getElementById('ambientGlow');
    
    // Hide empty state, show results
    emptyState.classList.add('hidden');
    playlistState.classList.remove('hidden');
    
    // Set colors / title
    playlistTitle.innerText = data.title;
    
    // Update ambient glow to match theme roughly 
    // Just toggling opacity to make it look alive
    ambientGlow.className = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] bg-indigo-500/30 opacity-100 transition-all duration-1000 pointer-events-none`;
    
    // Generate list dynamically
    playlistItems.innerHTML = '';
    
    data.tracks.forEach((track, index) => {
        const item = document.createElement('li');
        item.className = 'song-item p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between transition-all hover:bg-white/10 group';
        item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        item.style.opacity = "0";
        item.style.transform = "translateY(10px)";
        
        // Spotify / YT links format
        const searchQuery = encodeURIComponent(`${track.title} ${track.artist}`);
        const spotifyLink = `https://open.spotify.com/search/${searchQuery}`;
        const youtubeLink = `https://www.youtube.com/results?search_query=${searchQuery}`;
        
        item.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white/70 shadow-inner group-hover:scale-110 transition-transform">
                    <i class="fa-solid fa-music text-lg"></i>
                </div>
                <div>
                    <h4 class="text-white font-medium text-[16px]">${track.title}</h4>
                    <p class="text-white/60 text-[13px]">${track.artist}</p>
                </div>
            </div>
            <div class="song-actions flex gap-2 shrink-0">
                <a href="${youtubeLink}" target="_blank" class="w-10 h-10 rounded-full bg-white/5 hover:bg-[#FF0000] flex items-center justify-center text-white/70 hover:text-white transition-colors tooltip" title="Play on YouTube">
                    <i class="fa-brands fa-youtube text-lg"></i>
                </a>
                <a href="${spotifyLink}" target="_blank" class="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1DB954] flex items-center justify-center text-white/70 hover:text-white transition-colors tooltip" title="Play on Spotify">
                    <i class="fa-brands fa-spotify text-lg"></i>
                </a>
            </div>
        `;
        
        playlistItems.appendChild(item);
    });

}

function openSpotifyPlaylist() {
    if(!currentPlaylistTheme) return;
    const query = encodeURIComponent(`${currentPlaylistTheme} playlist`);
    window.open(`https://open.spotify.com/search/${query}/playlists`, '_blank');
}

// Add simple CSS animation dynamically to document
const style = document.createElement('style');
style.innerHTML = \`
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
\`;
document.head.appendChild(style);
>>>>>>> 4d2fe5e (Enhanced Features)

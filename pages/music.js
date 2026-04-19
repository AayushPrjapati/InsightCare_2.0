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

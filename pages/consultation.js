let localStream;
let remoteStream;
let peerConnection;
let chatBox = document.getElementById('chat-box');

// Set up the signaling server and WebRTC connection
const signalingServer = 'https://your-signaling-server.com'; // Replace with your signaling server URL

// Video elements
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

// Audio and Video mute/unmute buttons
const muteAudioBtn = document.getElementById('mute-audio');
const muteVideoBtn = document.getElementById('mute-video');
const screenShareBtn = document.getElementById('screen-share');
const endCallBtn = document.getElementById('end-call');

// Chat send button
const sendMessageBtn = document.getElementById('send-message');

// Initialize WebRTC connection
async function startVideoCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        localVideo.srcObject = localStream;

        peerConnection = new RTCPeerConnection();
        
        // Add local stream to the peer connection
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Set up remote stream on receiving tracks
        peerConnection.ontrack = (event) => {
            remoteStream = event.streams[0];
            remoteVideo.srcObject = remoteStream;
            
            // visually indicate remote feed started
            remoteVideo.parentElement.querySelector('.placeholder-view').classList.add('hidden');
        };

        // Set up ICE candidate handling
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("Candidate generated", event.candidate);
                // signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
            }
        };

        // Offer to connect (this would typically be triggered by signaling)
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // signalingServer.send(JSON.stringify({ type: 'offer', offer: offer }));
    } catch (err) {
        console.error("Camera access denied or unavailable", err);
    }
}

// Mute/unmute audio
if(muteAudioBtn) {
    muteAudioBtn.onclick = () => {
        if(!localStream) return;
        const audioTrack = localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        if(audioTrack.enabled) {
            muteAudioBtn.classList.remove('bg-red-500', 'hover:bg-red-600', 'text-white');
            muteAudioBtn.classList.add('bg-white', 'hover:bg-slate-50', 'text-slate-700', 'hover:text-brand-500');
            muteAudioBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        } else {
            muteAudioBtn.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white');
            muteAudioBtn.classList.remove('bg-white', 'hover:bg-slate-50', 'text-slate-700', 'hover:text-brand-500');
            muteAudioBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        }
    };
}

// Mute/unmute video
if(muteVideoBtn) {
    muteVideoBtn.onclick = () => {
        if(!localStream) return;
        const videoTrack = localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        
        if(videoTrack.enabled) {
            muteVideoBtn.classList.remove('bg-red-500', 'hover:bg-red-600', 'text-white');
            muteVideoBtn.classList.add('bg-white', 'hover:bg-slate-50', 'text-slate-700', 'hover:text-brand-500');
            muteVideoBtn.innerHTML = '<i class="fa-solid fa-video"></i>';
        } else {
            muteVideoBtn.classList.add('bg-red-500', 'hover:bg-red-600', 'text-white');
            muteVideoBtn.classList.remove('bg-white', 'hover:bg-slate-50', 'text-slate-700', 'hover:text-brand-500');
            muteVideoBtn.innerHTML = '<i class="fa-solid fa-video-slash"></i>';
        }
    };
}

// Share screen
if(screenShareBtn) {
    screenShareBtn.onclick = async () => {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            const screenTrack = screenStream.getTracks()[0];
            const sender = peerConnection.getSenders().find(s => s.track.kind === screenTrack.kind);
            if(sender) sender.replaceTrack(screenTrack);
            
            screenShareBtn.innerHTML = '<i class="fa-solid fa-stop text-red-500"></i>';
            screenTrack.onended = () => {
                screenShareBtn.innerHTML = '<i class="fa-solid fa-display"></i>';
                // replace back with camera
                if(localStream && sender) {
                    sender.replaceTrack(localStream.getVideoTracks()[0]);
                }
            };
        } catch (err) {
            console.error('Error sharing screen: ', err);
        }
    };
}

// End the call
if(endCallBtn) {
    endCallBtn.onclick = () => {
        if(peerConnection) peerConnection.close();
        if(localStream) localStream.getTracks().forEach(track => track.stop());
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
        alert('Call Ended');
        window.location.href = '../index.html';
    };
}

// Handle chat message sending
if(sendMessageBtn) {
    sendMessageBtn.onclick = () => {
        const message = chatBox.value;
        if (message) {
            // Send message to signaling server or peer connection
            console.log('Sending message: ', message);
            
            // Append to chat visually
            const chatMessages = document.getElementById('chat-messages');
            const newMsg = document.createElement('div');
            newMsg.className = 'bg-brand-500 text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] self-end shadow-sm mb-3';
            newMsg.textContent = message;
            chatMessages.appendChild(newMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            chatBox.value = ''; // Clear the input
        }
    };
}

// Start the video call when the page loads
window.onload = startVideoCall;

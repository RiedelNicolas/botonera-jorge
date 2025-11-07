// Audio Button Logic
document.addEventListener('DOMContentLoaded', function() {
    const audioButtons = document.querySelectorAll('.audio-button');
    
    // Check if buttons were found
    if (!audioButtons || audioButtons.length === 0) {
        console.error('No audio buttons found on the page');
        return;
    }
    
    // Create and store audio elements for each button upfront
    const audioElements = {};
    let currentlyPlayingAudio = null;
    let currentlyPlayingButton = null;
    
    audioButtons.forEach(button => {
        if (!button) {
            console.warn('Skipping null button');
            return;
        }
        
        const audioPath = button.getAttribute('data-audio');
        
        if (!audioPath) {
            console.error('No audio path specified for button');
            return;
        }
        
        // Create audio element and start preloading
        audioElements[audioPath] = new Audio(audioPath);
        
        // Reset currentlyPlayingAudio when audio ends naturally
        audioElements[audioPath].addEventListener('ended', function() {
            if (currentlyPlayingAudio === audioElements[audioPath]) {
                currentlyPlayingAudio = null;
                if (currentlyPlayingButton) {
                    currentlyPlayingButton.classList.remove('playing');
                    currentlyPlayingButton = null;
                }
            }
        });
        
        // Add click event listener
        button.addEventListener('click', function() {
            const audio = audioElements[audioPath];
            
            // If this is the currently playing audio, pause it
            if (currentlyPlayingAudio === audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0; // Reset to beginning
                currentlyPlayingAudio = null;
                if (currentlyPlayingButton) {
                    currentlyPlayingButton.classList.remove('playing');
                    currentlyPlayingButton = null;
                }
                return;
            }
            
            // Stop any currently playing audio and remove playing class
            if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                currentlyPlayingAudio.pause();
                currentlyPlayingAudio.currentTime = 0; // Reset to beginning
            }
            if (currentlyPlayingButton) {
                currentlyPlayingButton.classList.remove('playing');
            }
            
            // Play the new audio and add playing class
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            currentlyPlayingAudio = audio;
            currentlyPlayingButton = button;
            button.classList.add('playing');
        });
    });
});

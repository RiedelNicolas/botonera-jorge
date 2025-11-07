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
        
        // Add click event listener
        button.addEventListener('click', function() {
            const audio = audioElements[audioPath];
            
            // Toggle play/pause
            if (audio.paused) {
                audio.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audio.pause();
                audio.currentTime = 0; // Reset to beginning
            }
        });
    });
});

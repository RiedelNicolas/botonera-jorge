// Audio Button Logic
document.addEventListener('DOMContentLoaded', function() {
    const audioButtons = document.querySelectorAll('.audio-button');
    
    // Store audio elements for each button
    const audioElements = {};
    
    audioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const audioPath = this.getAttribute('data-audio');
            
            // If audio doesn't exist yet, create it
            if (!audioElements[audioPath]) {
                audioElements[audioPath] = new Audio(audioPath);
            }
            
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

// Audio Button Logic
document.addEventListener('DOMContentLoaded', function() {
    const audioButton = document.getElementById('audioButton');
    
    // Audio element will be created when button is clicked
    let audio = null;
    
    audioButton.addEventListener('click', function() {
        // If audio doesn't exist yet, create it
        if (!audio) {
            // Placeholder for audio file - update with actual audio file path
            audio = new Audio('audio/jorge.mp3');
        }
        
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

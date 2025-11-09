// Audio Button Logic
document.addEventListener("DOMContentLoaded", async function () {
  const buttonContainer = document.querySelector(".button-container");

  if (!buttonContainer) {
    console.error("Button container not found");
    return;
  }

  try {
    // Fetch button configuration from JSON
    const response = await fetch("buttons.json");
    if (!response.ok) {
      throw new Error(`Failed to load buttons configuration: ${response.status}`);
    }
    const config = await response.json();

    if (!config.buttons || config.buttons.length === 0) {
      console.error("No buttons configured in buttons.json");
      return;
    }

    // Create and store audio elements for each button upfront
    const audioElements = {};
    let currentlyPlayingAudio = null;
    let currentlyPlayingButton = null;

    // Generate buttons dynamically from JSON
    config.buttons.forEach((buttonData) => {
      if (!buttonData.title || !buttonData.ref) {
        console.warn("Skipping invalid button configuration:", buttonData);
        return;
      }

      // Create button element
      const button = document.createElement("button");
      button.className = "audio-button";
      button.textContent = buttonData.title;
      button.setAttribute("data-audio", buttonData.ref);

      // Add button to container
      buttonContainer.appendChild(button);

      // Create audio element and start preloading
      audioElements[buttonData.ref] = new Audio(buttonData.ref);

      // Reset currentlyPlayingAudio when audio ends naturally
      audioElements[buttonData.ref].addEventListener("ended", function () {
        if (currentlyPlayingAudio === audioElements[buttonData.ref]) {
          currentlyPlayingAudio = null;
          if (currentlyPlayingButton) {
            currentlyPlayingButton.classList.remove("playing");
            currentlyPlayingButton = null;
          }
        }
      });

      // Add click event listener
      button.addEventListener("click", function () {
        const audio = audioElements[buttonData.ref];

        // If this is the currently playing audio, restart it from the beginning
        if (currentlyPlayingAudio === audio && !audio.paused) {
          audio.pause();
          audio.currentTime = 0; // Reset to beginning
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
          return;
        }

        // Stop any currently playing audio and remove playing class
        if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
          currentlyPlayingAudio.pause();
          currentlyPlayingAudio.currentTime = 0; // Reset to beginning
        }
        if (currentlyPlayingButton) {
          currentlyPlayingButton.classList.remove("playing");
        }

        // Play the new audio and add playing class
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        currentlyPlayingAudio = audio;
        currentlyPlayingButton = button;
        button.classList.add("playing");
      });
    });
  } catch (error) {
    console.error("Error loading button configuration:", error);
  }
});

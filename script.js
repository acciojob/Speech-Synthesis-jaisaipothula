// Get elements
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateSlider = document.getElementById('rate-slider');
const pitchSlider = document.getElementById('pitch-slider');
const speakButton = document.getElementById('speak-button');
const stopButton = document.getElementById('stop-button');

// Initialize variables
let currentUtterance;
let voices = [];

// Fetch voices and populate select
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
};

// Speak function
function speak() {
    if (!textInput.value.trim()) return; // Prevent speech if no text

    // Create utterance
    currentUtterance = new SpeechSynthesisUtterance(textInput.value);
    currentUtterance.voice = voices[voiceSelect.value];
    currentUtterance.rate = parseFloat(rateSlider.value);
    currentUtterance.pitch = parseFloat(pitchSlider.value);

    // Speak
    window.speechSynthesis.speak(currentUtterance);

    // Enable stop button
    speakButton.disabled = true;
    stopButton.disabled = false;
}

// Stop function
function stop() {
    window.speechSynthesis.cancel();
    speakButton.disabled = false;
    stopButton.disabled = true;
}

// Event listeners
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

// Update voice when changed
voiceSelect.addEventListener('change', () => {
    if (currentUtterance) {
        stop();
        speak();
    }
});

// Update rate and pitch dynamically
rateSlider.addEventListener('input', () => {
    if (currentUtterance) {
        stop();
        currentUtterance.rate = parseFloat(rateSlider.value);
        speak();
    }
});

pitchSlider.addEventListener('input', () => {
    if (currentUtterance) {
        stop();
        currentUtterance.pitch = parseFloat(pitchSlider.value);
        speak();
    }
});

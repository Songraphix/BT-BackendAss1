const visitorInput = document.getElementById('visitor-name');
const greetingText = document.getElementById('greeting-text');
const greetingWrapper = document.getElementById('greeting-wrapper');

// Real-time greeting text update
visitorInput.addEventListener('input', function(e) {
    const name = e.target.value.trim();
    
    if (name) {
        greetingText.textContent = `Nice to meet you, ${name}! 👋`;
    } else {
        greetingText.textContent = '';
    }
});

// Optional: Clear greeting if input is cleared
visitorInput.addEventListener('change', function() {
    if (!this.value.trim()) {
        greetingText.textContent = '';
    }
});

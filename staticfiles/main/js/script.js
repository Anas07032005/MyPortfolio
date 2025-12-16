{% block extra_js %}
<script>
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typing-text');

    // Terminal-style typing effect
    const terminalTexts = [
        "$ whoami",
        "> Full Stack Developer",
        "$ skills",
        "> React, Django, Node.js, Python",
        "$ contact",
        "> Available for projects"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let isNewLine = true;

    function typeTerminal() {
        if (lineIndex >= terminalTexts.length) {
            // Reset for infinite loop
            lineIndex = 0;
            setTimeout(() => {
                typingText.textContent = '';
                typeTerminal();
            }, 2000);
            return;
        }

        const currentLine = terminalTexts[lineIndex];

        if (isNewLine) {
            // Add new line indicator
            if (lineIndex % 2 === 0) {
                typingText.innerHTML += '<span class="terminal-prompt">$ </span>';
            } else {
                typingText.innerHTML += '<span class="terminal-arrow">> </span>';
            }
            isNewLine = false;
        }

        if (charIndex < currentLine.length) {
            // Skip the $ or > if we already added them
            const skipChars = lineIndex % 2 === 0 ? 2 : 2;
            const displayChar = charIndex >= skipChars ?
                currentLine.charAt(charIndex) : '';

            if (displayChar) {
                typingText.innerHTML += displayChar;
            }
            charIndex++;
            setTimeout(typeTerminal, charIndex < 5 ? 150 : 50);
        } else {
            // End of line
            typingText.innerHTML += '<br>';
            lineIndex++;
            charIndex = 0;
            isNewLine = true;

            // Pause between lines
            setTimeout(typeTerminal, lineIndex % 2 === 0 ? 1000 : 500);
        }
    }

    // Start typing
    setTimeout(typeTerminal, 1000);
});
</script>
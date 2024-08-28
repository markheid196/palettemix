document.addEventListener('DOMContentLoaded', () => {
    const palette = document.getElementById('palette');
    const mix = document.querySelector('.mix');
    const undoButton = document.getElementById('undoButton');
    let currentColor = 'white'; // Start with an empty palette
    let colorHistory = [currentColor]; // Array to track color history

    const colors = document.querySelectorAll('.color');
    
    colors.forEach(color => {
        color.addEventListener('click', () => {
            const newColor = window.getComputedStyle(color).backgroundColor;
            currentColor = blendColors(currentColor, newColor, 0.1); // Less impact with 0.1
            colorHistory.push(currentColor); // Save current color to history
            mix.style.backgroundColor = currentColor;
        });
    });

    undoButton.addEventListener('click', () => {
        if (colorHistory.length > 1) {
            colorHistory.pop(); // Remove the current color
            currentColor = colorHistory[colorHistory.length - 1]; // Get the last color from history
            mix.style.backgroundColor = currentColor;
        }
    });

    function blendColors(color1, color2, weight) {
        const rgb1 = parseColor(color1);
        const rgb2 = parseColor(color2);

        // Blend colors using weighted average
        const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight);
        const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight);
        const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function parseColor(color) {
        const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (match) {
            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10)
            };
        }
        return { r: 255, g: 255, b: 255 };
    }
});

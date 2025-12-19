/**
 * Generates a Sierpinski Carpet on a canvas element.
 * @param {number} depth - Recursion depth
 * @param {HTMLCanvasElement} canvas - The canvas element to draw on
 */
export default function generateCarpet(depth, canvas) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set fill color
    ctx.fillStyle = '#000'; // Black squares

    // Start recursion
    drawRecursive(ctx, 0, 0, size, depth);
}

function drawRecursive(ctx, x, y, size, depth) {
    if (depth === 0) {
        // Base case: Fill the square
        ctx.fillRect(x, y, size, size);
        return;
    }

    const newSize = size / 3;

    for (let dx = 0; dx < 3; dx++) {
        for (let dy = 0; dy < 3; dy++) {
            // The center square (1,1) is left empty
            if (dx === 1 && dy === 1) {
                continue; 
            } else {
                drawRecursive(
                    ctx, 
                    x + dx * newSize, 
                    y + dy * newSize, 
                    newSize, 
                    depth - 1
                );
            }
        }
    }
}
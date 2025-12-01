import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

//https://tasks.illustrativemathematics.org/content-standards/tasks/1523
//https://www.fractal.garden/sierpinski-carpet

rl.question('Deep: ', (input)=> {
    const depth = parseInt(input);
    const size = Math.pow(3, depth);
    const carpet = Array.from({ length: size }, () => new Array(size).fill(' '));
    generateSierpinskiCarpet(carpet, 0, 0, size, depth);
    carpet.forEach(row => console.log(row.map(c => c + c).join(''))); // Print each char twice
    rl.close();
});

function generateSierpinskiCarpet(carpet, x, y, size, depth) {
    if (depth === 0) {
        for (let i = x; i < x + size; i++) {
            for (let j = y; j < y + size; j++) {
                carpet[i][j] = '■';
            }
        }
        return;
    }
    const newSize = size / 3;
    for (let dx = 0; dx < 3; dx++) {
        for (let dy = 0; dy < 3; dy++) {
            if (dx === 1 && dy === 1) {
                for (let i = x + newSize; i < x + 2 * newSize; i++) {
                    for (let j = y + newSize; j < y + 2 * newSize; j++) {
                        carpet[i][j] = ' ';
                    }
                }
            } else {
                generateSierpinskiCarpet(carpet, x + dx * newSize, y + dy * newSize, newSize, depth - 1);
            }
        }
    }
}
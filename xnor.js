import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Input 2 booleans (0, 1): ", (input) => {
    const [a, b] = input.split(' ').map(x => x === '1');
    const xnor = !((a && !b) || (!a && b)); // or (a && b) || (!a && !b)
    console.log(xnor);
    rl.close();
});
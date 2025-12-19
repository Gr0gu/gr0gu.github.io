"use strict";
import readline from 'node:readline'; //lib for reading input from console

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateSubsets(i, input, result, subset) {

    if (i === input.length) {
        result.push([...subset]);
        return;
    }

    subset.push(input[i]);
    generateSubsets(i + 1, input, result, subset);

    subset.pop();
    generateSubsets(i + 1, input, result, subset);
}

//write input in format [el1, el2, el3, ...]
rl.question("Input the set: ", (answer) => {
    const input = JSON.parse(answer);
    console.log("Parsed array:", input);

    const result = [];
    generateSubsets(0, input, result, []);

    console.log(result);
    rl.close();
});
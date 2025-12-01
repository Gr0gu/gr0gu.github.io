"use strict";

import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateTruthTable(uniqueVars, expr) {
    const numVars = uniqueVars.length;
    const numRows = Math.pow(2, numVars);

    // Print header
    console.log(uniqueVars.join('\t') + '\t| Result');
    console.log('-'.repeat(numVars * 8 + 10));

    // Generate all combinations
    for (let i = 0; i < numRows; i++) {
        const values = [];

        // Convert i to binary to get true/false values
        for (let j = numVars - 1; j >= 0; j--) {
            values.push(Boolean((i >> j) & 1));
        }

        // Evaluate expression with current values
        const result = evaluateExpression(expr, uniqueVars, values);

        // Print row
        console.log(values.map(v => v ? 1 : 0).join('\t') + '\t| ' + (result ? 1 : 0));
    }
}

function evaluateExpression(expr, vars, values) {
    let evalExpr = expr;

    vars.forEach((v, i) => {
        evalExpr = evalExpr.replaceAll(v, values[i]);
    });

    return eval(evalExpr);
}

rl.question("Enter expression:", (input) => {
    const expr = input.replaceAll('+', '&&').replaceAll('*', '||');
    const vars = input.match(/[A-Za-z]/g);

    const uniqueVars = [...new Set(vars)];

    generateTruthTable(uniqueVars, expr);
    rl.close();
});
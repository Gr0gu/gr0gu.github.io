export default function generateTruthTable(rawInput, outputElement) {
    const expr = rawInput.replaceAll('+', '||').replaceAll('*', '&&');
    const vars = rawInput.match(/[A-Za-z]/g);
    
    if (!vars) {
        outputElement.innerHTML = "Please enter a valid expression.";
        return;
    }

    const uniqueVars = [...new Set(vars)];
    const numVars = uniqueVars.length;
    const numRows = Math.pow(2, numVars);

    let tableHtml = '<table border="1" style="border-collapse: collapse; width: 100%; text-align: center;">';
    
    // Header Row
    tableHtml += '<thead><tr>';
    uniqueVars.forEach(v => tableHtml += `<th>${v}</th>`);
    tableHtml += '<th>Result</th></tr></thead><tbody>';

    // Generate Rows
    for (let i = 0; i < numRows; i++) {
        const values = [];
        for (let j = numVars - 1; j >= 0; j--) {
            values.push(Boolean((i >> j) & 1));
        }

        const result = evaluateExpression(expr, uniqueVars, values);

        // Add row to HTML
        tableHtml += '<tr>';
        values.forEach(v => tableHtml += `<td>${v ? 1 : 0}</td>`);
        tableHtml += `<td><strong>${result ? 1 : 0}</strong></td>`;
        tableHtml += '</tr>';
    }

    tableHtml += '</tbody></table>';
    outputElement.innerHTML = tableHtml;
}

function evaluateExpression(expr, vars, values) {
    let evalExpr = expr;
    
    vars.forEach((v, i) => {
        evalExpr = evalExpr.replaceAll(v, values[i]);
    });

    try {
        return eval(evalExpr);
    } catch (e) {
        return "Error";
    }
}
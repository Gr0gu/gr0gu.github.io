import xnor from './1/scripts/xnor.js';
import smallerDivisible from './1/scripts/smaller_divisible.js';
import subsets from './1/scripts/subsets.js';
import generateTruthTable from './1/scripts/truth_table.js';
import generateCarpet from './1/scripts/sierpinski_carpet.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let button = root.querySelector('#subsets-generate');

    button.addEventListener('click', () => {
        const input = root.querySelector('#subsets-input');
        const output = root.querySelector('#subsets-output');

        const rawValue = input.value;
        const result = subsets(rawValue);
        output.textContent = JSON.stringify(result);
    });

    button = root.querySelector('#xnor-calculate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#xnor-input');
        const output = root.querySelector('#xnor-output');

        const rawValue = input.value;
        const result = xnor(rawValue);
        output.textContent = result;
    });

    button = root.querySelector('#smaller-divisible-calculate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#smaller-divisible-input');
        const output = root.querySelector('#smaller-divisible-output');

        const rawValue = input.value;
        const result = smallerDivisible(rawValue);
        output.textContent = result;
    });

    button = root.querySelector('#truth-table-generate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#truth-table-input');
        const output = root.querySelector('#truth-table-output');

        const rawValue = input.value;
        generateTruthTable(rawValue, output);
    });

    button = root.querySelector('#sierpinski-carpet-generate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#sierpinski-carpet-input');
        const output = root.querySelector('#sierpinski-carpet-output');

        const depth = parseInt(input.value);
        generateCarpet(depth, output);
    });
});
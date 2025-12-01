import xnor from './scripts/xnor.js';
import smallerDivisible from './scripts/smaller_divisible.js';
import subsets from './scripts/subsets.js';

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
});
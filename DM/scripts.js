/// Lab 1 ///
document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('root');
    let button;

    /* 1.1 */
    const subsets = await import('./1/scripts/subsets.js');
    button = root.querySelector('#subsets-generate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#subsets-input');
        const output = root.querySelector('#subsets-output');

        const rawValue = input.value;
        const result = subsets.default(rawValue);
        output.textContent = JSON.stringify(result);
    });

    /* 1.2 */
    const xnor = await import('./1/scripts/xnor.js');
    button = root.querySelector('#xnor-calculate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#xnor-input');
        const output = root.querySelector('#xnor-output');

        const rawValue = input.value;
        const result = xnor.default(rawValue);
        output.textContent = result;
    });

    /* 1.3 */
    const smallerDivisible = await import('./1/scripts/smaller_divisible.js');
    button = root.querySelector('#smaller-divisible-calculate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#smaller-divisible-input');
        const output = root.querySelector('#smaller-divisible-output');

        const rawValue = input.value;
        const result = smallerDivisible.default(rawValue);
        output.textContent = result;
    });

    /* 1.4 */
    const generateTruthTable = await import('./1/scripts/truth_table.js');
    button = root.querySelector('#truth-table-generate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#truth-table-input');
        const output = root.querySelector('#truth-table-output');

        const rawValue = input.value;
        generateTruthTable.default(rawValue, output);
    });

    /* 1.5 */
    const generateCarpet = await import('./1/scripts/sierpinski_carpet.js');
    button = root.querySelector('#sierpinski-carpet-generate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#sierpinski-carpet-input');
        const output = root.querySelector('#sierpinski-carpet-output');

        const depth = parseInt(input.value);
        generateCarpet.default(depth, output);
    });
});

/// Lab 2 ///
document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('root');
    let button;

    /* 2.1 */
    const vulnerability = await import('./2/scripts/vulnerability.js');
    button = root.querySelector('#vulnerability-generate');
    button.addEventListener('click', () => {
        const inputKey1 = root.querySelector('#vulnerability-input-key1');
        const inputKey2 = root.querySelector('#vulnerability-input-key2');
        const output = root.querySelector('#vulnerability-output');
        const result = vulnerability.default(inputKey1.value, inputKey2.value);
        output.textContent = result;
    });

    /* 2.2 */
    const rsa = await import('./2/scripts/rsa.js');
    button = root.querySelector('#rsa-encrypt');
    button.addEventListener('click', () => {
        const inputMessage = root.querySelector('#rsa-encrypt-input');
        const output = root.querySelector('#rsa-output');
        const result = rsa.encrypt(inputMessage.value);
        output.textContent = result;
    });

    button = root.querySelector('#rsa-decrypt');
    button.addEventListener('click', () => {
        const inputCiphertext = root.querySelector('#rsa-decrypt-input');
        const output = root.querySelector('#rsa-output');
        const result = rsa.decrypt(inputCiphertext.value);
        output.textContent = result;
    });

    /* 2.3 */
    const password = await import('./2/scripts/password.js');
    button = root.querySelector('#password-check');
    button.addEventListener('click', () => {
        const inputPassword = root.querySelector('#password-input');
        const output = root.querySelector('#password-output');
        const result = password.default(inputPassword.value);
        output.textContent = result;
    });

    /* 2.4 */
    const palindrome = await import('./2/scripts/palindrome.js');
    button = root.querySelector('#palindrome-calculate');
    button.addEventListener('click', () => {
        const input = root.querySelector('#palindrome-input');
        const output = root.querySelector('#palindrome-output');
        const result = palindrome.default(input.value);
        output.textContent = result;
    });
});

/// Lab 3 ///
document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('root');
    let button;

    /* 3.1 */
    const courses = await import('./3/scripts/courses.js');
    button = root.querySelector('#courses-calculate');
    button.addEventListener('click', () => {
        const inputN = root.querySelector('#courses-input-n');
        const inputRelations = root.querySelector('#courses-input-relations');
        const output = root.querySelector('#courses-output');

        const n = parseInt(inputN.value);
        const relations = JSON.parse(inputRelations.value);
        const result = courses.default(n, relations);
        output.textContent = result;
    });

    /* 3.2 */
    const cheapestFlight = await import('./3/scripts/cheapest_flights.js');
    button = root.querySelector('#cheapest-flights-calculate');
    button.addEventListener('click', () => {
        const inputN = root.querySelector('#cheapest-flights-input-n');
        const inputFlights = root.querySelector('#cheapest-flights-input-flights');
        const inputStart = root.querySelector('#cheapest-flights-input-start');
        const inputDestination = root.querySelector('#cheapest-flights-input-destination');
        const inputK = root.querySelector('#cheapest-flights-input-k');
        const output = root.querySelector('#cheapest-flights-output');

        const n = parseInt(inputN.value);
        const flights = JSON.parse(inputFlights.value);
        const start = parseInt(inputStart.value);
        const destination = parseInt(inputDestination.value);
        const k = parseInt(inputK.value);

        const result = cheapestFlight.default(n, flights, start, destination, k);
        output.textContent = result;
    });

    /* 3.3 */
    const matrix = await import('./3/scripts/matrix.js');
    button = root.querySelector('#friends-calculate');
    button.addEventListener('click', () => {
        const fileInput = root.querySelector('#friends-file-input');
        const output = root.querySelector('#friends-output');
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result;
            const result = matrix.friends(content);
            output.textContent = result;
        };
        reader.readAsText(file);
    });
});
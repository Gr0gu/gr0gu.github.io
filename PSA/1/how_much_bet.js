/**
 * Simulate tossing a fair coin until the first head appears.
 *
 * The function returns the number of tosses needed to reach the first head.
 *
 * @returns {number} Number of coin tosses required to get the first head.
 */
export default function numberOfTosses() {
    let i = 0;
    let tossResult = '';

    while (tossResult != 'head') {
        tossResult = tossCoin();
        i++;
    }

    return i;
}

/**
 * Toss a fair coin once.
 *
 * @returns {'tail' | 'head'}
 */
function tossCoin() {
    return Math.random() < 0.5 ? 'tail' : 'head';
}
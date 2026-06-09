/**
 *  Three Dice Sum Observation Paradox
 * Returns array of counts from 0 to 18 where index maps to the sum total.
 * @param {number} trials - Total number of iterations to roll three dice
 * @returns {number[]} Array containing frequencies of sums
 */
export default function simulateDiceRolls(trials) {
    const counts = Array(19).fill(0);

    for (let i = 0; i < trials; i++) {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const die3 = Math.floor(Math.random() * 6) + 1;
        const sum = die1 + die2 + die3;
        counts[sum]++;
    }

    return counts;
}
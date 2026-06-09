
/**
 * Simulates a single session of the Labouchere roulette system.
 * @param {number} bankroll - Starting money.
 * @param {number} tableLimit - The maximum bet allowed by the casino.
 * @returns {object} Session statistics (Win/Loss, max bet placed, rounds played).
 */
export default function labouchere(bankroll, tableLimit = 1000) {
    let list = [1, 2, 3, 4];
    let balance = bankroll;
    let maxBetPlaced = 0;
    let rounds = 0;

    // Keep playing as long as we have numbers on the list and money in our pocket
    while (list.length > 0 && balance > 0) {
        rounds++;

        // Calculate current bet: sum of first and last (or just the single number)
        let currentBet = list.length === 1 ? list[0] : list[0] + list[list.length - 1];

        // Check if we hit the casino's table limit
        if (currentBet > tableLimit) {
            return { result: "Failed: Hit Table Limit", maxBet: currentBet, balance, rounds };
        }

        // Check if we are bankrupt and can't make the required bet
        if (currentBet > balance) {
            return { result: "Failed: Bankrupt", maxBet: currentBet, balance, rounds };
        }

        // Place the bet
        balance -= currentBet;
        if (currentBet > maxBetPlaced) maxBetPlaced = currentBet;

        // Spin the wheel! (18 red slots out of 37 total slots in European Roulette)
        const isWin = Math.random() < (18 / 37);

        if (isWin) {
            // Win: get bet back + win amount, cross off first and last
            balance += currentBet * 2;
            list.shift();
            if (list.length > 0) list.pop();
        } else {
            // Lose: add lost bet to the end of the list
            list.push(currentBet);
        }
    }

    return { result: "Success: List Cleared!", maxBet: maxBetPlaced, balance, rounds };
}
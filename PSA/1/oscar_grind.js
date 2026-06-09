/**
 * Simulates Oscar's Grind strategy for 10000 spins.
 * @param {number} bankroll - Starting money (in units).
 * @param {number} tableLimit - Maximum allowed bet.
 * @returns {object} Session statistics.
 */
export default function simulateOscarsGrind(bankroll, tableLimit = 500) {
    let balance = bankroll;
    let sequenceProfit = 0;
    let currentBet = 1;
    let maxBetPlaced = 0;
    let maxDrawdown = bankroll;

    for (let i = 0; i < 10; i++) {
        if (balance <= 0 || currentBet > balance) {
            return { result: 'Bankrupt', rounds: i, balance, maxBetPlaced, lowestDip: maxDrawdown };
        }

        if (currentBet > tableLimit) {
            return { result: 'Hit Table Limit', rounds: i, balance, maxBetPlaced, lowestDip: maxDrawdown };
        }

        if (currentBet > maxBetPlaced) {
            maxBetPlaced = currentBet;
        }

        if (balance < maxDrawdown) {
            maxDrawdown = balance;
        }

        balance -= currentBet;

        const isWin = Math.random() < (18 / 37);

        if (isWin) {
            balance += currentBet * 2;
            sequenceProfit += currentBet;

            if (sequenceProfit >= 1) {
                sequenceProfit = 0;
                currentBet = 1;
            } else {
                //Cap next bet for strict +1 profit
                currentBet = Math.min(currentBet + 1, 1 - sequenceProfit);
            }
        } else {
            sequenceProfit -= currentBet;
        }
    }

    return {
        result: 'Survived Session',
        balance,
        maxBetPlaced,
        lowestDip: maxDrawdown,
        sequenceProfit
    };
}


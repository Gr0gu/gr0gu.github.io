export default function simulateCheckerboard(trials) {
    let winCount = 0;

    // Assume square edge is 2 units, coin diameter is 1 unit (radius = 0.5)
    const squareEdge = 2.0;
    const coinRadius = 0.5;

    for (let i = 0; i < trials; i++) {
        // Random center coordinates within a single square [0, squareEdge]
        const x = Math.random() * squareEdge;
        const y = Math.random() * squareEdge;

        // Check if the coin fits completely inside the square borders
        if (x >= coinRadius && x <= (squareEdge - coinRadius) &&
            y >= coinRadius && y <= (squareEdge - coinRadius)) {
            winCount++;
        }
    }

    const winProbability = winCount / trials;
    const expectedReturnPerLeu = winProbability * 4.0; // Pays 1 leu (4 coins value) per win

    return {
        winProbability,
        expectedReturnPerLeu,
        isFair: expectedReturnPerLeu === 1.0
    };
}
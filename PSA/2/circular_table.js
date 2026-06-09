export default function simulateSeating(n, trials) {
    let nonAdjacentCount = 0;

    for (let t = 0; t < trials; t++) {
        // 1. Generate lunch seating arrangement: [0, 1, 2, ..., n-1]
        const lunch = Array.from({ length: n }, (_, i) => i);

        // 2. Generate random dinner seating by shuffling participants
        const dinner = [...lunch];
        for (let i = dinner.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dinner[i], dinner[j]] = [dinner[j], dinner[i]];
        }

        // 3. Map positions of each participant at dinner to check neighbors easily
        const dinnerPositions = new Array(n);
        for (let pos = 0; pos < n; pos++) {
            dinnerPositions[dinner[pos]] = pos;
        }

        let conflictFound = false;

        // 4. Verify neighbor combinations against lunch arrangements
        for (let personA = 0; personA < n; personA++) {
            // Lunch neighbors are adjacent elements wrap-around
            const lunchLeft = (personA === 0) ? n - 1 : personA - 1;
            const lunchRight = (personA === n - 1) ? 0 : personA + 1;

            const posA = dinnerPositions[personA];
            const dinnerLeftNeighbor = dinner[(posA === 0) ? n - 1 : posA - 1];
            const dinnerRightNeighbor = dinner[(posA === n - 1) ? 0 : posA + 1];

            // If a lunch neighbor is also a dinner neighbor, a conflict occurs
            if (dinnerLeftNeighbor === lunchLeft || dinnerLeftNeighbor === lunchRight ||
                dinnerRightNeighbor === lunchLeft || dinnerRightNeighbor === lunchRight) {
                conflictFound = true;
                break;
            }
        }

        if (!conflictFound) {
            nonAdjacentCount++;
        }
    }

    return nonAdjacentCount / trials;
}
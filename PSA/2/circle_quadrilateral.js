export default function simulateCircleQuadrilateral(trials) {
    let validCount = 0;

    for (let i = 0; i < trials; i++) {
        // Choose 4 points randomly on a circle
        const points = [];
        for(let i = 0; i< 4; i++){
            points[i] = Math.random();
        }

        points.sort((a, b) => a - b);

        // 2. Calculate the arc lengths between consecutive points
        const arc1 = points[1] - points[0];
        const arc2 = points[2] - points[1];
        const arc3 = points[3] - points[2];
        const arc4 = 1 - points[3] + points[0];

        // 3. Mathematical conditions:
        // - Convexity: no single arc length can exceed 0.5 (half the circumference)
        // - Interior angles < 120°: any opposite pair of arcs must sum to > 1/6 (~0.1667)
        if (arc1 < 0.5 && arc2 < 0.5 && arc3 < 0.5 && arc4 < 0.5) {
            const maxOppositeSumLimit = 1 / 3; // Equivalent to angle boundary conditions

            if ((arc1 + arc2 > maxOppositeSumLimit) &&
                (arc2 + arc3 > maxOppositeSumLimit) &&
                (arc3 + arc4 > maxOppositeSumLimit) &&
                (arc4 + arc1 > maxOppositeSumLimit)) {
                validCount++;
            }
        }
    }

    return validCount / trials;
}
export default function simulateDartThrows(trials) {
    const radius = 10;
    let upperHalfCount = 0;

    let rightHalfCount = 0;
    let lessThan5Count = 0;
    let greaterThan5Count = 0;
    let nearPointCount = 0;

    for (let i = 0; i < trials; i++) {
        // Generate uniform random points inside a bounding box [-10, 10]
        const x = (Math.random() * 20) - 10;
        const y = (Math.random() * 20) - 10;

        // Check if the dart landed inside the circular target
        if (x * x + y * y <= radius * radius) {
            // Condition: Must land in the upper half (y > 0)
            if (y > 0) {
                upperHalfCount++;

                // 1. Right half (x > 0)
                if (x > 0) rightHalfCount++;

                // Distance from center
                const distFromCenter = Math.sqrt(x * x + y * y);

                // 2. Distance < 5
                if (distFromCenter < 5) lessThan5Count++;

                // 3. Distance > 5
                if (distFromCenter > 5) greaterThan5Count++;

                // 4. Within 5 inches of the point (0, 5)
                const distToPoint = Math.sqrt(x * x + (y - 5) * (y - 5));
                if (distToPoint <= 5) nearPointCount++;
            }
        } else {
            // If it falls outside the target circle, discard and re-roll to maintain valid trials
            i--;
        }
    }

    return {
        probRightHalf: rightHalfCount / upperHalfCount,
        probLessThan5: lessThan5Count / upperHalfCount,
        probGreaterThan5: greaterThan5Count / upperHalfCount,
        probNearPoint: nearPointCount / upperHalfCount
    };
}
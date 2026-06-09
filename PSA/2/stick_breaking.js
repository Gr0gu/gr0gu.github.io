export default function simulateStickBreaking(trials) {
    let triangleCount = 0;

    for (let i = 0; i < trials; i++) {
        // Break 1: Random point on unit stick [0, 1]
        const p1 = Math.random();

        let piece1, longerPiece;
        if (p1 < 0.5) {
            piece1 = p1;
            longerPiece = 1 - p1;
        } else {
            piece1 = 1 - p1;
            longerPiece = p1;
        }

        // Break 2: Random point on the longer piece
        const p2 = Math.random() * longerPiece;
        const piece2 = p2;
        const piece3 = longerPiece - p2;

        // Triangle inequality theorem check
        if (piece1 + piece2 > piece3 &&
            piece1 + piece3 > piece2 &&
            piece2 + piece3 > piece1) {
            triangleCount++;
        }
    }

    return triangleCount / trials;
}
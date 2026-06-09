export default function simulateHeadsHistogram(tosses, repeats) {
    // Array size fits up to 'tosses' number of heads
    const frequencies = Array(tosses + 1).fill(0);

    for (let i = 0; i < repeats; i++) {
        let headsCount = 0;
        for (let j = 0; j < tosses; j++) {
            if (Math.random() < 0.5) {
                headsCount++;
            }
        }
        frequencies[headsCount]++;
    }

    return frequencies;
}
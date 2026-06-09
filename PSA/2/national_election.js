/**
 * Simulates multiple election polling iterations to evaluate prediction accuracy.
 * @param {number} sampleSize - How many random voters to poll per simulation (e.g., 1000 or 3000)
 * @param {number} demProbability - True proportion of Democratic voters in the population (e.g., 0.52 or 0.51)
 * @param {number} iterations - How many times to repeat the polling experiment (e.g., 100)
 * @returns {object} Summary counts of correct predictions along with an array tracking each poll's results
 */
export default function simulateElection(sampleSize, demProbability, iterations) {
    let correctPredictions = 0;
    
    for (let i = 0; i < iterations; i++) {
        let demVotes = 0;
        for (let j = 0; j < sampleSize; j++) {
            if (Math.random() < demProbability) {
                demVotes++;
            }
        }
        
        const repVotes = sampleSize - demVotes;
        if (demVotes > repVotes) {
            correctPredictions++;
        }
    }
    
    return correctPredictions;
}
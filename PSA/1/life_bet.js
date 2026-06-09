
/**
 * Simulates Russian Roulette to find the probability of surviving a second pull.
 * @param {number} numberOfSlots - The number of chambers in the barrel (e.g., 5 or 6).
 * @param {boolean} adjacent - True if the 2 bullets are next to each other.
 * @param {boolean} spin - True if you spin the barrel before the second pull.
 * @returns {string} The survival probability formatted as a percentage.
 */
export default function probabilityToSurvive(numberOfSlots = 6, adjacent = true, spin = true) {
    let survivals = 0;
    let validTimelines = 0;

    let barrel = new Array(numberOfSlots).fill(0);

    barrel[0] = 1;

    if (adjacent) {
        barrel[1] = 1;
    } else {
        barrel[2] = 1;
    }

    for (let i = 0; i < 10000; i++) {
        //First spin of the barrel
        let currentChamber = Math.floor(Math.random() * numberOfSlots);

        //Oops, you hit a bullet!
        if (barrel[currentChamber] === 1) {
            continue;
        }

        //Survived after first shot!
        validTimelines++;

        let nextChamber;
        if (spin) {
            //Second spin
            nextChamber = Math.floor(Math.random() * numberOfSlots);
        } else {
            //Second shot
            nextChamber = (currentChamber + 1) % numberOfSlots;
        }

        if (barrel[nextChamber] === 0) {
            //Survived after second shot!
            survivals++;
        }
    }

    const probability = (survivals / validTimelines) * 100;
    return probability.toFixed(2)
}
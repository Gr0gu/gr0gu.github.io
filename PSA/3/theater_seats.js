export default function simulateTheaterSeats(numSeats = 100, trials = 10000) {
    let lastPersonCorrectCount = 0;

    for (let t = 0; t < trials; t++) {
        const occupied = new Array(numSeats + 1).fill(false); // 1-indexed seats

        // First passenger chooses a completely random seat
        const firstChoice = Math.floor(Math.random() * numSeats) + 1;
        occupied[firstChoice] = true;

        // Passengers 2 to 99 take their seats
        for (let passenger = 2; passenger < numSeats; passenger++) {
            if (!occupied[passenger]) {
                occupied[passenger] = true; // Sits in their own seat
            } else {
                // Own seat taken, pick a random available seat from passenger to numSeats
                let choice;
                do {
                    choice = Math.floor(Math.random() * numSeats) + 1;
                } while (occupied[choice]);
                occupied[choice] = true;
            }
        }

        // Check if the 100th seat is free for the last person
        if (!occupied[numSeats]) {
            lastPersonCorrectCount++;
        }
    }

    return lastPersonCorrectCount / trials;
}
export default function simulateCustomerQueue(trials) {
    const arrivalRate = 6; // 6 customers per hour
    const avgInterarrivalTime = 1 / arrivalRate; // 1/6 hours = 10 minutes
    const targetTime = 50;
    let totalWaitTime = 0;

    for (let i = 0; i < trials; i++) {
        let currentTime = 0;

        // Generate customer arrivals until one passes T = 50
        while (currentTime < targetTime) {
            // Inverse transform sampling for exponential distribution
            const interarrivalTime = -Math.log(1 - Math.random()) * avgInterarrivalTime;
            currentTime += interarrivalTime;
        }

        // The waiting time is the arrival timestamp minus your arrival checkpoint (50)
        const waitTime = currentTime - targetTime;
        totalWaitTime += waitTime;
    }

    const averageWaitHours = totalWaitTime / trials;
    const averageWaitMinutes = averageWaitHours * 60;

    return {
        averageWaitHours,
        averageWaitMinutes
    };
}
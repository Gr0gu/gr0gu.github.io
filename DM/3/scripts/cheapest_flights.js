export default function findCheapestPrice(n, flights, start, destination, k) {
    // 1. Build the Graph (Adjacency List)
    // We create an array of arrays to store flights from each city
    // Note: We ensure the array is large enough to hold 'n' or the max city index
    // (In your Python example, n=3 but destination=3, so we need index 3 to exist)
    const size = Math.max(n, destination + 1);
    const reaches = Array.from({ length: size }, () => []);

    for (const [from, to, price] of flights) {
        // Safe check in case 'from' index is out of bounds
        if (reaches[from]) {
            reaches[from].push([to, price]);
        }
    }

    // 2. Initialize Queue
    // Format: [current_price, current_city, remaining_stops]
    // We use k + 1 because k is "stops", so k=1 stop means 2 flights are allowed.
    let info = [[0, start, k + 1]];
    
    // 3. Process the Queue
    while (info.length > 0) {
        // Pop the element with the lowest price (first element after sort)
        const [price, city, stops] = info.shift();

        // Check if we reached the destination
        if (city === destination) {
            return price;
        }

        // If we still have stops available, check neighbors
        if (stops > 0) {
            const neighbors = reaches[city] || [];
            
            for (const [neighborCity, neighborPrice] of neighbors) {
                // Add new path to queue
                info.push([price + neighborPrice, neighborCity, stops - 1]);
            }
            
            // Sort the queue so the cheapest flight is always at the start (index 0)
            // This mimics the 'sorted' logic in Python
            info.sort((a, b) => a[0] - b[0]);
        }
    }

    return "no route";
}
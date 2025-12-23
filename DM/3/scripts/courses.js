export default function minimumSemesters(n, relations) {
    // 1. Initialize Graph (Adjacency List) and In-Degree Array
    // We use size n + 1 because courses are labeled 1 to n
    const graph = Array.from({ length: n + 1 }, () => []);
    const inDegree = new Array(n + 1).fill(0);

    // Build the graph
    for (const [prev, next] of relations) {
        graph[prev].push(next);
        inDegree[next]++;
    }

    // 2. Find all courses with 0 prerequisites to start
    let queue = [];
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    let semesters = 0;
    let coursesTaken = 0;

    // 3. Process semester by semester (Level-order BFS)
    while (queue.length > 0) {
        semesters++; // Start a new semester
        const nextSemesterQueue = [];

        // Take all courses available in this semester
        for (const course of queue) {
            coursesTaken++;

            // Check the courses that depend on this one
            for (const nextCourse of graph[course]) {
                inDegree[nextCourse]--; // Remove the prerequisite dependency
                
                // If all prerequisites are met, add to next semester's list
                if (inDegree[nextCourse] === 0) {
                    nextSemesterQueue.push(nextCourse);
                }
            }
        }
        
        // Move to the next semester
        queue = nextSemesterQueue;
    }

    // 4. Check for cycles
    // If we took fewer courses than n, it means there is a cycle (impossible to finish)
    return coursesTaken === n ? semesters : -1;
}
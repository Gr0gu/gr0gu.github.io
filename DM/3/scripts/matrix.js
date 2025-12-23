export function friends(fileContent) {
    const lines = fileContent.trim().split('\n');
    const people = {};

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = line.split('|');
        if (parts.length < 2) continue;

        const name = parts[0].trim();
        
        const connectionsString = parts[1].trim();
        const connections = connectionsString.split(/\s+/).map(Number);
        const friendCount = connections.reduce((sum, val) => sum + val, 0);
        
        people[name] = friendCount;
    }

    let maxFriends = -1;
    let mostPopular = [];

    for (const [name, count] of Object.entries(people)) {
        if (count > maxFriends) {
            maxFriends = count;
            mostPopular = [name];
        } else if (count === maxFriends) {
            mostPopular.push(name);
        }
    }
    return mostPopular;
}
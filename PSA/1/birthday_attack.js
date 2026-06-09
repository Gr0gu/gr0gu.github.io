import md5 from 'https://cdn.jsdelivr.net/npm/js-md5@0.8.3/+esm';

function findCollision() {
    const generatedStrings = new Set();
    const hashes = new Map();

    while (true) {
        const string = generateString(3);

        if (generatedStrings.has(string)) {
            continue;
        }

        generatedStrings.add(string);

        const hash = md5(string).slice(0, 10);
        if (hashes.has(hash)) {
            return {
                string1: hashes.get(hash),
                string2: string,
                hash
            };
        }

        hashes.set(hash, string);
    }
}

function generateString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}

const collision = findCollision();

postMessage(collision);
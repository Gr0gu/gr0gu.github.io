import nlp from 'https://cdn.jsdelivr.net/npm/compromise@14.14.0/+esm';

export default async function parseTweetProperNouns() {
    const response = await fetch('./3/tweets.json');
    const tweets = await response.json();

    const properNounCounts = {};

    tweets.forEach(tweet => {
        if (!tweet.text) return;

        // Strip URLs and Twitter handles
        let cleanText = tweet.text
            .replace(/https?:\/\/\S+/g, '')
            .replace(/@\S+/g, '');

        // Pass text directly to the Compromise parsing engine
        const doc = nlp(cleanText);

        // Extract proper nouns. Compromise flags these via specific entity matching 
        // or title-case nouns that don't start a sentence.
        const properNouns = doc.people().out('array')
            .concat(doc.places().out('array'))
            .concat(doc.organizations().out('array'));

        properNouns.forEach(rawEntity => {
            // Trim whitespace and normalize casing consistently (e.g., "Apple" vs "apple")
            // while retaining proper capitalization for output display
            let entity = rawEntity.trim();

            // Filter out numbers, punctuation noise, or single letters
            if (entity.length > 1 && /^[a-zA-Z\s]+$/.test(entity)) {
                // Capitalize first letter of each word for neat proper noun presentation
                entity = entity.replace(/\b\w/g, c => c.toUpperCase());

                properNounCounts[entity] = (properNounCounts[entity] || 0) + 1;
            }
        });
    });

    // Sort proper nouns descending by frequency counts
    const sortedProperNouns = Object.entries(properNounCounts)
        .sort((a, b) => b[1] - a[1]);

    return sortedProperNouns;
}
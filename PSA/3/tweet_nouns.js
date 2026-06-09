import nlp from 'https://cdn.jsdelivr.net/npm/compromise@14.14.0/+esm';

export default async function parseTweetNouns() {
    const response = await fetch('./3/tweets.json');
    const tweets = await response.json();

    const nounCounts = {};

    tweets.forEach(tweet => {
        if (!tweet.text) return;

        // Strip URLs
        let cleanText = tweet.text
            .replace(/https?:\/\/\S+/g, '')
            .replace(/@\S+/g, '');

        // Pass text directly to the Compromise parsing engine
        const doc = nlp(cleanText);

        // .nouns() isolates words tagged as nouns/plurals. 
        // .out('array') extracts them as clean strings.
        const nouns = doc.nouns().out('array');

        nouns.forEach(rawNoun => {
            // Normalize case and trim white space
            let noun = rawNoun.toLowerCase().trim();

            // Simple lemmatization rule to combine plurals (e.g., "cars" -> "car", "labs" -> "lab")
            if (noun.endsWith('s') && !noun.endsWith('ss') && noun.length > 3) {
                noun = noun.slice(0, -1);
            }

            // Filter out punctuation noise or single-letter artifacts
            if (noun.length > 1 && /^[a-z0-9]+$/.test(noun)) {
                nounCounts[noun] = (nounCounts[noun] || 0) + 1;
            }
        });
    });

    // Sort nouns descending by frequency
    const sortedNouns = Object.entries(nounCounts)
        .sort((a, b) => b[1] - a[1]);

    return sortedNouns;
}
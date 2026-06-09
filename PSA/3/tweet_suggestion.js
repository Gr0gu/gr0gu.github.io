export default async function getWordSuggestions(prefix) {
    const response = await fetch('./3/tweets.json');
    const tweets = await response.json();

    const searchPrefix = prefix.toLowerCase().trim();
    if (!searchPrefix) return [];

    const wordCounts = {};

    // 1. Rebuild the core global word frequency map
    tweets.forEach(tweet => {
        if (!tweet.text) return;

        let text = tweet.text.toLowerCase();
        text = text.replace(/https?:\/\/\S+/g, ''); // Clear links
        text = text.replace(/@\S+/g, '');          // Clear handles
        text = text.replace(/[^a-z0-9\s]/g, ' ');   // Keep clean alpha-numeric strings

        const words = text.split(/\s+/);

        words.forEach(word => {
            if (word.length > 1) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });
    });

    // 2. Filter words that start with the input prefix
    const suggestions = Object.entries(wordCounts)
        .filter(([word]) => word.startsWith(searchPrefix))
        .sort((a, b) => b[1] - a[1]); // Sort descending by frequency counts

    // Return the top 3 highest frequency matches
    return suggestions.slice(0, 3);
}
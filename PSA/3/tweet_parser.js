export default async function parseTweetFrequency() {
    // Fetch the attached dataset file path
    const response = await fetch('./3/tweets.json');
    const tweets = await response.json();

    const wordCounts = {};

    tweets.forEach(tweet => {
        if (!tweet.text) return;

        let text = tweet.text.toLowerCase();

        // Remove URLs/Hyperlinks
        text = text.replace(/https?:\/\/\S+/g, '');

        // Remove Twitter handles (@username)
        text = text.replace(/@\S+/g, '');

        // Retain only alphabetic strings and numbers, converting punctuation into spaces
        text = text.replace(/[^a-z0-9\s]/g, ' ');

        // Tokenize text into words array
        const words = text.split(/\s+/);

        words.forEach(word => {
            // Filter out empty spaces and single-character noise
            if (word.length > 1) {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            }
        });
    });

    // Sort entries descending based on top occurrence counts
    const sortedWords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1]);

    return sortedWords;
}
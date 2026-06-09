import nlp from 'https://cdn.jsdelivr.net/npm/compromise@14.14.0/+esm';

export default async function parseNounPopularityRating() {
    const response = await fetch('./3/tweets.json');
    const tweets = await response.json();

    const nounStats = {};

    // 1. Accumulate raw frequency, likes, and retweets per noun
    tweets.forEach(tweet => {
        if (!tweet.text) return;

        const likes = tweet.likes || 0;
        const retweets = tweet.retweets || 0;

        // Strip noise data before parsing tokens
        let cleanText = tweet.text.replace(/https?:\/\/\S+/g, '').replace(/@\S+/g, '');
        const doc = nlp(cleanText);
        const nouns = doc.nouns().out('array');

        // Maintain a Set per tweet to only count cumulative metrics once per tweet match
        const uniqueNounsInTweet = new Set();
        nouns.forEach(rawNoun => {
            let noun = rawNoun.toLowerCase().trim();
            if (noun.endsWith('s') && !noun.endsWith('ss') && noun.length > 3) {
                noun = noun.slice(0, -1);
            }
            if (noun.length > 1 && /^[a-z0-9]+$/.test(noun)) {
                uniqueNounsInTweet.add(noun);
            }
        });

        uniqueNounsInTweet.forEach(noun => {
            if (!nounStats[noun]) {
                nounStats[noun] = { frequency: 0, retweets: 0, likes: 0 };
            }
            nounStats[noun].frequency += 1;
            nounStats[noun].retweets += retweets;
            nounStats[noun].likes += likes;
        });
    });

    // 2. Locate maximum metrics globally among all nouns to execute normalization scales
    let maxRetweets = 0;
    let maxLikes = 0;

    Object.values(nounStats).forEach(stats => {
        if (stats.retweets > maxRetweets) maxRetweets = stats.retweets;
        if (stats.likes > maxLikes) maxLikes = stats.likes;
    });

    // Handle edge-cases to safely prevent divisions by zero
    if (maxRetweets === 0) maxRetweets = 1;
    if (maxLikes === 0) maxLikes = 1;

    // 3. Compute final popularity coefficient rating scores
    const ratedNouns = Object.entries(nounStats).map(([noun, stats]) => {
        const normRetweet = stats.retweets / maxRetweets;
        const normLikes = stats.likes / maxLikes;

        // Lab Guide Equation Matrix Formula
        const score = stats.frequency * (1.4 + normRetweet) * (1.2 + normLikes);

        return {
            noun,
            frequency: stats.frequency,
            score
        };
    });

    // Sort descending by highest calculated popularity score
    return ratedNouns.sort((a, b) => b.score - a.score);
}
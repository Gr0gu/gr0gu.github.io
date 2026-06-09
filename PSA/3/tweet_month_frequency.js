export default async function parseMonthlyWordFrequency(targetWord) {
    const response = await fetch('./3/tweets.json');
    const tweets = await response.json();

    const searchToken = targetWord.toLowerCase().trim();

    // The set of unique chronological months known to exist within the dataset profile
    const chronologicalMonths = ['2020-10', '2020-11', '2020-12', '2022-01', '2022-02', '2022-03', '2022-11'];

    // Initialize monthly frequency tracking structure
    const monthlyCounts = {};
    chronologicalMonths.forEach(m => { monthlyCounts[m] = 0; });

    tweets.forEach(tweet => {
        if (!tweet.text || !tweet.created_at) return;

        // Extract the YYYY-MM prefix string
        const monthKey = tweet.created_at.slice(0, 7);

        // Verify the month exists within our expected categories
        if (monthlyCounts[monthKey] !== undefined) {
            let text = tweet.text.toLowerCase();

            // Filter noise components to maintain baseline accuracy
            text = text.replace(/https?:\/\/\S+/g, '');
            text = text.replace(/@\S+/g, '');
            text = text.replace(/[^a-z0-9\s]/g, ' ');

            const words = text.split(/\s+/);

            // Count occurrences of the specific target word token
            words.forEach(word => {
                if (word === searchToken) {
                    monthlyCounts[monthKey]++;
                }
            });
        }
    });

    return {
        months: chronologicalMonths,
        counts: chronologicalMonths.map(m => monthlyCounts[m])
    };
}
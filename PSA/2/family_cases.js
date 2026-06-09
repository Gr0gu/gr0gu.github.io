export default function simulateFamilyCases(numFamilies) {
    let totalChildrenScheme1 = 0;
    let totalChildrenScheme2 = 0;

    for (let i = 0; i < numFamilies; i++) {
        // Scheme 1: Stop when you have a boy (1 = Boy, 0 = Girl)
        let childrenS1 = 0;
        while (true) {
            childrenS1++;
            if (Math.random() < 0.5) { // Born a boy
                break;
            }
        }
        totalChildrenScheme1 += childrenS1;

        // Scheme 2: Stop when you have at least one boy and one girl
        let childrenS2 = 0;
        let hasBoy = false;
        let hasGirl = false;
        while (!hasBoy || !hasGirl) {
            childrenS2++;
            if (Math.random() < 0.5) {
                hasBoy = true;
            } else {
                hasGirl = true;
            }
        }
        totalChildrenScheme2 += childrenS2;
    }

    const avgS1 = totalChildrenScheme1 / numFamilies;
    const avgS2 = totalChildrenScheme2 / numFamilies;
    const differenceInExpected = (avgS2 - avgS1) * 100000;

    return {
        avgS1,
        avgS2,
        differenceInExpected
    };
}
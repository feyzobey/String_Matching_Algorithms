// Time complexity: O(mn)
// Space complexity: O(1)
function bruteForce(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;
    const indexes = [];

    let comparisons = 0;
    let occurrences = 0;

    for (let i = 0; i <= textLength - patternLength; i++) {
        let j = 0;
        while (j < patternLength && pattern[j] === text[i + j]) {
            comparisons++;
            j++;
        }

        if (j === patternLength) {
            occurrences++;
            indexes.push(i);
        }
    }

    return { indexes, comparisons, occurrences };
}

module.exports = { bruteForce };
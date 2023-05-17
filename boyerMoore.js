// Time complexity: O(mn)
// Space complexity: O(m + n)
function boyerMoore(text, pattern) {
    // create the bad match table
    const badMatchTable = {};
    const patternLength = pattern.length;
    const textLength = text.length;
    const indexes = [];

    let comparisons = 0;
    let occurrences = 0;
    // create the bad match table
    for (let i = 0; i < patternLength; i++) {
        badMatchTable[pattern[i]] = Math.max(1, patternLength - i - 1);  
    }
    badMatchTable['*'] = patternLength;
    // search the pattern in the text
    let i = patternLength - 1;
    while (i < textLength) {
        let k = 0;
        while (k < patternLength && pattern[patternLength - 1 - k] === text[i - k]) {
            comparisons++;
            k++;
        }

        if (k === patternLength) {
            occurrences++;
            indexes.push(i - patternLength + 1);
        }
        comparisons++;
        i += badMatchTable[text[i]] || patternLength;
    }

    return { badMatchTable, indexes, comparisons, occurrences };
}
boyerMoore("languageaasfdasdghs", "language")
module.exports = { boyerMoore };
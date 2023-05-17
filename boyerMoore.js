// Time complexity: O(mn)
// Space complexity: O(m + n)
function boyerMoore(text, pattern) {
    const patternLength = pattern.length;
    const textLength = text.length;
    const indexes = [];
    const badSymbolTable = {};
    const goodSuffixTable = {};

    let comparisons = 0;
    let occurrences = 0;

    // create bad symbol table
    for (let i = 0; i < patternLength; i++) {
        badSymbolTable[pattern[i]] = Math.max(1, patternLength - i - 1);
    }
    badSymbolTable['*'] = patternLength;

    // create good suffix table
    for (let i = 1; i < patternLength; i++) {
        goodSuffixTable[i] = patternLength;
    }

    for (let i = patternLength - 1; i >= 1; i--) {
        let sub = pattern.substring(i, patternLength + 1);
        let isAllSame = true;
        for (let j = 0; j < sub.length; j++) {
            const tempChar = sub[sub.length - 1 - j];
            const compareText = pattern.substring(0, patternLength - sub.length - j);
            if (compareText === '') {
                break;
            }
            if (tempChar !== compareText[compareText.length - 1]) {
                isAllSame = false;
                break;
            }            
        }
        if (isAllSame) {
            goodSuffixTable[i] = patternLength - sub.length;
        }
    }

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
        const badMatchShift = badSymbolTable[text[i]];
        const goodSuffixShift = goodSuffixTable[k - 1];
        i += Math.max(badMatchShift || 0, goodSuffixShift);
    }

    return { badSymbolTable, goodSuffixTable, indexes, comparisons, occurrences };
}
boyerMoore("1111111111111111111111111111111111111111111111111111011111", "111111110111011")
module.exports = { boyerMoore };
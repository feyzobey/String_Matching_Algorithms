// Time complexity: O(mn)
// Space complexity: O(m + n)
function boyerMoore(text, pattern) {
    const badMatchTable = {};
    const patternLength = pattern.length;
    const textLength = text.length;
    const indexes = [];
    const badSymbolTable = {};
    const goodSuffixTable = {};

    let comparisons = 0;
    let occurrences = 0;

    // create bad symbol table
    for (let i = 0; i < patternLength; i++) {
        badSymbolTable[pattern[i]] = patternLength - i - 1;
    }
    badSymbolTable['*'] = patternLength;


   
    // create good suffix table
    for (let i = 0; i < patternLength; i++) {
        goodSuffixTable[i] = patternLength;
    }

    let j = 0;
    for (let i = patternLength - 1; i >= 0; i--) {
        if (goodSuffixTable[i] === i + 1) {
            for (; j < patternLength - 1 - i; j++) {
                if (goodSuffixTable[j] === patternLength) {
                    goodSuffixTable[j] = patternLength - 1 - i;
                }
            }
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

    return { badSymbolTable,goodSuffixTable, indexes, comparisons, occurrences };
}
// boyerMoore("languageaasfdasdghs", "language")
module.exports = { boyerMoore };
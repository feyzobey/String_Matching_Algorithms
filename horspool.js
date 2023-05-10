// apply horspool algorithm to find the pattern in the text
// return the index of the first occurrence of the pattern in the text

function horspool(text, pattern) {
    // create the bad match table
    const badMatchTable = {};
    const patternLength = pattern.length;
    const textLength = text.length;

    // create the bad match table
    for (let i = 0; i < patternLength - 1; i++) {
        badMatchTable[pattern[i]] = patternLength - i - 1;
    }

    // search the pattern in the text
    let i = patternLength - 1;
    while (i < textLength) {
        let k = 0;
        while (k < patternLength && pattern[patternLength - 1 - k] === text[i - k]) {
            k++;
        }

        if (k === patternLength) {
            return i - patternLength + 1;
        } else {
            i += badMatchTable[text[i]];
        }
    }

    return -1;
}
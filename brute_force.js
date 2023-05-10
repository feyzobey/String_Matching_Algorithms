//apply brute force string matching algorithm to find the pattern in the text
//return the index of the first occurrence of the pattern in the text

function bruteForce(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;

    for (let i = 0; i <= textLength - patternLength; i++) {
        let j = 0;
        while (j < patternLength && pattern[j] === text[i + j]) {
            j++;
        }

        if (j === patternLength) {
            return i;
        }
    }

    return -1;
}
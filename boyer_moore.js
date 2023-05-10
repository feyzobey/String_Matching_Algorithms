function boyerMoore(text, pattern) {
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
            i += badMatchTable[text[i]] || patternLength;
        }
    }

    return -1;
}

// tests
console.log(boyerMoore('abcbcglx', 'bcgl')); // 3
console.time("test_timer");
console.log(boyerMoore('abcxabcdabxabcdabcdabcy', 'abcdabcy')); // 15
console.timeEnd("test_timer");
console.log(boyerMoore('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')); // 12
console.log(boyerMoore('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')); // 11
console.log(boyerMoore('abcxabcdabxaabaabaaaabcdabcdabcy', 'abcdabca')); // -1
console.log(boyerMoore('abcxabcdabxabcdabcdabcy', 'abcdabca')); // -1

// Time complexity: O(mn)
// Space complexity: O(m + n)
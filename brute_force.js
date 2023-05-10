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

// tests
console.log(bruteForce('abcbcglx', 'bcgl')); // 3

console.time("test_timer");
console.log(bruteForce('abcxabcdabxabcdabcdabcy', 'abcdabcy')); // 15
console.timeEnd("test_timer");

console.log(bruteForce('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')); // 12
console.log(bruteForce('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')); // 11
console.log(bruteForce('abcxabcdabxaabaabaaaabcdabcdabcy', 'abcdabca')); // -1

console.log(bruteForce('abcxabcdabxabcdabcdabcy', 'abcdabca')); // -1

// Time complexity: O(mn)
// Space complexity: O(1)
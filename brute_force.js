let fs = require('fs');

// Time complexity: O(mn)
// Space complexity: O(1)

function bruteForce(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;

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
            console.log(`Found at index: ${i}`);
        }
    }

    return { comparisons, occurrences };
}

fs.readFile('sample.html', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let html_text = data.split("<h1>")[1].split("</h1>")[0];
    console.time("test_timer");
    result = bruteForce(html_text, ".");
    console.timeEnd("test_timer");
    console.table(result);
});
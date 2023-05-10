let fs = require('fs');

// Time complexity: O(mn)
// Space complexity: O(m + n)
function horspool(text, pattern) {
    // create the bad match table

    const badMatchTable = {};
    const patternLength = pattern.length;
    const textLength = text.length;

    let comparisons = 0;
    let occurrences = 0;

    // create the bad match table
    for (let i = 0; i < patternLength - 1; i++) {
        badMatchTable[pattern[i]] = patternLength - i - 1;
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
            console.log(`Found at index: ${i - patternLength + 1}`);
        }
        comparisons++;
        i += badMatchTable[text[i]];
    }

    return { comparisons, occurrences };
}

fs.readFile('sample.html', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    let html_text = data.split("<h1>")[1].split("</h1>")[0];
    console.time("test_timer");
    result = horspool(html_text, ".");
    console.timeEnd("test_timer");
    console.table(result);
});
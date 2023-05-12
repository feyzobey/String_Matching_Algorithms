let fs = require('fs');

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
            console.log(`Found at index: ${i}`);
            indexes.push(i);
        }
    }

    return { indexes, comparisons, occurrences };
}

fs.readFile('asdf.html', 'utf8', (err, data) => {
    if (err) return console.error(err);

    let html_text = data.split("<h1>")[1].split("</h1>")[0];
    let pattern = "1001";
    console.time("test_timer"); // start timer
    let result = bruteForce(html_text, pattern);
    console.timeEnd("test_timer"); // end timer
    console.table(result);
    let markedText = html_text;
    // markedText = markedText.replaceAll(pattern, `<mark>${pattern}</mark>`);
    let tempText = pattern;
    let counter = 0;
    for (let i = 0; i < result.indexes.length - 1; i++) {
        if (result.indexes[i] + pattern.length - 1 >= result.indexes[i + 1]) {
            tempText = tempText.substring(0, tempText.length - 1);
            tempText += markedText.substring(result.indexes[i + 1], result.indexes[i + 1] + pattern.length);
            counter++;
            continue;
        }
        if (counter++ < i) {
            tempText = pattern;
        }
        markedText = markedText.substring(result.indexes[i]).replace(tempText, `<mark>${tempText}</mark>`);
    }
    // markedText = markedText.replaceAll(tempText, `<mark>${tempText}</mark>`);
    markedText += `<h2>Number of comparisons: ${result.comparisons}</h2>`;
    markedText += `<h2>Found ${result.occurrences} occurrences</h2>`;
    
    let modified_result = data.replace(html_text, markedText);
    
    fs.writeFile('output.html', modified_result, 'utf8', (err) => {
        if (err) return console.error(err);
    });
});
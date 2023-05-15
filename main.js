const fs = require('fs');
const boyerMoore = require('./boyerMoore').boyerMoore;
const bruteForce = require('./bruteForce').bruteForce;
// const horspool = require('./horspool').horspool;

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function getPosition(string, substring, index) {
    return string.split(substring, index).join(substring).length;
}

fs.readFile('sample.html', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    let html_text = data.split("<header>")[1].split("</header>")[0];
    let pattern = "Lorem";

    console.time("brute-force"); // start timer
    const resultBruteForce = bruteForce(html_text, pattern);
    console.timeEnd("brute-force"); // end timer

    console.time("boyer-moore"); // start timer
    const resultBoyerMoore = boyerMoore(html_text, pattern);
    console.timeEnd("boyer-moore"); // end timer

    // console.time("horspool"); // start timer
    // const resultHorspool = horspool(html_text, pattern);
    // console.timeEnd("horspool"); // end timer

    console.log(resultBruteForce);
    console.log(resultBoyerMoore);
    // console.log(resultHorspool);

    let indexes = resultBruteForce.indexes;
    let markedText = "";
    markedText += `<h2>Number of comparisons: ${resultBruteForce.comparisons}</h2>`;
    markedText += `<h2>Found ${resultBruteForce.occurrences} occurrences</h2>`;
    markedText += html_text;

    let arr = [];
    let indexesLength = indexes.length;
    for (let i = 0; i < indexesLength; i++) {
        let tempText = pattern;
        let counter = 0;
        for (let j = i; j < indexes.length - 1; j++) {
            if (indexes[j] + pattern.length - 1 >= indexes[j + 1]) {
                counter++;
                continue;
            }
            break;
        }
        if (counter > 0) {
            tempText = html_text.substring(indexes[i], indexes[i + counter] + pattern.length);
            indexesLength -= counter;
        }
        arr.push(`<mark>${tempText}</mark>`);
    }

    for (let i = 0; i < arr.length; i++) {
        const replacement = arr[i];
        const replacementData = replacement.split('<mark>')[1].split('</mark>')[0];
        let position;
        if (replacementData === pattern) {
            position = getPosition(markedText, replacementData, i + 1);
        } else {
            position = getPosition(markedText, replacementData, i);
        }
        markedText = replaceRange(markedText, position, position + replacementData.length, replacement);
    }

    let modified_result = data.replace(html_text, markedText);

    fs.writeFile('output.html', modified_result, 'utf8', (err) => {
        if (err) {
            return console.error(err);
        }
    });
});
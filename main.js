const fs = require('fs');
const boyerMoore = require('./boyerMoore').boyerMoore;
const bruteForce = require('./bruteForce').bruteForce;
const horspool = require('./horspool').horspool;

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function findOverlappingIndexes(pattern, indexes) {
    let indexesLength = indexes.length;
    const overlappingIndexes = [];
    for (let i = 0; i < indexesLength; i++) {
        if (indexes[i] + pattern.length - 1 >= indexes[i + 1]) {
            overlappingIndexes.includes(indexes[i]) ? null : overlappingIndexes.push(indexes[i]);
            overlappingIndexes.includes(indexes[i + 1]) ? null : overlappingIndexes.push(indexes[i + 1]);
            continue;
        }
    }
    return overlappingIndexes;
}

function isAllCharactersSame(pattern) {
    for (let i = 0; i < pattern.length - 1; i++) {
        if (pattern[i] !== pattern[i + 1]) {
            return false;
        }
    }
    return true;
}

fs.readFile('sample2.html', 'utf8', (err, data) => {
    if (err) throw err;

    let inputString = data.split("<body>")[1].split("</body>")[0];
    let pattern = "language";

    console.time("brute-force"); // start timer
    const resultBruteForce = bruteForce(inputString, pattern);
    console.timeEnd("brute-force"); // end timer

    console.time("boyer-moore"); // start timer
    const resultBoyerMoore = boyerMoore(inputString, pattern);
    console.timeEnd("boyer-moore"); // end timer

    console.time("horspool"); // start timer
    const resultHorspool = horspool(inputString, pattern);
    console.timeEnd("horspool"); // end timer

    console.log(resultBruteForce);
    console.log(resultBoyerMoore);
    console.log(resultHorspool);
    
    let markedText = "";
    markedText += inputString;
    
    // marking process
    let indexes = resultBruteForce.indexes;
    const overlappingIndexes = findOverlappingIndexes(pattern, indexes);
    const nonOverlappingIndexes = indexes.filter((index) => !overlappingIndexes.includes(index));
    let isSame = isAllCharactersSame(pattern)
    let counter = 0;
    for (let i = 0; i < indexes.length; i++) {
        let index = indexes[i];
        index += counter * 13;
        if (overlappingIndexes.includes(indexes[i]) && !nonOverlappingIndexes.includes(indexes[i])) {
            let rangeIndex;
            if (isSame) {
                for (let j = 0; j < overlappingIndexes.length; j++) {
                    if (indexes[j] + 1 === indexes[j + 1]) {
                        continue;
                    }
                    rangeIndex = index + j + pattern.length;
                    indexes.splice(indexes.indexOf(indexes[i]), j + 1);
                    break;
                }
            }
            else {
                for (let j = 0; j < overlappingIndexes.length; j++) {
                    if (indexes[j] + pattern.length - 1 >= indexes[j + 1]) {
                        continue;
                    }
                    rangeIndex = index + 2 * j + pattern.length;
                    indexes.splice(indexes.indexOf(indexes[i]), j + 1);
                    break;
                }
            }
            let tempPattern = markedText.substring(index, rangeIndex);
            markedText = replaceRange(markedText, index, rangeIndex, `<mark>${tempPattern}</mark>`);
            i--;
        }
        else if (nonOverlappingIndexes.includes(indexes[i]) && !overlappingIndexes.includes(indexes[i])) {
            markedText = replaceRange(markedText, index, index + pattern.length, `<mark>${pattern}</mark>`);
            indexes.splice(indexes.indexOf(indexes[i]), 1);
            i--;
        }
        counter++;
    }
    markedText += `<h2>Number of comparisons: ${resultBruteForce.comparisons}</h2>`;
    markedText += `<h2>Found ${resultBruteForce.occurrences} occurrences</h2>`;

    let modified_result = data.replace(inputString, markedText);

    fs.writeFile('output.html', modified_result, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
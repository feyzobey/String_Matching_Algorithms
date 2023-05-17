const fs = require('fs');
const boyerMoore = require('./boyerMoore').boyerMoore;
const bruteForce = require('./bruteForce').bruteForce;
const horspool = require('./horspool').horspool;

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function appendToBeginning(s, append) {
    return append + s;
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

// read the html file
fs.readFile('sample2.html', 'utf8', (err, data) => {
    if (err) throw err;

    let inputString = data.split("<body>")[1].split("</body>")[0]; // exctract input string from the html file
    let pattern = "language"; // pattern to be searched

    console.time("brute-force"); // start timer
    const resultBruteForce = bruteForce(inputString, pattern); // run brute-force algorithm
    console.timeEnd("brute-force"); // end timer

    console.time("boyer-moore"); // start timer
    const resultBoyerMoore = boyerMoore(inputString, pattern); // run boyer-moore algorithm
    console.timeEnd("boyer-moore"); // end timer 

    console.time("horspool"); // start timer
    const resultHorspool = horspool(inputString, pattern); // run horspool algorithm
    console.timeEnd("horspool"); // end timer

    // print results of the algorithms to the console
    console.log("**********");
    console.log(`Brute-Force\nComparisons: ${resultBruteForce.comparisons}\nOccurrences: ${resultBruteForce.occurrences}`);
    console.log("**********");
    console.log(`Boyer-Moore\nComparisons: ${resultBoyerMoore.comparisons}\nOccurrences: ${resultBoyerMoore.occurrences}`);
    process.stdout.write("BadSymbolTable: ");
    console.log(resultBoyerMoore.badSymbolTable);
    // console.log("**********");
    console.log("GoodSuffixTable: ");
    console.log(resultBoyerMoore.goodSuffixTable);
    console.log("**********");
    console.log(`Horspool\nComparisons: ${resultHorspool.comparisons}\nOccurrences: ${resultHorspool.occurrences}`);
    process.stdout.write("ShiftTable: ");
    console.log(resultHorspool.shiftTable);
    console.log("**********");

    let markedText = "";
    markedText += inputString;
    
    // marking process (for large input strings or short pattern cases, it takes a long time)
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
    markedText = appendToBeginning(markedText, `<h2><i>Horspool</i>\t\t <h3>Comparisons: ${resultHorspool.comparisons} \t\t\t Occurences: ${resultHorspool.occurrences}\t\t\t Time complexity: O(nm) \t\t\t Space complexity: O(n + m)</h3></h2>`);
    markedText = appendToBeginning(markedText, `<h2><i>Boyer-Moore</i>\t\t <h3>Comparisons: ${resultBoyerMoore.comparisons} \t\t\t Occurences: ${resultBoyerMoore.occurrences}\t\t\t Time complexity: O(nm) \t\t\t Space complexity: O(n + m)</h3></h2>`);
    markedText = appendToBeginning(markedText, `<h2><i>Brute-Force</i>\t\t <h3>Comparisons: ${resultBruteForce.comparisons} \t\t\t Occurences: ${resultBruteForce.occurrences}\t\t\t Time complexity: O(nm) \t\t\t Space complexity: O(1)</h3></h2>`);

    let modified_result = data.replace(inputString, markedText);

    // write the output to a file
    fs.writeFile('output.html', modified_result, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
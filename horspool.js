function horspool(text, pattern) {
    const p = pattern.length;
    const t = text.length;

    if (p > t) {
        return -1;
    }

    // create table of bad characters
    var table = {};
    for (var i = 0; i < p - 1; i++) {
        table[pattern[i]] = p - 1 - i;
    } 

    let comparisons = 0;
    let occurrences = 0;
    const indexes = [];

    var i = p - 1;
    while (i < t) {
        var j = p - 1;
        while (j >= 0 && pattern[j] == text[i]) {
            if (j === 0) {
                occurrences++;
                indexes.push(i);
            }
            if (j === -1) {
                indexes.push(i + 1);
            }
            comparisons++;
            j--;
            i--;
        }
        comparisons++;
        i += table[text[i]] || p; // move i to the right
    }
    return { table, indexes, comparisons, occurrences };
}
module.exports = { horspool };
// A1. Character Frequency

/**
 * @description Calculates the character frequencies in a string.
 * - Only count English alphabetical characters (a..z).
 * - Ignore numbers, whitespace, and punctuation.
 * - Character count is case-insensitive ('A' and 'a' count toward the same character).
 *
 * @param {string} sentence  The string whose characters will be counted
 *
 * @returns {object} An object with keys being lowercase characters, and
 *                   values being the character counts.
 * @example
 *  charFreq('Ceres123');
 *  // returns { c: 1, e: 2, r: 1, s: 1 }
 */
function charFreq(sentence) {
  //not a string or an empty one, no work to do.
  if (typeof(sentence) !== 'string' || sentence.length == 0 ) {
    return {};
  }

  let obj = {};
  for (let character of sentence) {
    //regex to check if it's a-z or A-Z
    if(character.match(/^[a-zA-Z]+$/) ) {
      let lower = character.toLowerCase();
      if( obj.hasOwnProperty(lower)) {
        obj[lower] = obj[lower] + 1;
      } else {
        obj[lower] = 1;
      }
    }
  }
  return obj;
}
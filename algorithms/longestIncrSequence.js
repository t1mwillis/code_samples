/**
 * @description Finds the longest increasing sequence from a given array of
 *  integers. 
 * - A "sequence" is defined as 2 or more neighboring array elements.
 * - A sequence is "increasing" when each value in the sequence is followed
 *   by a value that is greater than the previous value.
 * - An array can have multiple increasing sequences.
 * - An "increasing sequence" ends when either:
 *   - the next value is lesser than or equal to the value before it.
 *   - there is no next value (end of array).
 * - If there are multiple sequences of the same length: return the first one.
 * - If no increasing sequence is found: return an empty array.
 * - If the function argument is invalid (not an array of integers), return an empty array.
 * - Do not mutate the argument to the function.
 *
 * @param {number[]} arr  An array of integers
 *
 * @returns {number[]} The longest increasing sequence of `arr`
 *
 * @examples
 *  longestIncrSequence([1]);
 *  // returns []
 *  longestIncrSequence([1, 1]);
 *  // returns []
 *  longestIncrSequence([3, 4, 1, 2]);
 *  // returns [3, 4]
 *  longestIncrSequence([3, 0, 2, 2, 5, -43, -1, 0, 11, 9, 10]);
 *  // returns [-43, -1, 0, 11]
 *
 */
function longestIncrSequence(arr) {
    //if we didn't get an array or it's one element long, return empty
    if(!Array.isArray(arr) || arr.length <= 1) {
      return [];
    }
  
    
    let longest = [];
    let curr = [];
    for (let i = 0; i < arr.length; i++) {
      //always check to make sure we've got numbers
      if (typeof(arr[i]) !== "number") {
        return [];
      }
      
      if (arr[i] < arr[i+1]){
        //still in a sequence
        curr.push(arr[i])
      } else {
        //hit the end of a sequence
        curr.push(arr[i]);
        //make sure we don't return a sequence of 1!
        if(curr.length > longest.length && curr.length > 1) {
          longest = curr;
        }
        //reset
        curr = [];
      }
    }
    return longest;
  
  }
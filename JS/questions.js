//1. Write a JavaScript function that reverse a number. 
//Example x = 32243;
//Expected Output: 34223 

const reverse = (num) => {
    return Number(String(num).split("").reverse().join(""))
}

//2. Write a JavaScript function that checks whether a passed string is palindrome or not ?
//  A palindrome is word, phrase, or sequence that reads the same backward as forward, e.g., madam or nurses run.

const palindrome = (strng) => {
    let str = strng.toLowerCase()
    return str == str.split("").reverse().join("")

}

//3. Write a JavaScript function that generates all combinations of a string. 
//Example string: 'dog' 
//Expected Output: d, do, dog, o, og, g 

const subsets = (strng, str = "", arr = [], start = 0) => {
    if (start > strng.length) return
       for (let i = start; i < strng.length; i++) {
        if (i > start && strng[i] == strng[i - 1]) continue
        str += strng[i]
        arr.push(str)
        subsets(strng, str, arr, i+1)
        str = str.slice(0, str.length - 1)
    }
    return arr

}

//4. Write a JavaScript function that returns a passed string with letters in alphabetical order.
//Example string: 'webmaster'
//Expected Output: 'abeemrstw'
//Assume punctuation and numbers symbols are not included in the passed string.

const sortedstring = (strng) => {
    return strng.split("").sort().join("")
   
}

//5. Write a JavaScript function that accepts a string as a parameter and converts the first letter of each word of the string in upper case. 
//Example string: 'the quick brown fox' 
//Expected Output: 'The Quick Brown Fox '
const titleString = (strng) => {
    let strngArr = strng.split(" ")
    for (let i = 0; i < strngArr.length; i++) {
        let word = strngArr[i]
        strngArr[i]=word[0].toUpperCase()+word.slice(1)
    }
    return strngArr.join(" ")
}



//6. Write a JavaScript function that accepts a string as a parameter and find the longest word within the string. 
const longestWord = (strng) => {
    let strngArr = strng.split(" ").sort((a, b) => a.length - b.length)
    return strngArr[strngArr.length-1]
}


//7. Write a JavaScript function that accepts a string as a parameter and counts the number of vowels within the string. 
const countVowels = (strng) => {
    let vowels = "aeiou"
    let count = 0
    for (char of strng) {
        if (vowels.includes(char)) {
            count++
        }
    }
    return count
}

//8. Write a JavaScript function that accepts a number as a parameter and check the number is prime or not.
//   Note: A prime number(or a prime) is a natural number greater than 1 that has no positive divisors other than 1 and itself.

const isPrime = (num) => {
    for (let i = 2; i < num; i++) {
        if (num%i===0) return false
    }
    return true
}

//9. Write a JavaScript function which accepts an argument and returns the type.
//   Note: There are six possible values that typeof returns: object, boolean, function, number, string, and undefined.

const checkType = (arg) => {
    return typeof arg
}

//10. Write a JavaScript function which returns the n rows by n columns identity matrix.

const identityMatrix = (r, c) => {
    let matrix = []
    for (let row = 0; row < r; row++) {
        if (!matrix[row]) {
            matrix[row]=[]
        }
        for (let col = 0; col < c; col++) {
            if (row === col) {
                matrix[row][col] = 1
            }
            else {
                matrix[row][col]=0
            }
        }
    }
    return matrix
}


//11. Write a JavaScript function which will take an array of numbers stored and find the second lowest and second greatest numbers, respectively. 
const secondLowestAndGreatest = (nums) => {
    if (nums.length === 1) {
        return [nums[0]]
    }
    nums.sort((a,b)=>a-b)
    let numsSet = new Set(nums)
    let newNums = Array.from(numsSet)
    return [newNums[1], newNums[newNums.length-2]]
}

//12. Write a JavaScript function which says whether a number is perfect.
//According to Wikipedia: In number theory, a perfect number is a positive integer that is equal to the sum of its proper positive divisors, that is, the sum of its positive divisors excluding the number itself(also known as its aliquot sum).Equivalently, a perfect number is a number that is half the sum of all of its positive divisors(including itself).
//    Example: The first perfect number is 6, because 1, 2, and 3 are its proper positive divisors, and 1 + 2 + 3 = 6. Equivalently, the number 6 is equal to half the sum of all its positive divisors: (1 + 2 + 3 + 6) / 2 = 6. The next perfect number is 28 = 1 + 2 + 4 + 7 + 14. This is followed by the perfect numbers 496 and 8128.


const perfectNumber = (n) => {
    let sum = 1
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            sum+=i
        }
    }
    return sum===n
}


//13. Write a JavaScript function to compute the factors of a positive integer.

const factors = (n) => {
    let ans = []
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            ans.push(i)
        }
    }
    return ans
}

//14. Write a JavaScript function to convert an amount to coins.
//Sample function: amountTocoins(46, [25, 10, 5, 2, 1])
//Here 46 is the amount.and 25, 10, 5, 2, 1 are coins.
    //Output: 25, 10, 10, 1

const coinAmount = (amount, coins=[25,10,5,2,1]) => {
    let ans = []
    let sub = amount
    for (let i = 0; i < coins.length; i++) {
        if (sub - coins[i] < 0) {
            continue
        }
        if (sub - coins[i] >= coins[i]) {
            sub-=coins[i]
            ans.push(coins[i])
            i--
        }
        else {
            sub -= coins[i]
            ans.push(coins[i])
        }
    }
    return ans
}

//15. Write a JavaScript function to compute the value of bn where n is the exponent and b is the bases.Accept b and n from the user and display the result.

const exponent = (b, n) => {
    if (n=== 0) {
        return 1
    }
    if (n < 0) {
        return exponent(1 / b, -n)
    }
    else if (n% 2 === 1){
        return b * exponent(b * b, Math.floor(n / 2))
    }
    else {
        return exponent(b*b, n/2)
    } 
}

console.log(exponent(9,-2))

//16. Write a JavaScript function to extract unique characters from a string.
//Example string: "thequickbrownfoxjumpsoverthelazydog"
// Expected Output: "thequickbrownfxjmpsvlazydg

const unique = (strng) => {
    let counter = {}
    for (let i = 0; i < strng.length; i++) {
        if (counter[strng[i]] === undefined) {
            counter[strng[i]] = 1
        }
        else {
            counter[strng[i]]++
            if (counter[strng[i]]>1) {
                strng = strng.slice(0, i)+strng.slice(i+1, strng.length)
            }
            i--
        }
    }
    return strng
}

//17. Write a JavaScript function to get the number of occurrences of each letter in specified string. 
const occurrences = (strng) => {
    let counter = {}
    for (let i = 0; i < strng.length; i++) {
        if (counter[strng[i]] === undefined) {
            counter[strng[i]] = 1
        }
        else {
            counter[strng[i]]++

        }
    }
    return counter
}

//18. Write a function for searching JavaScript arrays with a binary search.
//  Note: A binary search searches by splitting an array into smaller and smaller chunks until it finds the desired value.

const binarySearch = (arr, target) => {
    arr.sort((a, b) => {
        return a-b
    })
    let i = 0
    let j = arr.length - 1
    while (i <= j) {
        let mid = (i + j) / 2
        if (arr[mid] === target) {
            return mid
        }
        else if (arr[mid] > target) {
            j = mid - 1
        }
        else if (arr[mid] < target) {
            i = mid + 1
        }
    }
    return -1
}


//19. Write a JavaScript function that returns array elements larger than a number. 
const largerNumbers = (nums, target) => {
    let arr = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > target) {
            arr.push(nums[i])
        }
    }
    return arr
}

//20. Write a JavaScript function that generates a string id (specified length) of random characters.
//Sample character list: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const stringId = (charList, length) => {
    console.log(charList.length)
    let str = ""
    for (let i = 0; i < length; i++) {
        str+=charList[Math.floor(Math.random()* charList.length)+1]
    }
    return str
}

//21. Write a JavaScript function to get all possible subset with a fixed length(for example 2) combinations in an array. 
//Sample array: [1, 2, 3] and subset length is 2 
//Expected output: [[2, 1], [3, 1], [3, 2]]
const _subsets = (nums, length, result = [], arr = [], start = 0) => {
    if (start > nums.length) return
    if (arr.length == length) {
        result.push(arr.slice())
    }
    for (let i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue
        arr.push(nums[i])
        _subsets(nums, length, result, arr, i + 1)
        arr.pop()
    }
    return result
}

//22. Write a JavaScript function that accepts two arguments, a string and a letter and the function will count the number of occurrences of the specified letter within the string. 
//Sample arguments: 'microsoft.com', 'o' 
//Expected output: 3 
const letterCounter = (strng, letter) => {
    let counter = 0
    for (let i = 0; i < strng.length; i++) {
        if (strng[i].toLowerCase() === letter.toLowerCase()) {
            counter++
        }
    }
    return counter
}

//23. Write a JavaScript function to find the first not repeated character. 
//Sample arguments: 'abacddbec' 
//Expected output: 'e' 
const nonRepeatedChar = (strng) => {
    let strngArr = strng.split("").sort()
    for (let i = 1; i < strng.length; i++) {
        if(strng[i] != strng[i-1] && strng[i] != strng[i+1]) return strng[i]
    }
    return -1
}

//24. Write a JavaScript function to apply Bubble Sort algorithm.
//    Note: According to wikipedia "Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order". 
//Sample array: [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]
//Expected output: [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
const bubbleSort = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = arr.length - 1; j >= 0; j--) {
            if (arr[j] > arr[j - 1]) {
                let temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j-1]=temp
            }
        }
    }
    return arr
}

//25. Write a JavaScript function that accept a list of country names as input and returns the longest country name as output. 
//Sample function: Longest_Country_Name(["Australia", "Germany", "United States of America"])
//Expected output: "United States of America"
const longestCountryName = (countries) => {
    countries.sort((a, b) => {
        return b.length-a.length
    })

    return countries[0]
}

//26. Write a JavaScript function to find longest substring in a given a string without repeating characters. 
const longestWithoutRepeating = (strng) => {
    let seen = {}
    let max = 0
    let start = 0
    let str = ""
    for (let i = 0; i < strng.length; i++) {
        if (strng[i] in seen) {
            start = Math.max(start, seen[strng[i]]+1)
        }

        seen[strng[i]] = i
        
        if (Math.max(max, i - start + 1) > max) {
            max = Math.max(max, i - start + 1)
            str = strng.slice(start, i + 1)
        }
        
    }

    return str
    
}


//27. Write a JavaScript function that returns the longest palindrome in a given string.
//   Note: According to Wikipedia "In computer science, the longest palindromic substring or longest symmetric factor problem is the problem of finding a maximum-length contiguous substring of a given string that is also a palindrome. For example, the longest palindromic substring of "bananas" is "anana". The longest palindromic substring is not guaranteed to be unique; for example, in the string "abracadabra", there is no palindromic substring with length greater than three, but there are two palindromic substrings with length three, namely, "aca" and "ada".
//In some applications it may be necessary to return all maximal palindromic substrings(that is, all substrings that are themselves palindromes and cannot be extended to larger palindromic substrings) rather than returning only one substring or returning the maximum length of a palindromic substring.
var longestPalindrome = function (s) {

    let start = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
        let odd = helper(s, i, i)
        let even = helper(s, i, i + 1)
        let max = Math.max(odd, even)
        if (max > end - start) {
            start = i - Math.floor((max - 1) / 2)
            end = i + Math.floor(max / 2)
        }
    }
    return s.substring(start, end + 1)

};

let helper = (s, left, right) => {

    while (left >= 0 && right < s.length && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1

}


//28. Write a JavaScript program to pass a 'JavaScript function' as parameter.

const useFunction = (value, cb) => {
    return cb(value)
}

//29. Write a JavaScript function to get the function name. 
const getFunctionName = (func) => {
    return func.name
}

// Exercise 
// array 
const arr = [1, 2, 3];
// console.log(arr);
// own map function
Array.prototype.myMap = function(callbackFn) {
    const result = [];
    for(let i = 0; i < this.length; i++){
        let newVal = callbackFn(this[i], i, this);
        result.push(newVal);
    }
    return result;
}
const outputMap = arr.myMap(function(curr, index, array){
    console.log('current item: ', curr, 'index: ', index);
    return 2*curr;
})
console.log(outputMap);
// Exercise: create your own reduce function
Array.prototype.myReduce = function(callbackFn) {
    let result = 0;
    for(let i = 0; i < this.length; i++){
        let newVal = callbackFn(this[i], i);
        result += newVal;
    }
    return result;
}
const outputReduce = arr.myReduce(function(curr, index){
    console.log('current item: ', curr, 'index: ', index);
    return curr;
})
console.log(outputReduce);

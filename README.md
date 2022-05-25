# Verbal_Expressions

## JS Verbal Expressions - HMOS

Verbal Expressions is a Javascript library that helps construct difficult regular expressions.

Not everyone is a regex expert, and in practical use cases, a developer needs a semantic, understandable and API-based approach for string matching.

This modified and updated utility library is now completely ready for tackling complex problems in Harmony OS.

## Installation Instructions

    npm install https://github.com/Applib-OpenHarmony/Verbal_Expressions

## After Installation, For Local Demonstration, Run

    npm install

## Change Log

* A complete overhaul of the library structure to support working imports in HMOS

* Addition of 4 lookaround combinations (positive / negative, lookahead / lookbehind)

* Autocomplete and ESLint support with helpful information on the new API functionalities as you code

## Examples

Here are some simple examples to give an idea of how VerbalExpressions works:

### Testing if we have a valid URL

```js
// Create an example of how to test for correctly formed URLs
const tester = VerEx()
    .startOfLine()
    .then('http')
    .maybe('s')
    .then('://')
    .maybe('www.')
    .anythingBut(' ')
    .endOfLine();

// Create an example URL
const testMe = 'https://www.google.com';

// Use RegExp object's native test() function
if (tester.test(testMe)) {
    alert('We have a correct URL'); // This output will fire
} else {
    alert('The URL is incorrect');
}

console.log(tester); // Outputs the actual expression used: /^(http)(s)?(\:\/\/)(www\.)?([^\ ]*)$/
```

### Replacing strings

```js
// Create a test string
const replaceMe = 'Replace bird with a duck';

// Create an expression that seeks for word "bird"
const expression = VerEx().find('bird');

// Execute the expression like a normal RegExp object
const result = expression.replace(replaceMe, 'duck');

// Outputs "Replace duck with a duck"
alert(result);
```

### Shorthand for string replace

```js
const result = VerEx().find('red').replace('We have a red house', 'blue');

// Outputs "We have a blue house"
alert(result);
```

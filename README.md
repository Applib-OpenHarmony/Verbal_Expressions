# Verbal_Expressions

## JS Verbal Expressions - HMOS

Verbal Expressions is a Javascript library that helps construct difficult regular expressions. A developer needs a semantic, understandable and API-based approach for string matching.

This modified and updated utility library is now completely ready for tackling complex problems in Harmony OS.

## Installation Instructions

    npm install https://github.com/Applib-OpenHarmony/Verbal_Expressions

#### After Installation, For Local Demonstration, Run

    npm install

## Usage Instructions

```js
import VerEx from "ohos_verbal_expressions"
```

## Usecases

Here are some simple usecases to give an idea of how VerbalExpressions works:

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

### Password Validation

Rules for password:
*  It must have between 6 and 10 alphanumeric or underscore characters.
*  It must include at least two lowercase letter.
*  It must include at least three uppercase letters.
*  It must include at least one digit.

```js
regex = VerEx()
            .positiveLookAhead(VerEx().multiple(VerEx().anyOf('a-zA-Z0-9_'), 6, 10))
            .positiveLookAhead(VerEx().multiple(VerEx().anythingBut('a-z').oneOrMore().anyOf('a-z'), 2))
            .positiveLookAhead(VerEx().multiple(VerEx().anythingBut('A-Z').oneOrMore().anyOf('A-Z'), 3))
            .positiveLookAhead(VerEx().multiple(VerEx().anythingBut('0-9').oneOrMore().anyOf('0-9'), 1))

//Testing if the password is valid - returns a boolean
regex.toRegExp().test(this.password)
```

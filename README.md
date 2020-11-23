
<p align="center">
  <img width="420"src="https://i.ibb.co/7S37fqL/conlog.png">
</p>

# conlog.js - Re-inventing the `console.log`.
This simple module with 

# Why ?
I love using `console.log` when I'm writing code. I love to test with it, debug with it or just writing regular runtime logs.
`console.log` have a lot of features like `console.warn` or `console.error` - But eventually I'm still using `console.log`. 

This module with log your logs with a smarter way with **No Code Change!** 

## How?
This modules changes the `console.log` core functionality - that's why you should NOT write any changes to your code to use it.
Each time you send `console.log`, it detects the words and objects and searches for keys like 'error', 'test', 'success' and so on, and matching the correct color.

More details in Usage section.

# Installation

```
npm install conlog
```

CDN library not available yet.

# Usage

Add this to the start of your program:
```javascript
require('conlog').init()
```
And that's it! Simple.

If you would like to disable the word detection you can set:
```javascript
require('conlog').init({enableIntelligence:false})
```
By configuring this, the logs will print only the date & time.

Maped strings for now:
```javascript
errorStrings: ['err', 'problem', 'fail'],
passedStrings: ['passed', 'complete', 'success'],
testStrings: ['test', 'check'],
```
you can add/edit your own keys by overwriting the existing setting:
```javascript
require('conlog').init({passedStrings:['my-own-string', 'my-second-string']})
```

Each log that contains the string (even part of it) it will match the correct color, For example:
If the `errorStrings` is ['err']
The next logs will be printed in red color:
```javascript
console.log('err in line 3')
console.log('error in line 5')
console.log('multiple errors has occurred')
```

## Example

Example node.js program that demonstrate logs usage:

```javascript
require('./src/conlog').init()

console.log("Starting with Node.js script..")

let x = 4
let y = 12

console.log("Sum of two numbers: ", x+y)

console.log("Testing new feature..") //Contains "test" = will be printed in pink color
try{
	/*
	*	New Feature Algorithm
	*/
	throw new Error()
}catch{
	console.log("Failed with Feature No' 1") //Contains "fail" = will be printed in red color
}

console.log("Simulating long runtime code..")
/*
*	Uploading file etc.
*/
setTimeout(() => {
	console.log("Successfully Completed!") //Contains "success" = will be printed in green color
}, 1000)

setTimeout(() => {
	console.log("Debugging objects: ", {key1: "value1", key2: "Error"}) //Contains "error" = will be printed in red color
	console.log("Another object without e-r-r-o-r strings: ", {key1: "value1", key2: "val2"}) //Not contains any special keys, will be printed in white
}, 2000)

```

### Before - Simple logs

<p align="center">
  <img width="420"src="https://i.ibb.co/vmbc6n4/beforef.png">
</p>

### After

<p align="center">
  <img width="420"src="https://i.ibb.co/6Y6QGPf/afterf.png">
</p>




require('./src/autocon').init()

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

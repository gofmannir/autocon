var clc = require("cli-color")

const getLogTime = () => {
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute:'numeric' }
	var today  = new Date()
	return today.toLocaleDateString("en-US", options) + ":>"
}
const arg_contain_string = (arg, str) => {
	try{
		return arg.toLowerCase().includes(str)
	}catch{
		return false
	}
} 

const init = function(...props) {
	console.log("Initializing console.log with props: ", props)

	for(prop of props){
		let key = Object.keys(prop)[0]
		let val = prop[key]
		this.settings[key] = val
	}

	var conlogObj = this

	var old_log = console['log'].bind(console)
    console['log'] = function() {
		//Dealing with objects wanted to be printed & trim quotation marks of strings
		arguments = [...arguments].map(arg => JSON.stringify(arg)).map(arg => arg.replace(/^"(.+(?="$))"$/, '$1')) 

		//Add date & time at the beginning of the log
		arguments = [conlogObj.settings.time_color(getLogTime())].concat(...arguments)

		//Add color base on intelligense options
		if(conlogObj.settings.enableIntelligence){
			//Errors
			if(arguments.filter(arg => conlogObj.settings.errorStrings.map(str => arg_contain_string(arg, str)).some(v => v == true)).length != 0){
				arguments = arguments.map(arg => conlogObj.settings.error_color(arg))
			}else{
				//Pass / Success
				if(arguments.filter(arg => conlogObj.settings.passedStrings.map(str => arg_contain_string(arg, str)).some(v => v == true)).length != 0){
					arguments = arguments.map(arg => conlogObj.settings.pass_color(arg))
				}else{
					//Testing / Checking things
					if(arguments.filter(arg => conlogObj.settings.testStrings.map(str => arg_contain_string(arg, str)).some(v => v == true)).length != 0){
						arguments = arguments.map(arg => conlogObj.settings.test_color(arg))
					}else{
						arguments = arguments.map(arg => arg)
					}
				}
			}
		}

        old_log.apply(
            console,
            arguments
        );
	};
	
	var old_warn = console['warn'].bind(console)
	console['warn'] = function() {
		//Dealing with objects wanted to be printed
		arguments = [...arguments].map(arg => JSON.stringify(arg)).map(arg => arg.replace(/^"(.+(?="$))"$/, '$1'))
		//Add date & time at the beginning of the log
		arguments = [conlogObj.settings.time_color(getLogTime())].concat(...arguments)

		arguments = arguments.map(arg => conlogObj.settings.warn_color(arg))
					
        old_warn.apply(
            console,
            arguments
        );
	}

	var old_error = console['error'].bind(console)
	console['error'] = function() {
		//Dealing with objects wanted to be printed
		arguments = [...arguments].map(arg => JSON.stringify(arg)).map(arg => arg.replace(/^"(.+(?="$))"$/, '$1'))
		//Add date & time at the beginning of the log
		arguments = [conlogObj.settings.time_color(getLogTime())].concat(...arguments)

		arguments = arguments.map(arg => conlogObj.settings.error_color(arg))
					
        old_error.apply(
            console,
            arguments
        );
    };

	console.log("Successfuly Initialized!")
}


var conlog = {
	settings: {
		enableIntelligence: true,
		errorStrings: ['err', 'problem', 'fail'],
		passedStrings: ['passed', 'complete', 'success'],
		testStrings: ['test', 'check'],
		error_color: clc.xterm(196),
		pass_color: clc.xterm(41),
		time_color: clc.xterm(247),
		test_color: clc.xterm(176),
		warn_color: clc.xterm(215)
	},
	init: init
}
module.exports = conlog
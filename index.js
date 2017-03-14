const Docker = require('dockerode')

module.exports = function(opts){
	
	//Create modified docker instance
	const docker = Docker(opts)
	docker.modem.___dial = docker.modem.dial
	docker.modem.dial = function(...args){
		
		//Collect arguments
		const request = args[0]
		const callback = args[1]
		const name = request.method + ' ' + request.path
		
		//Check whether overide exists
		if (module.exports.overides.hasOwnProperty(name)){
			console.log('Docker made overidden request to ' + name)
			
			//Pass to overide
			const overide = module.exports.overides[name]
			callback(overide.error, overide)
			
		}else{
			console.log('Docker made native request to ' + name)
			
			//Otherwise default to modem
			return docker.modem.___dial(...args)
		}
	}
	return docker
}

module.exports.overides = {}
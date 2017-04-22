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
		const host = request.method + ' ' + opts.host + request.path
		const url = request.method + ' ' + opts.host + ':' + opts.port + request.path
		const full = request.method + ' ' + opts.protocol + '://' + opts.host + ':' + opts.port + request.path
		
		//Check whether overide exists
		let chosen
		if (module.exports.overrides.hasOwnProperty(name)){
			chosen = name
		}else if (module.exports.overrides.hasOwnProperty(host)){
			chosen = host
		}else if (module.exports.overrides.hasOwnProperty(url)){
			chosen = url
		}else if (module.exports.overrides.hasOwnProperty(full)){
			chosen = full
		}
		
		//Check whether overide exists
		if (chosen !== undefined){
			console.log('Docker made overidden request to ' + chosen)
			
			//Pass to overide
			const overide = module.exports.overrides[chosen]
			if (overide.hasOwnProperty('error')){
				throw new Error(overide.error)
			}else{
				callback(undefined, overide)
			}
			
		}else{
			console.log('Docker made native request to ' + full)
			
			//Otherwise default to modem
			return docker.modem.___dial(...args)
		}
	}
	return docker
}

module.exports.overrides = {}
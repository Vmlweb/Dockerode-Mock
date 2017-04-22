# Dockerode Mock

Mocking module for Dockerode.

## Usage

First install the package.

```bash
npm install --save-dev dockerode-mock
```

Next use a mocking library to replace the dockerode module with dockerode-mock.

Finally specify the overrides you wish to use before and after each test.

```javascript
import * as docker from 'dockerode-mock'

//Apply to all engines
docker.overrides = {
	'GET /_ping': { error: 'connection error' },
	'GET /containers/json?': { ... },
}

//Apply to specific engines
docker.overrides = {
	'GET 192.168.0.5/_ping': 'OK',
	'GET 192.168.0.5:4243/_ping': 'OK',
	'GET tcp://192.168.0.5:4243/_ping': { error: 'connection error' }
}
```
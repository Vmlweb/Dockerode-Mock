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

docker.overides['GET /containers/json?'] = {
	..
}

docker.overides['GET /containers/json?'] = {
	error: ..
}
```
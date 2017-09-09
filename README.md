# CEP Aberto JavaScript SDK

[![Build Status](https://travis-ci.org/devsdmf/cepaberto.js.svg?branch=master)](https://travis-ci.org/devsdmf/cepaberto.js)
[![Coverage Status](https://coveralls.io/repos/github/devsdmf/cepaberto.js/badge.svg?branch=code-coverage)](https://coveralls.io/github/devsdmf/cepaberto.js?branch=code-coverage)

This is the JavaScript SDK for the CEP Aberto API to search for addresses and zipcodes directly from your JS application.

CEP Aberto is an Open Database Project that provides a free of charge zipcode database and a simple API that allows you to fetch the information on-the-fly.

## Installation

```
$ npm install --save cepaberto
```

## Usage

Importing the library to your code:

```javascript
const CEPAberto = require('cepaberto')

let cepaberto = new CEPAberto()
```

#### Find address by zipcode

```javascript
cepaberto.findByCode('30180-000')
         .then((address) => console.log(address))
         .catch((err) => console.error(err))
```

If the address was not found, the address variable will be a `boolean false`.

#### Find address by coordinates

```javascript
cepaberto.findByCoordinates('-40.9182391','-12.0918236')
         .then((address) => console.log(address))
         .catch((err) => console.error(err))
```

#### Find zipcode by address

```javascript
cepaberto.findByAddress('MG', 'Belo Horizonte', 'Centro', 'Av. Amazonas')
         .then((address) => console.log(address))
         .catch((err) => console.error(err))
```

*Only the state and city parameters are mandatory because some zipcodes represents an entire city.*

#### Find cities

```javascript
cepaberto.findCities('MG')
         .then((cities) => console.log(cities))
         .catch((err) => console.error(err))
```

## Tests

```
$ npm test
```

## License

This library is licensed under the [MIT license](LICENSE).

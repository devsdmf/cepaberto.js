'use strict';

const request = require('request')
const Address = require('./address')

const url = (endpoint, format = 'json') => `http://www.cepaberto.com/api/v2/${endpoint}.${format}`

const call = (options, callback) => request.get(options, callback)

class CEPAberto {

  constructor(apiToken) {
    if (typeof apiToken === 'undefined') {
      throw new Error('Missing parameter apiToken in CEPAberto constructor')
    }

    Object.defineProperty(this, 'apiToken', {
      get: () => this._apiToken,
      set: apiToken => this._apiToken = apiToken
    })

    this.apiToken = apiToken
  }

  findByCode(zipcode) {
    let options = {
      uri: url('ceps'),
      qs: {
        cep: zipcode
      },
      headers: this.getHeaders(),
      json: true
    }

    return new Promise((resolve, reject) => {
      request.get(options, (err, res, body) => {
        if (res && res.statusCode === 200) {
          if (Object.keys(body).length > 0) {
            let addr = new Address()
            addr.hydrate(body)

            resolve(addr)
          } else {
            resolve(false)
          }
        } else if (err) {
          throw new Error('Error: ' + err)
        } else {
          throw new Error('An unknown error occurred')
        }
      })
    })
  }

  findByCoordinates(latitude, longitude) {
    let options = {
      uri: url('ceps'),
      qs: {
        lat: latitude,
        lng: longitude
      },
      headers: this.getHeaders(),
      json: true
    }

    return new Promise((resolve, reject) => {
      request.get(options, (err, res, body) => {
        if (res && res.statusCode === 200) {
          if (Object.keys(body).length > 0) {
            let addr = new Address()
            addr.hydrate(body)

            resolve(addr)
          } else {
            resolve(false)
          }
        } else if (err) {
          throw new Error('Error: ' + err)
        } else {
          throw new Error('An unknown error occurred')
        }
      })
    })
  }

  findByAddress(street, neighborhood, city, state) {
    let options = {
      uri: url('ceps'),
      qs: {
        logradouro: street,
        bairro: neighborhood,
        cidade: city,
        estado: state
      },
      headers: this.getHeaders(),
      json: true
    }

    return new Promise((resolve,reject) => {
      request.get(options, (err, res, body) => {
        if (res && res.statusCode === 200) {
          if (Object.keys(body).length > 0) {
            let addr = new Address()
            addr.hydrate(body)

            resolve(addr)
          } else {
            resolve(false)
          }
        } else if (err) {
          throw new Error('Error: ' + err)
        } else {
          throw new Error('An unknown error occurred')
        }
      })
    })
  }

  findCities(state) {
    let options = {
      uri: url('cities'),
      qs: {
        estado: state
      },
      headers: this.getHeaders(),
      json: true
    }

    return new Promise((resolve, reject) => {
      request.get(options, (err, res, body) => {
        if (res && res.statusCode === 200) {
          let cities = body.map(city => city.nome)
          resolve(cities)
        } else if (err) {
          throw new Error('Error: ' + err)
        } else {
          throw new Error('An unknown error occured')
        }
      })
    })
  }

  getHeaders(additionalHeaders = {}) {
    return Object.assign({'Authorization': `Token token="${this.apiToken}"`}, additionalHeaders);
  }

}

module.exports = CEPAberto

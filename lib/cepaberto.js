'use strict';

const request = require('request')
const Address = require('./address')

const url = (endpoint, format = 'json') => `http://www.cepaberto.com/api/v2/${endpoint}.${format}`

const buildOptions = (host, qs, headers) => ({ uri: host, qs: qs, headers: headers, json: true })

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
    let options = buildOptions(url('ceps'), { cep: zipcode }, this.getHeaders())

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
    let options = buildOptions(url('ceps'), { lat: latitude, lng: longitude}, this.getHeaders())

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

  findByAddress(state, city, neighborhood, street) {
    let qs = {
      estado: state,
      cidade: city
    }

    if (typeof neighborhood !== 'undefined') qs.bairro = neighborhood

    if (typeof street !== 'undefined') qs.logradouro = street

    let options = buildOptions(url('ceps'), qs, this.getHeaders())

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
    let options = buildOptions(url('cities'), { estado: state }, this.getHeaders())

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

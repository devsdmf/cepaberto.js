'use strict';

class Address {

  constructor () {
    Object.defineProperty(this, 'street', {
      get: () => this._street,
      set: (street) => this._street = street
    })

    Object.defineProperty(this, 'neighborhood', {
      get: () => this._neighborhood,
      set: (neighborhood) => this._neighborhood = neighborhood
    })

    Object.defineProperty(this, 'state', {
      get: () => this._state,
      set: (state) => this._state = state
    })

    Object.defineProperty(this, 'zipcode', {
      get: () => this._zipcode,
      set: (zipcode) => this._zipcode = zipcode
    })

    Object.defineProperty(this, 'ibgeCode', {
      get: () => this._ibgeCode,
      set: (code) => this._ibgeCode = code
    })

    Object.defineProperty(this, 'areaCode', {
      get: () => this._areaCode,
      set: (code) => this._areaCode = code
    })

    Object.defineProperty(this, 'altitude', {
      get: () => this._altitude,
      set: (altitude) => this._altitude = altitude
    })

    Object.defineProperty(this, 'latitude', {
      get: () => this._latitude,
      set: (latitude) => this._latitude = latitude
    })

    Object.defineProperty(this, 'longitude', {
      get: () => this._longitude,
      set: (longitude) => this._longitude = longitude
    })

  }

}

module.exports = Address

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

    Object.defineProperty(this, 'city', {
      get: () => this._city,
      set: (city) => this._city = city
    })

    Object.defineProperty(this, 'state', {
      get: () => this._state,
      set: (state) => this._state = state
    })

    Object.defineProperty(this, 'zipcode', {
      get: () => this._zipcode,
      set: (zipcode) => this._zipcode = zipcode
    })

    Object.defineProperty(this, 'ibge', {
      get: () => this._ibge,
      set: (ibge) => this._ibge = ibge
    })

    Object.defineProperty(this, 'area', {
      get: () => this._area,
      set: (area) => this._area = area
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

  hydrate(data) {
    if (Object.keys(data).length === 0) {
      throw new Error('Invalid data set for hydrate method')
    }

    this.street = data.logradouro
    this.neighborhood = data.bairro
    this.city = data.cidade
    this.state = data.estado
    this.zipcode = data.cep
    this.ibge = data.ibge
    this.area = data.ddd
    this.altitude = data.altitude
    this.latitude = data.latitude
    this.longitude = data.longitude
  }

}

module.exports = Address

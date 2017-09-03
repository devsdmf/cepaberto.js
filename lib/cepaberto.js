'use strict';

const Address = require('./address')

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

}

module.exports = CEPAberto

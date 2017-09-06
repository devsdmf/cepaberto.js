
var request = require('request'),
    should = require('should'),
    sinon = require('sinon'),
    CEPAberto = require('../index'),
    cepaberto

const API_TOKEN = 'sample-api-token'

beforeEach(() => {
    cepaberto = new CEPAberto(API_TOKEN)
})

describe('CEPAberto', () => {

    it('#should throw an error if calls constructor without apiToken', () => {
        should(() => new CEPAberto()).throw('Missing parameter apiToken in CEPAberto constructor')
    })

    it('#should be an instance of CEPAberto class', () => {
        cepaberto.should.be.an.instanceOf(CEPAberto)
    })

    it('#should have exaclty the same apiToken setted in constructor', () => {
        cepaberto.apiToken.should.be.eql(API_TOKEN)
    })

    it('#should get the new apiToken when it\'s changed', () => {
        let instance = Object.assign({},cepaberto)
        instance.apiToken = 'changed-api-token'
        instance.apiToken.should.be.eql('changed-api-token')
    })

    it('#should get a valid address', () => {
        sinon.stub(request, 'get').yields(null)
    })

})

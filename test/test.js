
var request = require('request'),
    should = require('should'),
    sinon = require('sinon'),
    nock = require('nock'),
    CEPAberto = require('../index'),
    Address = require('../lib/address'),
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
        let zipcode = '40010000'
        let requestMock = nock('http://www.cepaberto.com')
                                .get('api/v2/ceps.json?cep=' + zipcode)
                                .reply(200, {
                                    "altitude": 7.0,
                                    "bairro": "Comércio", 
                                    "cep": "40010000",
                                    "latitude": "-12.967192",
                                    "longitude": "-38.5101976",
                                    "logradouro": "Avenida da França",
                                    "cidade": "Salvador",
                                    "ddd": 71,
                                    "ibge": "2927408",
                                    "estado": "BA"
                                })
        
        cepaberto.findByCode(zipcode)
                 .then((address) => {
                     address.should.be.an.instanceOf(Address).and.have.property('zipcode',zipcode)
                 })
    })

})

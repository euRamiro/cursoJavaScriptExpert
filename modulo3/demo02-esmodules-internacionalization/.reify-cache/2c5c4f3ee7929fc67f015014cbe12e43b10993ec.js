"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const {describe, it} = mocha

const {expect} = chai


describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '10 bicicleta,patinete 6000 2020-04-06 2020-10-30'
    )
    const expected = {
      from: '2020-04-06',
      to: '2020-10-30',
      vehicles: ['bicicleta','patinete'],
      kmTraveled: '6000',
      id: '10'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    {
      const person = new Person({
        from: '2020-04-06',
        to: '2020-10-30',
        vehicles: ['bicicleta','patinete'],
        kmTraveled: '6000',
        id: '10'
      })
      const result = person.formatted('pt-BR')      
      const expected ={
        id: 10,
        vehicles: 'bicicleta e patinete',
        kmTraveled: '6.000 km',
        from: '06 de abril de 2020',
        to: '30 de outubro de 2020'
      }
      expect(result).to.be.deep.equal(expected)
    }
  }) 
})
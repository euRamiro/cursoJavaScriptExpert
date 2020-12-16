const assert = require('assert')

const arr1 = ['0','1','2']
const arr2 = ['2','0','3']
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ['0','0','1','2','2','3'])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

assert.deepStrictEqual(Array.from(set), ['0','1','2','3'])

//rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0','1','2','3'])
console.log('set.keys', set.keys())
console.log('set.values', set.values())//só existe por conta do map

//no array comum, para saber se um item existe
//[].indexOf('1') !== - 1  ou   [0].includes(0)
assert.ok(set.has('3'))

//mesma teoria do Map, mas você sempre trabalha com a lista toda
//não tem get, então você pode saber se o item está ou não no array e é isso.
//na documentação tem exemplos sobre como fazer uma interceção, saber o que tem
// em uma lista e não tem na outra

//tem nos dois Arrays 
const users01 = new Set([
  'Ramiro',
  'Fernando', 
  'Cleberson'
])

const users02 = new Set([
  'Orlando',
  'Décio',
  'Fernando'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['Fernando'])

const difference = new Set([...users01].filter(user => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['Ramiro','Cleberson'])

//weakSet

//mesma ideia do weakMap
//não é enumerável (iterável)
//só trabalha com chave como referência
//só tem métodos simples
// const user = {id: 123}
// const user2 = {id: 456}

// const weakSet = new WeakSet([user])
// weakSet.add(user2)
// weakSet.delete(user)
// weakSet.has(user)
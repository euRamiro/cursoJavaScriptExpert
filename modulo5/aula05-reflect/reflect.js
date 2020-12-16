'use strict'
const assert = require('assert')

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({arg1:10, arg2:20}, [100]),130)

//um problema que pode acontecer (raro)
//Function.prototype.apply = () => {throw new TypeError('Eita...')}

//esse aqui pode acontecer!
myObj.add.apply = function () {throw new TypeError('lascou...')}

assert.throws(
  () => myObj.add.apply({},[]),
  {
    name: 'TypeError',
    message: 'lascou...'
  }
)

//com reflect
const result = Reflect.apply(myObj.add, {arg1:40, arg2:20}, [200])
assert.deepStrictEqual(result, 260)

//define property
//questões semânticas
function MyDate() {}

//feio demais, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', {value:() => 'hello'})

//aqui faz mas sentido
Reflect.defineProperty(MyDate, 'withReflection', {value:() => 'hello again'})

assert.deepStrictEqual(MyDate.withObject(), 'hello')
assert.deepStrictEqual(MyDate.withReflection(), 'hello again')

//delete property
const withDelete = {user: 'euRamiro'}
//imperformático, evitar ao máximo
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = {user: 'Lord'}
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

//has 
assert.ok('superman' in {superman: ''})
assert.ok(Reflect.has({batman: ''},'batman'))

//ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'Zeus'
}

//com os métodos de Object, temos que fazer duas requisições
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser),
]
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])
//com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])
const assert = require('assert')

const myMap = new Map()

//pode ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Lord', {text:'two'})
    .set(true, () => 'three')

    //usando um constructor
    const myMapConstructor = new Map([
      ['1', 'str1'],
      [1, 'num1'],
      [true, 'bool1'],
    ])

    // console.log('myMap', myMap)
    assert.deepStrictEqual(myMap.get(1), 'one')
    assert.deepStrictEqual(myMap.get('Lord'), {text:'two'})
    assert.deepStrictEqual(myMap.get(true)(), 'three')

    //em Objects a chave só pode ser string ou symbol (number é coergido a string)
    const onlyReferenceWorks = {id: 1}
    myMap.set(onlyReferenceWorks, {name: 'Zeus'})

    assert.deepStrictEqual(myMap.get({id: 1}), undefined)
    assert.deepStrictEqual(myMap.get(onlyReferenceWorks), {name: 'Zeus'})

    //utilitários
    //no Object seria Object.keys({a: 1}).,length
    assert.deepStrictEqual(myMap.size, 4)

    //para verificar se um item existe no objeto
    // item.key = se não existe = undefined
    // if() = coerção implicita para boolean e retorna false
    // o jeito certo em Object é ({name: 'Zeus'}).hasOwnProperty('name')
    assert.ok(myMap.has(onlyReferenceWorks))

    //para remover um item do objeto delete item.id
    //imperformático para o Javascript
    assert.ok(myMap.delete(onlyReferenceWorks))

    //não da para iterar em Objects diretamente
    //tem que transformar com o Object.entries(item)
    assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,'one'],['Lord',{'text':'two'}],[true, ()=>{}]]))

// for (const [key, value] of myMap) {
//   console.log({key, value})
// }    

//Object é inseguro, pois dependendo do nonme da chave, pode substituir algum comportamento padrao
// ({}).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'

//qualquer chave pode colidir, com as propriedades herdadas do objeto, como
//constructor, toString, valueOf e etc
const actor = {
  name: 'Lord e Zeus', 
  toString: 'Cuidado com Lord e Zeus'
}

//não tem restrição de nome da chave
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

//objeto não da para limpar sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()],[])

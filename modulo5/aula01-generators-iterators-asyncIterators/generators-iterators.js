const assert = require('assert')

function* calculation(arq1, arq2){
  yield arq1 * arq2
}

function* main(){
  yield 'rodando...'
  yield '...'
  yield 'aqui...'
  //sem * entende que para retornar a função para executar depois
  //com * executa a função e devolve o retorno.
  yield* calculation(3, 8)
}

const generator = main()

assert.deepStrictEqual(generator.next(), {value:'rodando...', done:false})
assert.deepStrictEqual(generator.next(), {value:'...', done:false})
assert.deepStrictEqual(generator.next(), {value:'aqui...', done:false})
assert.deepStrictEqual(generator.next(), {value:24, done:false})
assert.deepStrictEqual(generator.next(), {value:undefined, done:true})

//outras formas
assert.deepStrictEqual(Array.from(main()),['rodando...','...','aqui...',24])
assert.deepStrictEqual([...main()],['rodando...','...','aqui...',24])

//async iterators para trabalhar com promises
const {readFile, stat, readdir} = require('fs/promises')
function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('ooo Lord!')
}

async function* systemInfo() {
  const file = await readFile(__filename)
  yield {file: file.toString()}
  const {size} = await stat(__filename)
  yield {size}
  const dir = await readdir(__dirname)
  yield {dir} 
}
//para resolver as promises
//Promise.add([...promisified()]).then(results => console.log('promisified',results))
//closures ife  uma função que se auto executa.
;(async () => {
  for await (const item of systemInfo()) {
    console.log('for await', item)
  }
})()
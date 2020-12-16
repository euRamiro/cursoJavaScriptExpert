'user strict'

const assert = require('assert')
const Event = require('events')

const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey]})
    target[propertyKey] = newValue
    return true
  }, 
  get: (object, prop) => {
    //console.log('chamou aqui...', {object, prop})
    return object[prop]
  }
})

//vai executar jaja e continuar executando
setInterval(function() {
  proxy.counter += 1
  console.log('prioridade [3]: setInterval ')
  if(proxy.counter === 12) clearInterval(this)
}, 200)

//executa agora, mas acaba com o ciclo de vida do node
//interrompe a pilha de execução do javascript e insere essa execução no meio
//má prático usar dessa forma
process.nextTick(() => {
  proxy.counter = 2
  console.log('prioridade [0]: nextTick ')
})

//má prática usar o 0 para executar agora
//executa no futuro
setTimeout(() => {
  proxy.counter = 4
  console.log('prioridade [2]: setTimeout')
}, 100)

//se quer executar agora use setImmediate
setImmediate(() => {
  console.log('prioridade [1]: setImmediate', proxy.counter)
})
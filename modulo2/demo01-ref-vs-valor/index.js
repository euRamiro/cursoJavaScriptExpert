const {deepStrictEqual} = require('assert')

let contador1 = 0
let contador2 = contador1
contador2++

const item1 = { contador: 0}
const item2 = item1

//tipo primitivo gera uma cópia em memória.
deepStrictEqual(contador1, 0)
deepStrictEqual(contador2, 1)

//tipo de referência, copia o endereço de memória
//apontando para o mesmo lugar.
item2.contador++
deepStrictEqual(item1, {contador: 1})
item1.contador ++
deepStrictEqual(item2, {contador: 2})
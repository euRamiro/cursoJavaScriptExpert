'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString())
// })

const file = new File()
// ignora o 'this' da classe File
// herda o this do watch!
// watch(__filename, file.watch)

// alternativa feia para nao herdar o this da função
// watch(__filename, (event, filename) => file.watch(event, filename))

// deixar explicito qual é o contexto que a funçao deve seguir
// o bind retorna uma função com o 'this' que se mantém de file, 
// ignorando o watch
watch(__filename, file.watch.bind(file))

// a diferenca entre um e outro, é que um vc passa os argumentos como array e outro uma lista de argumentos
file.watch.call({ showContent: () => console.log('call: olá sinon!') }, null, __filename )
file.watch.apply({ showContent: () => console.log('apply: olá sinon!') }, [null, __filename] )



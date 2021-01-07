'use strict';

const {readFile} = require('fs/promises')
const {join} = require('path')

;(async () => {
  const dataBuffer = readFile(join(__dirname, './../../../docs/contrato.pdf'))
  
})()
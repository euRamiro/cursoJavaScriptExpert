const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async() => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath)
    console.log('result>>>', result);
        const expected = [
            {
              "id": 123,
              "name": "Erick Wendel",
              "profession": "Javascript Instructor",
              "birthDay": 1995
            },
            {
              "id": 321,
              "name": "Fernando Freitas",
              "profession": "Javascript Specialist",
              "birthDay": 1981
            },
            {
              "id": 231,
              "name": "Cleberson",
              "profession": "Java Developer",
              "birthDay": 1995
            }
          ]

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }

})()
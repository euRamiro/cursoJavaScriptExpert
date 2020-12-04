import {writeFile, readFile} from 'fs/promises'

export const save = async(data) => {
  //por ser experimental não tem __filename e __dirname  
  let { pathname: databaseFile } = new URL('./../database.json', import.meta.url)  
  databaseFile = databaseFile.substring(3, databaseFile.length)
  const currentData = JSON.parse((await readFile(databaseFile)))
  currentData.push(data)
  await writeFile(databaseFile, JSON.stringify(currentData))
}
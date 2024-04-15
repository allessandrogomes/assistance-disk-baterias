import { contextBridge, ipcRenderer } from 'electron'

let saveDataRequests = (data) => {
  ipcRenderer.send("saveDataRequests", data)
}

let readDataRequests = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('readDataRequests')

    ipcRenderer.once('readDataRequestsResponse', (event, response) => {
      if (response.error) {
        console.error('Erro ao ler os dados:', response.error)
        reject(response.error)
      } else {
        const jsonData = response.data
        resolve(jsonData)
      }
    })
  })
}

let bridgeRequests = {
  saveDataRequests,
  readDataRequests
}

contextBridge.exposeInMainWorld('bridgeRequests', bridgeRequests)


let saveDataLoanBatteries = (data) => {
  ipcRenderer.send("saveDataLoanBatteries", data)
}

let readDataLoanBatteries = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('readDataLoanBatteries')

    ipcRenderer.once('readDataLoanBatteriesResponse', (event, response) => {
      if (response.error) {
        console.error('Erro ao ler os dados:', response.error)
        reject(response.error)
      } else {
        const jsonData = response.data
        resolve(jsonData)
      }
    })
  })
}

let bridgeLoanBatteries = {
  saveDataLoanBatteries,
  readDataLoanBatteries
}

contextBridge.exposeInMainWorld('bridgeLoanBatteries', bridgeLoanBatteries)
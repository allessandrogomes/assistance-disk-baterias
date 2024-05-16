import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import iconApp from '../../resources/icon.svg?asset'
const fs = require('fs-extra');
const path = require('path');

const documentsPath = `${process.env.USERPROFILE}\\Documents`
const stockflowManagerPath = `${documentsPath}\\stockflow-manager`
 
// Cria os arquivos que irão armazenar os dados, caso não existam
function createFoldersAndDataFiles() {
  const dataFolderPath = path.join(stockflowManagerPath, 'data')
  const dataRequestsJsonPath = path.join(dataFolderPath, 'dataRequests.json')
  const dataLoanBatteriesJsonPath = path.join(dataFolderPath, 'dataLoanBatteries.json')

  if (!fs.existsSync(stockflowManagerPath)) {
    fs.mkdirSync(stockflowManagerPath, { recursive: true })
    console.log("Pasta 'stockflow-manager' criada.")
  }

  if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath)
    console.log("Pasta 'data' criada.")
  }

  if (!fs.existsSync(dataRequestsJsonPath)) {
    fs.writeFileSync(dataRequestsJsonPath, '[]')
    console.log("Arquivo 'dataRequests.json' criado.")
  }

  if (!fs.existsSync(dataLoanBatteriesJsonPath)) {
    fs.writeFileSync(dataLoanBatteriesJsonPath, '[]')
    console.log("Arquivo 'dataLoanBatteries.json' criado.")
  }
}

function createWindow() {

  createFoldersAndDataFiles()

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: iconApp,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { iconApp } : { iconApp }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Salva os dados atualizados de requisições
ipcMain.on('saveDataRequests', (event, dataUpdated) => {
  const filePath = path.join(stockflowManagerPath, 'data/dataRequests.json')

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err)
      return
    }

    let existingData = []
    try {
      existingData = JSON.parse(data)
    } catch (parseError) {
      console.error("Erro ao fazer parse dos dados existentes:", parseError)
      return
    }

    existingData = dataUpdated

    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo:", err)
        return
      }
      console.log("Dados salvos com sucesso.")

      event.sender.send('saveDataRequests', true)
    })
  })
})

// Lê os dados de dataRequests.json e envia para o front end
ipcMain.on('readDataRequests', (event) => {
  const filePath = path.join(stockflowManagerPath, 'data/dataRequests.json')

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err)
      event.sender.send('readDataRequests', { error: err.message })
      return
    }

    try {
      const jsonData = JSON.parse(data)
      event.sender.send('readDataRequestsResponse', { data: jsonData })
    } catch (parseError) {
      console.error("Erro ao fazer parse dos dados:", parseError)
      event.sender.send('readDataRequests', { error: parseError.message })
    }
  })
})

// Salva os dados atualizados de baterias de empréstimo
ipcMain.on('saveDataLoanBatteries', (event, dataUpdated) => {
  const filePath = path.join(stockflowManagerPath, 'data/dataLoanBatteries.json')

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err)
      return
    }

    let existingData = []
    try {
      existingData = JSON.parse(data)
    } catch (parseError) {
      console.error("Erro ao fazer parse dos dados existentes:", parseError)
      return
    }

    existingData = dataUpdated

    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error("Erro ao escrever no arquivo:", err)
        return
      }
      console.log("Dados salvos com sucesso.")

      event.sender.send('saveDataLoanBatteries', true)
    })
  })
})

// Lê os dados de dataLoanBatteries.json e envia para o front end
ipcMain.on('readDataLoanBatteries', (event) => {
  const filePath = path.join(stockflowManagerPath, 'data/dataLoanBatteries.json')

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo:", err)
      event.sender.send('readDataLoanBatteries', { error: err.message })
      return
    }

    try {
      const jsonData = JSON.parse(data)
      event.sender.send('readDataLoanBatteriesResponse', { data: jsonData })
    } catch (parseError) {
      console.error("Erro ao fazer parse dos dados:", parseError)
      event.sender.send('readDataLoanBatteries', { error: parseError.message })
    }
  })
})
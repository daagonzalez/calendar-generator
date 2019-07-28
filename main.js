const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 375,
    height: 805,
    backgroundColor: "#7392b7",
    webPreferences: {
        nodeIntegration: true
      }
  })

  // and load the index.html of the app.
  win.loadURL('file://' + __dirname + '/dist/calendar-generator/index.html')

  win.on('closed', function() {
      win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (win === null) {
        createWindow()
    }
})
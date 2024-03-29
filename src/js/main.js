const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { updateElectronApp } = require('update-electron-app');

updateElectronApp();

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.ico'),
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  console.log(icon);
  win.loadFile('src/html/index.html');

  // Afficher une popup au démarrage de l'application
  if(updateElectronApp){
    dialog.showMessageBoxSync({
      type: 'info',
      title: 'Bienvenue !',
      message: 'Merci d\'utiliser notre application !',
      buttons: ['OK']
    });
  }
};

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
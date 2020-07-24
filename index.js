const electron = require('electron')
const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

const menuTemplate = [
    {
        label: 'todo',
        submenu: [
            { label: 'New todo' },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
                click: _ => app.quit()
            },
        ]
    }
]

if (process.platform === 'darwin') {
    menuTemplate.unshift({})
}

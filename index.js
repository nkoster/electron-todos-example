const DEV = process.env.NODE_ENV !== 'production'

const electron = require('electron')
const { app, BrowserWindow, Menu } = electron

let mainWindow
let addWindow

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL(`file://${__dirname}/main.html`)
    mainWindow.on('closed', _ => app.quit())
    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)
})

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: DEV ? 800 : 300,
        height: DEV ? 600: 200,
        title: 'Add new todo'
    })
    addWindow.loadURL(`file://${__dirname}/add.html`)
}

const menuTemplate = [
    {
        label: 'todo',
        submenu: [
            {
                label: 'New todo',
                click: _ => createAddWindow()
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
                click: _ => app.quit()
            },
        ]
    }
]

process.platform === 'darwin' && menuTemplate.unshift({})

if (DEV) {
    menuTemplate.push({
        label: 'DEV',
        submenu: [
            {
                label: 'DEV tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click: (item, focusedWindow) => {
                    console.log(item.label)
                    focusedWindow.toggleDevTools()
                }
            }
        ]
    })
}

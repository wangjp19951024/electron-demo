
/**
 * 贪吃蛇
 * @author [Wang.j.p]
 * @time 2019.4.9
 */
const {app, globalShortcut, BrowserWindow} = require('electron');
let mainWindow = null;
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 840,
        height: 470,
        useContentSize: true
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    /**注册全局快捷键 macOS ：command + P others : control + P */
    const pauseKey = globalShortcut.register('CommandOrControl+P', () => {
        mainWindow.webContents.send('togglePauseStatus');
    });
    if (!pauseKey) console.error('不能通过快捷键来暂停游戏');

    app.on('will-quit', () => {
        globalShortcut.unregister('CommandOrControl+P');
    })
});
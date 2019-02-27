const electron = require('electron');
const app = electron.app; /**控制应用生命周期 */
const BrowserWindow = electron.BrowserWindow; /**创建本地浏览器窗口的模块 */
const remote = electron.remote; /**交互框 */
// const dialog = remote.dialog; /**交互-对话 */

let win = null; /**自主控制垃圾回收的全局窗口变量 */

function createWindow () {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadFile('index.html');

    /**打开调试工具 */
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
})
app.on('activate', () => {
    if (win == null) createWindow();
})

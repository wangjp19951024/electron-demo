const electron = require('electron');
const app = electron.app; /**控制应用生命周期 */
const BrowserWindow = electron.BrowserWindow; /**创建本地浏览器窗口的模块 */
const remote = electron.remote; /**交互框 */
const Menu = electron.Menu; /**菜单 */

let win;

const template = [{
    label: '窗口一/文件', /**在mac OSX中，为发布的electron程序的第一个菜单选项名称会变成electron，发布后才会。 */
    submenu: [ /**子菜单 */
        {
            label: '选项一',
            role: 'about',
            click: () => {
                let subAboutWin = new BrowserWindow({width: 300, height: 200, parent: win, modal: true});
                subAboutWin.loadFile('https://www.baidu.com');
            }
        },
        {
            type: 'separator' /**菜单的类型是分隔栏 */
        },
        {
            label: '关闭',
            accelerator: 'Command + Q', /**热键 */
            click: () => {
                win.close();
            }
        }
    ]
},
{
    label: '窗口二/编辑',
    submenu: [
        {
            label: '复制',
            click: () => {
                win.webContents.insertText('复制');
            }
        },
        {
            label: '剪切',
            click: () => {
                win.webContents.insertText('剪切');
            }
        },
        {
            type: 'separator'
        },
        {
            label: '查找',
            click: () => {
                win.webContents.insertText('查找');
            }
        },
        {
            label: '替换',
            click: () => {
                win.webContents.insertText('替换');
            }
        },
        {
            label: '打开页面',
            click: () => {
                let subAboutWin = new BrowserWindow({width: 300, height: 200, parent: win, modal: true});
                subAboutWin.loadFile('https://geekori.com');
            }
        }
    ]
}]

function createWindow () {
    // win = new BrowserWindow({file; 'menu.html'});
    // win.loadFile('./menu.html');
    // const menu = Menu.builFromTemplate(template);
    // Menu.setApplication(menu);

    // win.on('close', () => {
        
    // })
    win = new BrowserWindow({width: 800, height: 600});
    win.loadFile('menu.html');
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    win.on('close', () => {
        win = null;
    })
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win == null) createWindow();
})
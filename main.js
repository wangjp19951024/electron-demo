const electron = require('electron');
const app = electron.app; /**控制应用生命周期 */
const BrowserWindow = electron.BrowserWindow; /**创建本地浏览器窗口的模块 */
const remote = electron.remote; /**交互框 */
const Menu = electron.Menu;
const Tray = electron.Tray; /**托盘应用 */
// const dialog = remote.dialog; /**交互-对话 */

let win = null; /**自主控制垃圾回收的全局窗口变量 */

/**role就是菜单项的预定于动作 */
/**type是菜单选项的类型 */

const template = [
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                role: 'undo'
            },
            {
                label: '重做',
                role: 'redo'
            },
            {
                label: '剪切',
                role: 'cut'
            },
            {
                label: '复制',
                role: 'copy'
            },
            {
                label: '粘贴',
                role: 'paste'
            }
        ]
    },
    {
        label: '调试',
        submenu: [
            {
                label: '全屏显示',
                role: 'toggleFullScreen'
            },
            {
                label: '窗口放大10%',
                role: 'zoomIn'
            },
            {
                label: '窗口缩小10%',
                role: 'zoomOut'
            }
        ]
    },
    {
        label: '我的菜单',
        submenu: [
            {
                label: '多选1',
                type: 'checkbox'
            },
            {
                label: '多选2',
                type: 'checkbox'
            },
            {
                label: '多选3',
                type: 'checkbox'
            },
            {
                label: '单选1',
                type: 'radio'
            },
            {
                label: '单选2',
                type: 'radio'
            },
            {
                label: '单选3',
                type: 'radio'
            },
            {
                label: 'windows',
                type: 'submenu',
                role: 'windowMenu'
            }
        ]
    }
]

let tray, contextMenu;
function createWindow () {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadFile('index.html');

    /**打开调试工具 */
    win.webContents.openDevTools();

    tray = new Tray('./chaidog.jpeg'); /**创建一个托盘应用，指定托盘图标 最好是ico图标*/
    contextMenu = Menu.buildFromTemplate([
        {label: '复制', role: 'copy'},
        {label: '粘贴', role: 'paste'},
        {label: '剪切', role: 'cut'},
        {label: '关闭', role: 'close', click: () => {win.close()}}
    ])
    tray.setToolTip('这是一只柴犬'); /**设置托盘指针悬浮提示文本 */
    tray.setContextMenu(contextMenu); /**将托盘图标与上下文连接 */


    if (process.platform == 'darwin') {
        template.unshift({
            label: 'Mac',
            submenu: [
                {
                    label: '关于',
                    role: 'about'
                },
                {
                    label: '开始说话',
                    role: 'startSpeaking'
                },
                {
                    label: '停止说话',
                    role: 'stopSpeaking'
                }
            ]
        })
    }

    function setTitle () {
        if (tray) {
            tray.setTitle('hello world');
        }
    }

    function clickOutBubble () {
        if (tray) {
            tray.displayBalloon({title: '有消息了', icon: './chaidog.jpeg', content: '柴犬来了'});
        }
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu); /**这两句就是装载菜单项 */
    /**开始说话是，mac内置的功能，其他的系统没有这个功能 */

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

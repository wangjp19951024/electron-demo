const electron = require('electron');
const app = electron.app;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;
function saveClick () {
    var win = new BrowserWindow({width: 300, height: 200});
    win.loadURL('https://geekori.com');
}

const customMenu = new Menu();

/**添加最初的应用菜单 */
function all_createMenu () {
    const menu = new Menu();
    var icon = '';
    if (process.platform != 'win32') {
        icon = './chaidog.jpeg';
    } else {
        icon = './chaidog.jpeg';
    }

    var menuItemOpen = new MenuItem({label: '打开', icon: icon});
    var menuItemSave = new MenuItem({label: '保存', click: saveClick});
    var menuItemFile = new MenuItem({label: '文件', submenu: [menuItemOpen, menuItemSave]});
    var menuitemCustom = new MenuItem({label: '定制菜单', submenu: customMenu});
    menu.append(menuItemFile);
    menu.append(menuitemCustom);

    Menu.setApplicationMenu(menu);
} 


/**动态添加菜单
 * 先创建最初的应用菜单
 * electron里不需要使用document.getElementById() 就可直接通过组件的id获取该组件.
 * 通过这些选取的组件的value和type，就可以将组件更新到菜单栏中.
 */

function all_autoAddMenu () {
    var type = 'normal';
    if (radio.checked) {
        type = 'radio';
    }
    if (checkbox.checked) {
        type = 'checkbox';
    }
    customMenu.append(new MenuItem({label: menuitem.value, type: type}));
    menuitem.value = '';
    radio.checked = false;
    checkbox.checked = false;
    /**更新菜单 */
    Menu.setApplicationMenu(Menu.getApplicationMenu());
}

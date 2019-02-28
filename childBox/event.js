const remote1 = require('electron').remote;
const dialog1 = remote1.dialog;
const ipcMain = remote1.ipcMain;
const {ipcRender} = require('electron');
ipcMain.on('close', (event, str) => {
    alert(str);
})
var win;

function openWindow () {
    win = window.open('./child.html', '接受消息', 'width=300,height=200');
}

function onclick_message () {
    win.postMessage('this is child data', '*'); /** 第二个参数*表示来源 */
}

const postLabel = document.querySelector('#postLabel');

function onLoad () {
    window.addEventListener('message', (e) => {
        alert(e.origin);
        postLabel.innerText = e.data;
    })
}
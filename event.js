const remote = require('electron').remote;
const dialog = remote.dialog;
const label = document.querySelector('#label');

function onclick_openFile () {
    console.log('open_file');
    // const label = document.getElementById('label');
    
    label.innerText = dialog.showOpenDialog({properties: ['openFile']});
}

function cutomOpenFile () { /**定制文件对话框内容 */
    let options = {};
    /**for window */
    options.title = '打开文件';
    /**for mac */
    options.message = '打开我的文件';

    options.buttonLabel = '选择';

    options.defaultpath = '.';

    options.properties = ['openFile'];
    label.innerText = dialog.showOpenDialog(options);
    label.innerText = null;
}

function typeOpenFile () { /**选择要打开的文件类型 */
    let options = {};
    options.title = '打开文件';
    options.buttonLabel = '选择';
    options.defaultpath = '.';
    options.properties = ['openFile'];
    options.filters = [
        {name: '图像文件', extensions: ['jpg', 'png', 'gif', 'jpeg']},
        {name: '视频文件', extensions: ['mkv', 'avi', 'mp4']},
        {name: '音频文件', extensions: ['mp3', 'wav']},
        {name: '所有文件', extensions: ['*']}
    ]
    label.innerText = dialog.showOpenDialog(options);
}

function openDirector () { /**选择打开目录 */
    let options = {};
    options.title = '打开目录';
    options.properties = ['openDirectory', 'createDirectory'];
    label.innerText = dialog.showOpenDialog(options);
}

function openMultiDirectory () {
    let options = {};
    options.title = '选择多个文件和目录';
    options.message = '选择多个文件和目录';
    options.properties = ['openFile', 'multiSelections'];
    if (process.platform == 'darwin') {
        options.properties.push('openDirectory');
    }
    dialog.showOpenDialog(options, (filePath) => {
        for (const f in filePath) {
            label.innerText += filePath[f] + '\r\n';
        }
    });
}

/**
 * 对话框类型：type
 * options.type: none 默认
 * info: 消息
 * error: 错误
 * question : 询问
 * w警告 ： warning
 */

function show_messageBox () {
    let options = {};
    options.title = '信息';
    options.message = '这是一个信息提示框';
    options.icon = './chaidog.jpeg';
    label.innerText = dialog.showMessageBox(options);
}

function showError_messageBox () {
    let options = {};
    options.title = '错误';
    options.message = '这是一个错误提示框';
    options.icon = './chaidog.jpeg';
    label.innerText = dialog.showMessageBox(options);
}

/**对话框的按钮：buttons */
function showButton_box () {
    let options = {};
    options.message = '这是一个有按钮的警告框';
    options.type = 'warning';
    options.buttons = ['按钮1', '按钮2', '按钮3'];
    dialog.showMessageBox(options, (res) => {
        console.log('当前的索引是', res);
    });
}

/**dialog.showErrorBox  显示错误对话框
 * title : 标题
 * content : 内容
*/
// function show_error () {
//     let options = {};
//     options.title = '错误提示框';
//     options.content = '这是一个错误';
//     label.innerText = dialog.showErrorBox(options);
// }
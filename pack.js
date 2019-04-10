const remote = require('electron').remote;
const dialog = remote.dialog;
const spawn = require('child_process').execFile;

function onload () {
    let mac = document.getElementById('mac');
    if (process.platform === 'win32') {
        mac.disabled = true;
    }
}

function select_project () { /**打开要打包的额工程目录 */
    let options = {};
    options.title = '选择electron 工程的目录';
    options.properties = ['openDirectory', 'createDirectory'];
    document.getElementById('label_source').innerText = dialog.showOpenDialog(options);
}

function out_project () {
    let options = {};
    options.title = '选择输出目录';
    options.properties = ['openDirectory', 'createDirectory'];
    document.getElementById('label_out').innerText = dialog.showOpenDialog(options);
}

function pack () {
    const args = [];
    args.push(document.getElementById('label_source').innerText);
    args.push(document.getElementById('appName').value);
    args.push('--out=' + document.getElementById('label_out').innerText);
    args.push('--electron-version=3.0.2');
    let os = '';
    if (document.getElementById('asar').checked) args.push('--asar');
    if (document.getElementById('windows')) os += 'win32';
    if (document.getElementById('mac')) {
        if (os != '') os += ',';
        os += 'darwin';
    } 
    if (document.getElementById('linux')) {
        if (os != '') os += ',';
        os += 'linux';
    } 
    if (os != '') args.push('--plaform' + os);
    let cmd = 'electron packager';
    if (process.platform == 'win32') cmd += '.cmd';
    const e = spawn(cmd, args, (err, stdout, stderr) => {
        if (err) {
            console.error('stderr', stderr);
        } else {
            document.getElementById('pack_status').innerText = '打包成功';
        }
    })
    document.getElementById('pack_status').innerText = '正在打包, 请稍后。。。';
}
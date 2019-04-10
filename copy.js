let { remote } = require('electron');
const nativeImage = remote.nativeImage;
const Tray = remote.Tray;
const clipboard = remote.clipboard; /**剪贴板 */

function init () {
    let text = document.getElementById('text');
    text.innerHTML = '<h1>hello world</h1>'
}

function write_text () {
    let text = document.getElementById('text');
    clipboard.writeText(text.textContent);
    console.log('已成功复制到剪贴板')
}

function read_text () {
    let text = document.getElementById('text');
    text.innerHTML += clipboard.readText() + '\n\r';
}

function write_image () {
    const image = nativeImage.createFromPath('./chaidog.jpeg');
    clipboard.writeImage(image);
    console.log('已将图片复制到剪贴板');
}

function read_image () {
    const image = clipboard.readImage();
    const appIcon = new Tray(image);
    console.log(image);
}
const electron = require('electron');
const dialog = electron.remote;
const fs = require('fs');

let photoData, video;

function savePhoto (filePath) {
    if (filePath) {
        /**写入base64的格式的图片数据 */
        fs.writeFile(filePath, photoData, 'base64', function (err) {
            if (err) alert(`保存图片出错 ${err.message}`);
            photoData = null;
        })
    }
}

/**初始化视频流 */
function initialize () {
    video = window.document.querySelector('video');
    let cb = (err) => console.log(`连接视频流出错 ${err.message}`);

    window.navigator.webkitGetUserMedia({video: true}, (localMediaStream) => {
        video.src = window.URL.createObjectURL(localMediaStream);
    }, cb);
}

function takePhoto () {
    let canvas = window.querySelector('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
    photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    dialog.showSaveDialog({
        title: '保存图像',
        defaulPath: './chaidog.jpeg',
        buttonLabel: '保存'
    }, savePhoto);
}

window.onload = initialize;
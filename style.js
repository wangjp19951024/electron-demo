function addStyleSheets (styleSheet) {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', styleSheet + '.css');
    head.appendChild(link);
}

function labelOs (osName) {
    document.getElementsByClassName('os-span')[0].innerText = osName;
}

function initialize () {
    const os = require('os');
    let platform = os.platform();
    switch (platform) {
        case 'darwin':
            addStyleSheets('./cssStyle/mac');
            labelOs('macOs');
        break;
        case 'linux':
            addStyleSheets('linux');
            labelOs('linux');
        break;
        case 'win32':
            addStyleSheets('windows');
            labelOs('Microsoft Windows');
        break;
        default: 
            console.log('无法检测当前平台', platform);
    }
}

window.onload = initialize;
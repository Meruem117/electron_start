// const {
//     contextBridge,
//     ipcRenderer
// } = require('electron')
// const path = require('path')

// contextBridge.exposeInMainWorld('electron', {
//     startDrag: (fileName) => {
//         ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
//     }
// })

const {
    contextBridge,
    ipcRenderer
} = require('electron')

// 深色模式
contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})
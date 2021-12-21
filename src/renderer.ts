// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
import { ElectronBlocker, fullLists, Request } from '@cliqz/adblocker-electron'
import { BrowserWindow } from 'electron'
import { session } from 'electron'
import { Menu, MenuItem } from 'electron'
import { remote, shell } from 'electron'
import { dialog } from 'electron'
import fetch = require('cross-fetch') // required 'fetch'
import { Titlebar, Color } from 'custom-electron-titlebar'
import fs = require('fs')
import path = require('path')
const webview = document.getElementById('webview');

//set titlebar
const tilebar = new Titlebar({
    backgroundColor: Color.fromHex('#0d1117'),
    icon: './icons/icon.ico'
});
tilebar.updateTitle('Univalcord');

// set menu or from titlebar.json
const menu = new Menu();
if (!fs.existsSync('C:/univalcord/titlebar.json')) {
    menus()
    menu.append(new MenuItem({
        label: 'Discord',
        submenu: [{
            label: 'This Window',
            click: () => {
                menu_click_make('discord', 'https://discord.com/app', 'Discord', '#202225')
            }
        }]
    }));
    menu.append(new MenuItem({
        label: 'YouTube',
        submenu: [{
            label: 'This Window',
            click: () => {
                menu_click_make('youtube', 'https://www.youtube.com', 'YouTube', '#212121')
            }
        }]
    }));
} else {
    const myUsers = JSON.parse(fs.readFileSync('C:/univalcord/titlebar.json').toString())
    menus()
    const usersByLikes = myUsers.map((item: { name: any; css: any; link: any; titlebarColor: any }) => {
        const container = menu.append(new MenuItem({
            label: item.name,
            submenu: [{
                label: 'This Window',
                click: () => {
                    menu_click_make(item.css, item.link, item.name, item.titlebarColor)
                }
            }]
        }));
        return container;
    })
    console.log(usersByLikes);
}
tilebar.updateMenu(menu);

// ad blocker

// function
function menu_click_make(fileName: string, url: string, name: string, colorTitlrbar: any) {
    webview.setAttribute('src', url)
    webview.addEventListener('dom-ready', function () {
        if (!fs.existsSync('C:/univalcord/' + fileName + '.css')) {
            console.log('No ' + fileName + '.css found')
        } else {
            webview.insertCSS(fs.readFileSync('C:/univalcord/' + fileName + '.css').toString())
        }
        if (!fs.existsSync('C:/univalcord/' + fileName + '.js')) {
            console.log('No ' + fileName + '.js found')
        } else {
            webview.executeJavaScript(fs.readFileSync('C:/univalcord/' + fileName + '.js').toString())
        }
        tilebar.updateTitle(name);
        tilebar.updateBackground(colorTitlrbar);
    });
}

// menu
function menus() {
    menu.append(new MenuItem({
        label: 'View',
        submenu: [{
            label: 'DevTools',
            click: () => {
                if (!fs.existsSync('C:/univalcord/enableDevTools')) {
                    alert('DevTools has been disabled by default')
                } else {
                    if (webview.isDevToolsOpened()) {
                        webview.closeDevTools()
                    } else {
                        webview.openDevTools()
                    }
                }
            }
        },
        {
            label: 'New Window',
            click: () => {
                createwindow()
            }
        }]
    }));
}

// creates new window whits gets called
async function createwindow() {
    const newWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        backgroundColor: '#0d1117',
        fullscreenable: true,
        titleBarStyle: "hidden", // add this line
        icon: __dirname + '/icons/icon.ico',
        title: 'Univalcord',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            nodeIntegrationInSubFrames: true,
            webSecurity: false,
            webviewTag: true,
            preload: path.join(__dirname, '/preload.js'),
            devTools: false
        }
    })
    newWindow.loadFile(path.join(__dirname, './index.html'))
    newWindow.setMenuBarVisibility(false);
}
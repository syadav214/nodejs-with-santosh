const child_process = require('child_process');
const log = require('../utils/logger');

const get_start_browser_command = (browser, url) => {
    if(browser === 'chrome') {
        return `google-chrome "${url}" --new-window`
    } else if (browser === 'firefox') {
        return `firefox --new-window "${url}"`
    }
    return null;
}

const start_browser = (browser, url) => {
    try {
        const cmd = get_start_browser_command(browser, url);
        child_process.exec(cmd);
    } catch(e){
        log.error(e);
    }
}

const get_stop_browser_command = (browser) => {
    if(browser === 'chrome') {
        return `kill -9 $(ps -x | grep google/chrome)`
    } else if (browser === 'firefox') {
        return `kill -9 $(ps -x | grep firefox)`
    }
    return null;
}

const stop_browser = (browser) => {
    try {
        const cmd = get_stop_browser_command(browser);
        child_process.exec(cmd);
    } catch(e){
        log.error(e);
    }
}

const get_clean_browser_command = (browser) => {
    if(browser === 'chrome') {
        return [
            `rm ~/.config/google-chrome/Default/Cookies`,
            `rm ~/.config/google-chrome/Default/History`,
            `rm -rf ~/.config/google-chrome/Default/Sessions`
        ]
    } else if (browser === 'firefox') {
        return [
            `rm -r  ~/.mozilla/firefox/u7zlt4ts.default-release/*`
        ]
    }
    return null;
}

const clean_browser = (browser) => {
    try {
        const cmd_arr = get_clean_browser_command(browser);
        for(const cmd of cmd_arr){
            child_process.exec(cmd);
        }        
    } catch(e){
        log.error(e);
    }
}

const get_current_tab_url = (browser) => {
    
}

module.exports = {
    start_browser,
    stop_browser,
    clean_browser,
    get_current_tab_url
}
const { Router } = require('express');
const {
    start_browser,
    stop_browser,
    clean_browser,
    get_current_tab_url
} = require('../services/browser_services');

const routes = Router();

routes.get('/start', (req, res) => {
    const { browser, url } = req.query;

    if(!browser || !url){
        return res.sendStatus(400);
    }

    start_browser(browser, url);

    return res.send('browser opened');
});

routes.get('/stop', (req, res) => {
    const { browser } = req.query;

    if(!browser){
        return res.sendStatus(400);
    }

    stop_browser(browser);

    return res.send('browser stopped');
});

routes.get('/cleanup', (req, res) => {
    const { browser } = req.query;

    if(!browser){
        return res.sendStatus(400);
    }

    clean_browser(browser);

    return res.send('browser cleaned up');
});

routes.get('/geturl', (req, res) => {
    res.send('test');
});

module.exports = routes;
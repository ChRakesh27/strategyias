const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Redirect www to non-www
    server.use((req, res, next) => {
        const host = req.headers.host;
        if (host.startsWith('www.')) {
            return res.redirect(301, `https://${host.replace(/^www\./, '')}${req.url}`);
        }
        return next();
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
const http = require('http');
const httpProxy = require('http-proxy');
const ndt = require('nodedomain-util');


const proxy = httpProxy.createProxyServer({});

function sendError(err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(config.error_message);
}
proxy.on('error', sendError);

let config = require('./config.js');
setInterval(() => config = require('./config.js'), 3000);

http.createServer((req, res) => {
        req.on("error", sendError);
        res.on("error", sendError);

        let portsuffix = ':' + config.port;

        let domain = ndt.getDomain(req.headers.host);
        let subdomain = ndt.getSubDomain(req.headers.host) || 'www';

        if (domain.endsWith(portsuffix))
            domain = domain.split(portsuffix)[0];

        let destino = (
            config["domains"] &&
            config["domains"][domain] &&
            config["domains"][domain][subdomain]
        ) || config["fallback"];

        proxy.web(req, res, {
            target: destino
        });

        console.info(` ${ destino == config["fallback"] ?  '❌' : '✔️'}  ${ [subdomain, domain].join('.') } > ${destino}`);
    })
    .listen(config.port);

console.info('listening on port ' + config.port);
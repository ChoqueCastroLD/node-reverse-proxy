const fs = require('fs');
const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');

const ndt = require('nodedomain-util');

const proxy = httpProxy.createProxyServer({});


let config;

function loadConfig () {
    config = require('./config.js')
}

loadConfig();

setInterval( () => loadConfig() , 3000);

http.createServer( (req, res) => {
    
    const domain = ndt.getDomain(req.headers.host);
    const subdomain = ndt.getSubDomain(req.headers.host);

    let destino = config["domains"][domain][subdomain];
    
    if(!destino) destino = config["fallback"];    

    proxy.web(req, res, { target: destino });

    console.info(` ${ destino == config["fallback"] ?  '❌' : '✔️'}  ${ [subdomain, domain].join('.') } > ${destino}`);

})
.listen(80);

console.info("listening on port 80");


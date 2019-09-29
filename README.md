# node-reverse-proxy
A nodejs http reverse proxy implementation



config.js example

```javascript
module.exports = {
	"fallback": "http://127.0.0.1:3000",
	"domains":{
		// Domain
		"luischoque.com": {
			// Subdomains : Local Address
			"": "http://127.0.0.1:3000",
			"www":  "http://127.0.0.1:3000",
			"api": "http://127.0.0.1:4000"
		},
		// Domain
		"mysecretdomain.com": {
			// Subdomains : Local Address
			"": "http://127.0.0.1:5000",
			"www":  "http://127.0.0.1:5000",
			"api": "http://127.0.0.1:6000"
		}
	}
}
```
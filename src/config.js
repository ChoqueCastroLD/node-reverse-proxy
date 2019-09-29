module.exports = {
	'port': process.env.PORT || 90,
	'fallback': 'http://127.0.0.1:3000',
	'error_message': 'Something went wrong. And we are reporting a custom error message.',
	'domains':{
		// Domain
		'localhost': {
			// Subdomains
			'www':  'http://127.0.0.1:3000',
			'api': 'http://127.0.0.1:4000'
		},
		// Domain
		'mysecretdomain.com': {
			// Subdomains
			'www':  'http://127.0.0.1:5000',
			'api': 'http://127.0.0.1:6000'
		}
	}
}

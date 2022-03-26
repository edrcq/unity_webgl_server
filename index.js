const handler = require('serve-handler')
const http = require('http')

const options = {
	cleanUrls: false,
	rewrites: [
		{ "source": "/", "destination": "/index.html" },
	],
	public: "public",
	headers: [
		{
			"source" : "**/*.@(gz)",
			"headers":
			[
				{
					"key" : "Cache-Control",
					"value" : "max-age=0"
				},
				{
					"key": "Content-Encoding",
					"value": "gzip"
				}
			]
		},
		{
			"source" : "**/*.@(wasm\.gz)",
			"headers":
			[
				{
					"key": "Content-Type",
					"value": "application/wasm"
				}
			]
		}
	],
}

/*
er for file Build/Build.wasm.gz , should be "application/wasm". Startup time perfor
*/

const f_handler = async (request, response) => {
	await handler(request, response, options);
};

const server = http.createServer(f_handler)
const port = process.env.PORT || 8042
server.listen(port)
console.log(`http://localhost:${port}`)





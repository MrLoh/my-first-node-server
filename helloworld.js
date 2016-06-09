var http = require("http")

http.createServer((request, response) => {
	response.writeHead(200, {"Content-Type": "text/plain"})
	response.write("Hello World")
	response.end()
	console.log("served hello world")
}).listen(1234)

console.log("server started")

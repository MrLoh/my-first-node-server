const http = require("http")
const url = require("url")
const querystring = require("querystring")
const formidable = require("formidable")

function start(port, route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname
		console.log(`request for ${pathname} received`)

		function respond(content, {success=true, contentType="text/plain"}={}) {
			if( success ){
				response.writeHead(200, {"Content-Type": contentType})
				response.write(content)
			} else {
				response.writeHead(200, {"Content-Type": contentType})
				response.write(content)
			}
			response.end()
		}

		request.setEncoding("utf8")
		var data = ""
		request.addListener("data", (chunk) => {
			console.log("received data chunk")
			data += chunk
		})
		request.addListener("end", () => route(handle, respond, pathname, querystring.parse(data)))

		console.log("")
	}

	var server = http.createServer(onRequest)
	server.listen(port)
	console.log(`server started on ${port}. \n`)
}

exports.start = start
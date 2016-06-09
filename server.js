const http = require("http")
const url = require("url")
const fs = require("fs")
const querystring = require("querystring")
const formidable = require("formidable")

function start(port, route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname
		console.log(`request for ${pathname} received`)

		function respond(content, {success=true, contentType="text/plain"}={}) {
			if( success ){
				response.writeHead(200, {"Content-Type": contentType})
				if( contentType.split("/")[0] === "image" ){
					response.write(content, "binary")
				} else {
					response.write(content)
				}
			} else {
				response.writeHead(200, {"Content-Type": contentType})
				response.write(content)
			}
			response.end()
		}

		var form = new formidable.IncomingForm()
		console.log("about to parse file")
		form.parse(request, (err, data, files) => {
			if( files.upload ){
				fs.rename(files.upload.path, "views/tmp.png")
			}
			route(handle, respond, pathname, data)
		})

		console.log("")
	}

	var server = http.createServer(onRequest)
	server.listen(port)
	console.log(`server started on ${port}. \n`)
}

exports.start = start


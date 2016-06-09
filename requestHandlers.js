const exec = require("child_process").exec
const fs = require('fs')
const mustache = require('mustache')

const templateDir = "views"

function resondWithTemplate(templatename, respond, vars={}) {
	fs.readFile(`${templateDir}/${templatename}.html`, (err, template) => {
		if( err ) {
			throw err
		} else {
			view = mustache.render(template.toString(), vars)
			respond(view, {contentType: "text/html"})
			console.log(`responding with ${templatename} template`)
		}
	})
}

function start(respond) {
	console.log("request handler '/start' was called.")

	// exec("ls -lah", (error, stdout, stderr) => respond(stdout))
	resondWithTemplate("index", respond)
}

function upload(respond, data) {
	console.log("request handler '/upload' was called.")
	resondWithTemplate("upload", respond, data)
	// respond(data)
}

exports.start = start
exports.upload = upload
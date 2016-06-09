const exec = require("child_process").exec
const fs = require('fs')
const mustache = require('mustache')

const templateDir = "views"

function respondWithTemplate(templatename, respond, vars={}) {
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
	respondWithTemplate("index", respond)
}

function upload(respond, data) {
	console.log("request handler '/upload' was called.")
	respondWithTemplate("upload", respond, data)
}

function show(respond) {
	console.log("request handler '/show' was called.")
	fs.readFile(`${templateDir}/tmp.png`, (err, file) => {
		if( err ){
			respond(err, {success: false})
		} else {
			respond(file, {contentType: "image/png"})
		}
	})
}

exports.start = start
exports.upload = upload
exports.show = show
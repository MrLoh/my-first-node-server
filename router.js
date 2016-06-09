function route(handle, respond, pathname, data) {
	console.log(`routing request for ${pathname}.`)
	if( typeof handle[pathname] === "function" ) {
		handle[pathname](respond, data)
	} else {
		respond("404 not found", {success: false})
		console.log(`no request handler for ${pathname} specified.`)
	}
}

exports.route = route
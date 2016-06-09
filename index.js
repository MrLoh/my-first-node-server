const server = require("./server")
const router = require("./router")
const requestHandlers = require("./requestHandlers")

var route = router.route

var handle = {}
handle["/"] = requestHandlers.start
handle["/start"] = requestHandlers.start
handle["/upload"] = requestHandlers.upload
handle["/show"] = requestHandlers.show

server.start(1234, route, handle)

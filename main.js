const ms = require("ms")

const Client = require("./struct/Client")
, client = new Client()


client.start(client.config.token)
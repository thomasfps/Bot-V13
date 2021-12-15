const Event = require("../../struct/Event")

module.exports = new Event("ready",async(client)=>{
    console.log(`${client.user.username} is ready!`)
})
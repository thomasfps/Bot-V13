const Event = require("../../struct/Event")

module.exports = new Event("messageCreate",async(client,message)=>{
    if(message.author.bot || !message.guild)return;

    if(!message.content.startsWith(client.config.prefix)) return;
    const args = message.content.substring(client.config.prefix.length).split(/ +/)

    const command = client.commands.get(args[0]) || client.aliases.get(args[1])
    if(!command) return message.reply(`\`${args[0]}\` is not a valid command!`)

    command.run(client,message,args)
})
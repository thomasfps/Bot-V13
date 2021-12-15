const Command = require("../../struct/Command")
, {MessageEmbed} = require("discord.js")
module.exports = new Command({
    name: "ping",
    aliases: ["p"],
    description: "The ping of the bot",
    category: "Informations",

    run:async(client,message,args)=>{
        await message.reply("Wait...").then(async msg =>{
            const ping = msg.createdTimestamp - message.createdTimestamp;
            const embed = new MessageEmbed()
            .setTitle("Pong! 🏓")
            .addField(`Ping:`, `\`${client.ws.ping}\``,true)
            .addField("Latency",`\`${ping}\``,true)
            .setColor("BLURPLE")
            msg.edit({embeds: [embed],content: " "})
        })

    }
})
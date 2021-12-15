const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
 
module.exports.run = async (client, message, args) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Modifiez l'embed")
        .addOptions([
            {
                label: "Titre",
                description: "Modifier le titre",
                value: "first",
                emoji: '✏️'
                
            },
            {
                label: "Descripition",
                description: "Modifier la description",
                value: "second",
                emoji: "💬"
            },
            {
                label: "Image",
                description: "Modifier l'image",
                value: "third",
                emoji: '🖼️'
                
            },
            {
                label: "Couleur",
                description: "Modifier la couleur",
                value: "fourth",
                emoji: '🔴'
                
            },
            {
                label: "Thumbnail",
                description: "Modifier la miniature",
                value: "fifth",
                emoji: '🏷️'
                
            },
            {
                label: "Footer",
                description: "Modifier le footer",
                value: "sixth",
                emoji: '🔻'
                
            },
            {
                label: "Auteur",
                description: "Modifier l'auteur",
                value: "seventh",
                emoji: '🔸'
                
            },
            {
                label: "Url",
                description: "Modifier l'url",
                value: "eighth",
                emoji: '➡️'
                
            },
            {
                label: "Annuler",
                description: "Annuler l'embed",
                value: "ninth",
                emoji: '❌'
                
            },
            {
                label: "Validé",
                description: "Envoyer",
                value: "tenth",
                emoji: '✅'
                
            },
        ])
    )
const filter = m => message.author.id === m.author.id;
 
const embed = new MessageEmbed()
.setDescription('ㅤ')
 
 
let msgembed = await message.reply({ embeds: [embed], components: [row] })
 
 
const collector =  message.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
})
 
collector.on("collect", async (c) => {
    if(c.user.id !== message.author.id) return
    const value = c.values[0]
 
    if(value == "first") {
        await c.reply("Quel **Titre** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete();
            c.deleteReply()
            embed.setTitle(collected.first().content)
            msgembed.edit({ embeds: [embed] })
    })
}
 
    if(value == "second") {
        await c.reply("Quel **Description** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete();
            c.deleteReply()
            embed.setDescription(collected.first().content)
            msgembed.edit({ embeds: [embed] })
    })
    }
    if(value == "third") {
        await c.reply("Quel **Image** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            let image = collected.first().attachments.first()?.url
            if(!image){
               return message.channel.send('Vous deviez indiquer une **image**')
            }
            collected.first().delete();
            c.deleteReply()
            embed.setImage(image)
            msgembed.edit({ embeds: [embed] })
    })
    }
    if(value == "fourth"){
        await c.reply("Quel **Couleur** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete();
            c.deleteReply()
            embed.setColor(collected.first().content)
            msgembed.edit({ embeds: [embed] })
    })
    }
    if(value == "fifth"){
        await c.reply("Quel **Thumbnail** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            let image = collected.first().attachments.first()?.url
            if(!image){
               return message.channel.send('Vous deviez indiquer une **image**')
            }
            collected.first().delete();
            c.deleteReply()
            embed.setThumbnail(image)
            msgembed.edit({ embeds: [embed] })
    })
    }
 
    if(value == "sixth"){
        await c.reply("Quel **Footer** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete();
            c.deleteReply()
            embed.setFooter(collected.first().content)
            msgembed.edit({ embeds: [embed] })
    })
    }
 
    if(value == "seventh"){
        await c.reply("Quel **Auteur** voulez-vous attribuez à l'embed ?")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete();
            c.deleteReply()
            embed.setAuthor(collected.first().content)
            msgembed.edit({ embeds: [embed] })
    })
    }
    if(value == "heighth"){
 
    }
    if(value == "ninth"){
        await c.reply("Êtes vous sur de vouloir annuler l'embed ? Répondez par (oui/non)")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete()
            if(collected.first().content == "non"){
                collected.first().delete()            
                c.deleteReply()
            } if(collected.first().content == "oui"){
                c.deleteReply()
                collected.first().delete()            
                msgembed.delete()
            } return
    })
    }
    if(value == "tenth"){
        await c.reply("Désormais, indiquez le channel ou je vais envoyer l'embed **(#channel)**")
        message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
        .then(async (collected) => {
            collected.first().delete();
            const channel = collected.first().mentions.channels.first()
            if(!channel) {
                return message.channel.send("Vous deviez indiquer un **channel**");
            }
            channel.send({ embeds: [embed]})
            c.deleteReply()
            msgembed.delete()
        })
    }
})
 
 
}
 
module.exports.help = {
    name: "embed"
}
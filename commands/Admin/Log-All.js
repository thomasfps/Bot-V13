const fetchAll = require('discord-fetch-all');
const hastebin = require('better-hastebin');
const end = "\n\u200b\nCes logs ont été genérés automatiquement"
         message.delete()
         const msgd = await message.channel.send('⚠️ Je lance la récupération des messages, cela peut prendre un moment !')
         
         const allMessages = await fetchAll.messages(message.channel, {
             reverseArray: true,
             userOnly: true, 
             botOnly: false,
             pinnedOnly: false, 
         });
         const results = allMessages.map(msg => `[${moment(msg.createdTimestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM")}] - ${msg.author.tag} - (${msg.author.id}) : ${msg.content}`).join('\n')
         


         

         let options = {
           server: 'https://haste.chaun14.fr/'//vous mettez le serveur que vous voulez
         };
         
         hastebin(`Voici les logs du salon ${message.channel.name} - ${message.channel.id} sur le serveur ${message.guild.name}\nCes logs ont été demandés par ${message.author.username}\n\u200b\n`+results, options).then((url) => {
           msgd.edit(`**✅ J'ai terminé de récupérer les messages contenu dans ce salon, voici le lien** :\n${url}`)
         });try{
            message.delete()
        } catch {
            return
        }
       
        
        
        
        const msgd = await message.channel.send({
            content: ':warning: Récupération des messages, cela peut prendre un certain temps...',
        })
       
        const fetchAll = require('discord-fetch-all');
        
        
        const allMessages = await fetchAll.messages(message.channel, {
            reverseArray: true, 
            userOnly: true, 
            botOnly: false, 
            pinnedOnly: false, 
        });
        
        
        var results = allMessages.map(msg => `${moment(msg.createdTimestamp).format("DD/MM/YYYY - hh:mm:ss a").replace("pm", "PM").replace("am", "AM")}] - ${msg.author.username} - (${msg.author.id}) : ${msg.content}`).join('\n')
        
        
        const hastebin = require("hastebin-gen");
        
        
        hastebin(`Voici les logs du salon ${message.channel.name} - ${message.channel.id} sur le serveur ${message.guild.name}\nCes logs ont été demandés par ${message.author.username}\n\u200b\n` + results, {
            extension: "diff",
            url: 'https://haste.chaun14.fr/'
        }).then(haste => {
            fs.writeFile(`./${message.channel.id}_${message.author.id}`, results, () =>
            setTimeout(function(){
                fs.unlink(`./${message.channel.id}_${message.author.id}`,(err) => {
                    if (err) throw err;
                    console.log('Fichier supprimé !');
                 });
            }, 1000))
                msgd.edit({
                content: `Voici les logs du salon que vous pouvez télécharger ou le haste : ${haste} `,
                files: [{
                    attachment: `./${message.channel.id}_${message.author.id}`,
                    name: `log${message.channel.id}.txt`
                }],

            })
             // 1000ms = 1sec
        
        }).catch(error => {
             
            console.error(error);
           
        
        });

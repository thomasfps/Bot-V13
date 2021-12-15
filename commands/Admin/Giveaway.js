const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    
        const filter = (m) => m.author.id === message.author.id;
        const embed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setDescription("Veuillez mentionner ci dessous, le salon du giveaway")
            const clientMessage = await message.channel.send({ embeds: [embed] });
            message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
            .then(async (collected) => {
                collected.first().delete();
                const channel = collected.first().mentions.channels.first();
                if(!channel) {
                    embed.setDescription("Vous deviez mentionner le salon du giveaway..");
                    return clientMessage.edit({ embeds: [embed] });
                }
                await embed.setDescription(`A présent que le salon est défini sur ${channel}, veuillez préciser la durée du giveaway`);
                await clientMessage.edit({ embeds: [embed] });
                await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                .then(async (collected) => {
                    collected.first().delete();
                    const duration = collected.first().content;
                    if((!duration.endsWith("s") && !duration.endsWith("m") && !duration.endsWith("h") && !duration.endsWith("d")) || isNaN(parseInt(duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1)))) {
                        embed.setDescription("Vous deviez indiquer la durée du giveaway..");
                        return clientMessage.edit({ embeds: [embed] });
                    }
                    await embed.setDescription(`Maintenant que le salon est défini sur ${channel}, et la durée sur **${duration}**, veuillez préciser le nombre de gagnants`);
                    await clientMessage.edit({ embeds: [embed] });
                    await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                    .then(async (collected) => {
                        collected.first().delete();
                        const winners = parseInt(collected.first().content);
                        
                        if(!winners || isNaN(winners)) {
                            embed.setDescription("Vous deviez indiquer le nombre de gagnants..");
                            return clientMessage.edit({ embeds: [embed] });
                        }
                        await embed.setDescription(`Maintenant que le salon est défini sur ${channel}, et la durée sur **${duration}**, le nombre de gagnants sur **${winners}**, veuillez préciser le prix du giveaway`);
                        await clientMessage.edit({ embeds: [embed] });
                        await message.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] })
                        .then(async (collected) => {
                            collected.first().delete();
                            const prize = collected.first().content;
                            const date = new Date(Date.now()+duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1)*1000);
                            await embed.setDescription(`Le giveaway va démarrer d'ici quelques instants dans ${channel}, et se finiras le **${date.toLocaleDateString()}** à **${date.getHours()}**h**${date.getMinutes()}**`);
                            await clientMessage.edit({ embeds: [embed] });
                            const getTimeRemaining = (time) => {
                                if(time < 60) {
                                    return `**${time}** secondes`;
                                } else if(time >= 60 && time < 3600) {
                                    const minutes = Math.floor(time / 60);
                                    timeNotCalc = time - 60 * minutes;
                                    const seconds = Math.floor(timeNotCalc);
                                    return `**${minutes}** minutes et **${seconds}** secondes`;
                                } else if(time >= 3600 && time < 86400) {
                                    const hours = Math.floor(time / 3600);
                                    timeNotCalc = time - 3600 * hours;
                                    const minutes = Math.floor(timeNotCalc / 60);
                                    timeNotCalc = timeNotCalc - 60 * minutes;
                                    const seconds = Math.floor(timeNotCalc);
                                    return `**${hours}**h, **${minutes}**, **${seconds}**s`;
                                } else if(time >= 86400) {
                                    const days = Math.floor(time / 86400);
                                    timeNotCalc = time - 86400 * days;
                                    const hours = Math.floor(timeNotCalc / 3600);
                                    timeNotCalc = timeNotCalc - 3600 * hours;
                                    const minutes = Math.floor(timeNotCalc / 60);
                                    timeNotCalc = timeNotCalc - 60 * minutes;
                                    const seconds = Math.floor(timeNotCalc);
                                    return `**${days}**j, **${hours}**h, **${minutes}**, **${seconds}**s`;
    
                                }
                            }
                            var time;
                            if(duration.endsWith("s")) {
                                time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 1;
                            } else if(duration.endsWith("m")) {
                                time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 60;
                            } else if(duration.endsWith("h")) {
                                time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 3600;
                            } else if(duration.endsWith("d")) {
                                time = duration.substring(Math.floor(duration.length / duration.length - 1), duration.length - 1) * 86400;
                            }
                            const giveawayEmbed = new MessageEmbed()
                            .setColor("DARK_BUT_NOT_BLACK")
                            .setDescription(`Prix: **${prize}**\nAuteur: ${message.member}\nTemps restant ${getTimeRemaining(time)}\nGagnants: **${winners}**`)
                            const giveaway = await channel.send({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY** 🎉" });
                            giveaway.react("🎉")
                            const interval = setInterval(async function(){
                                if((time - 13) > 0) {
                                    time = time - 13;
                                    giveawayEmbed.setDescription(`Prix: **${prize}**\nAuteur: ${message.member}\nTemps restant ${getTimeRemaining(time)}\nGagnants: **${winners}**`);
                                    giveaway.edit({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY** 🎉" });
                                } else {
                                    clearInterval(interval);
                                    const reaction = await giveaway.reactions.cache.get("🎉").fetch()
                                    const users = await reaction.users.fetch()
                                    const winnerList = [];
                                    const participants = [];
                                    users.forEach(( user ) => {
                                        if(!user.bot) participants.push(user)
                                    });
                                    console.log(giveaway)
                                    if(participants.length < winners) {
                                        giveawayEmbed.setDescription(`Prix: **${prize}**\nGiveaway annulé, pas assez de participants..`);
                                        giveaway.edit({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY FINI** 🎉"});
                                    } else {
                                        
                                        for(let i = 0; i < winners; i++) {
                                            const random = Math.floor(Math.random() * participants.length);
                                            const winner = participants[random];
                                            const winIndex = participants.indexOf(winner);
                                            participants.splice(winIndex, 1);
                                            winnerList.push(winner);
                                        }
                                        giveawayEmbed.setDescription(`Prix: **${prize}**\nGagnant(s): ${winnerList.join(", ")}`);
                                        giveaway.edit({ embeds: [giveawayEmbed], content: "🎉 **GIVEAWAY FINI** 🎉"});
                                        giveaway.channel.send({ content: `Bien joué au(x) gagnant(s) de **${prize}** : ${winnerList.join(", ")}`});
                                    }
                                    
                                    
                                }
                            }, 13000)
                        })
                        .catch(console.error)
                    })
                    .catch(console.error)
                })
                .catch(console.error)
            })
            .catch(console.error)
    
}
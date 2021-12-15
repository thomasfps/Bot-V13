const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Pour avoir des informations sur le serveur",
    async execute(interaction, client) {
        const { guild } = interaction;

        const boosts = guild.premiumSubscriptionCounts;
        if (boosts > 1) { s = `boosts` } else { s = `boost` }

        const members = guild.members.cache;
        const online = members.filter(m => m.presence?.status === 'online').size;
        const offline = members.filter(m => m.presence?.status === 'offline').size + members.filter(m => m.presence?.status === undefined).size;

        const embed = new Discord.MessageEmbed()
            .setTitle(`Informations de ${guild.name}`)
            .addField("Créateur du serveur :", `<@${guild.ownerId}>`, true)
            .addField("Membres :", `${guild.memberCount}`, true)
            .addField("Membres en ligne :", `${online}`, true)
            .addField("Membres hors-ligne :", `${offline}`, true)
            .addField("Nombre de bot :", `${guild.members.cache.filter(m => m.user.bot).size}`, true)
            .addField("Date de création du serveur :", `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, true)
            .addField("Nombre de rôle :", `${guild.roles.cache.size}`, true)
            .addField(`Nombre de ${s} :`, `${boosts ?? "0"}`, true)
            .addField("Nombre d'émoji :", `${guild.emojis.cache.size}`, true)
            .setColor(client.gris)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
            .setTimestamp();

        interaction.reply({ embeds: [embed] })
    }
}
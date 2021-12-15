const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Pour voir les informations d'un utilisateur",
    options: [
        {
            name: "utilisateur",
            description: "L'utilisateur",
            type: "USER",
            required: false
        }
    ],
    async execute(interaction, client) {
        const user = interaction.options.getMember("utilisateur") || interaction.member;

        const userFlags = user.user.flags.toArray();
        let s;
        if (userFlags.size > 1) { s = "Badges" } else { s = "Badge" };

        // Emojis des badges
        const flags = {
            DISCORD_EMPLOYEE: '<:badgediscordemployee:877751383590314004>',
            PARTNERED_SERVER_OWNER: '<:badgepartner:877751383644839976>',
            BUGHUNTER_LEVEL_1: '<:badgebughunter1:877751383238004768>',
            BUGHUNTER_LEVEL_2: '<:badgebughunter2:877751383137325137>',
            HYPESQUAD_EVENTS: '<:badgehypesquadevent:877751383598719016>',
            HOUSE_BRAVERY: '<:badgehypesquadbravery:877751383565164545>',
            HOUSE_BRILLIANCE: '<:badgehypesquadbrilliance:877751383628087306>',
            HOUSE_BALANCE: '<:badgehypesquadbalance:877751383581921290>',
            EARLY_SUPPORTER: '<:badgeearlysupporter:877751383577735208>',
            TEAM_USER: 'Équipe Discord',
            SYSTEM: 'Système',
            VERIFIED_BOT: 'Bot Certifié',
            EARLY_VERIFIED_BOT_DEVELOPER: '<:badgedeveloper:877751383665827840>'
        };

        const embed = new Discord.MessageEmbed()
            .setTitle(`Informations de ${user.user.username}`)
            .setColor("#2f3136")
            .setThumbnail(`${user.user.displayAvatarURL({ dynamic: true })}`)
            .addField("Nom :", `${user}`, true)
            .addField("ID :", `${user.user.id}`, true)
            .addField(`${s}`, `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'Aucun'}`, true)
            .addField("Avatar :", `[Clique ici](${user.user.displayAvatarURL({ dynamic: true })})`, true)
            .addField("Création de compte :", `<t:${parseInt(user.user.createdTimestamp / 1000)}:R>`, true)
            .addField("À rejoint le serveur :", `<t:${parseInt(user.joinedTimestamp / 1000)}:R>`, true)
            .addField("Rôle(s) :", `${user.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "Aucun"} (${user.roles.cache.size - 1})`, true)
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
}
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "minecraft",
    description: "Pour afficher un profil Minecraft",
    options: [
        {
            name: "utilisateur",
            description: "Le nom de l'utilisateur",
            type: "STRING",
            required: true
        }
    ],
    async execute(interaction, client) {
        const embed = new Discord.MessageEmbed().setColor(client.gris);
        const username = interaction.options.getString("utilisateur");
        axios.get(`https://some-random-api.ml/mc/?username=${username}`).then(Response => {
            const { data } = Response;
            const array = data.name_history.map((a => `${a.name} (${a.changedToAt})`)).join(", ").replace("Original Name", "nom original");
            embed.addField(`${array.includes(", ") ? "Noms :" : "Nom :"}`, `${array}`)
                .addField("UUID :", `${data.uuid}`)
            interaction.reply({ embeds: [embed] })
        }).catch(() => interaction.reply({ content: `Veuillez donner un nom d'utilisateur valide !`, ephemeral: true }))
    }
}
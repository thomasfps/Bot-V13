const discord = module.require("discord.js");

module.exports = {
  name: "ban",
  category: "Mod",
  description: "Bannissez n'importe qui d'un coup sans connaître personne xD",
  usage: "ban <@user> <reason>",
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["EMBED_LINKS", "BAN_MEMBERS"],
  run: async (client, message, args) => {
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Non spécifié";

    const target = message.mentions.members.first() || message.guild.users.cache.get(args[0]);

    if (!target) {
      return message.channel.send(
        `**${message.author.username}**, Veuillez mentionner la personne que vous souhaitez bannir.`
      );
    }

    if (target.id === message.author.id) {
      return message.channel.send(
        `**${message.author.username}**, Vous ne pouvez pas vous ban.`
      );
    }
    if (target.id === message.guild.ownerId) {
      return message.channel.send("Tu ne peux pas ban le propriétaire du serveur.");
    }

    let embed = new discord.MessageEmbed()
      .setTitle("Action : Ban")
      .setDescription(`Banned ${target} (${target.id})\nReason: ${reason}`)
      .setColor("#ff2050")
      .setThumbnail(target.avatarURL)
      .setFooter(`Banned by ${message.author.tag}`);

    await message.guild.bans.create(target, {
      reason: reason
    }).then(() => {
        message.channel.send({ embeds: [embed] });
      });
  },
};
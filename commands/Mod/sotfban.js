const Discord = module.require("discord.js");

module.exports = {
  name: "softban",
  description: "Soft Ban a User",
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["EMBED_LINKS", "BAN_MEMBERS", "MANAGE_MESSAGES"],
  run: async (client, message, args) => {
    message.delete();

    let banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember)
      return message.channel.send("Veuillez fournir un utilisateur à bannir !");
    if (banMember.id === message.guild.owner.id)
      return message.channel.send("Vous ne pouvez pas SoftBan le propriétaire du serveur");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Pas de raison donné.";

    banMember
      .send({
        embed: {
          color: "#ff0019",
          description: `Bonjour, vous avez été banni de ${message.guild.name} pour violation des règles du serveur.`,
        },
      })
      .then(() =>
        message.guild
          .member(banMember)
          .ban(banMember, { days: 1, reason: reason })
      )
      .then(() =>
        message.guild.members
          .unban(banMember.id)
          .catch((err) => console.log(err))
      );

    let embed = new Discord.MessageEmbed()
      .setThumbnail(banMember.user.displayAvatarURL())
      .setColor("RANDOM")
      .addField("Moderation:", "SOFT BAN")
      .addField("Banned:", banMember.user.username)
      .addField("Moderator:", message.author.username)
      .addField("Reason:", reason)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
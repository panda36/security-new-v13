const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
    name: "ban",
    aliases: ["band"],
    description: "You can ban a member, or multiple members using this command",
    usage: ["s!ban [@User]"],
    category: ["Moderation"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (client, message, args, dev) => {
  
     let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
/*
    let perms = message.member.hasPermission("BAN_MEMBERS");
    if (!perms) return message.channel.send({content:`You don't have **BAN_MEMBERS** permission`});

    if (!message.guild.me.permissions.has('BAN_MEMBERS'))
      return message.channel.send({content:`"I need **BAN_MEMBERS** permission!`});
*/
    if (!user)
      return message.channel.send({content:`Usage: s!ban [@User]`}).catch(console.error);

    if (user.id === client.user.id) {
      return message.channel.send({content:`You can't kick yourself`});
    }

    if (user.id === client.user.id) return message.channel.send({content:`I can't ban myself`});

    if (message.guild.ownerID !== message.author.id && user.roles.highest.comparePositionTo(message.member.roles.highest) >= 0)
      return message.channel.send({content:`Based on the role hierarchy, you cannot ban this user`});

    if (!message.guild.member(user).bannable) return message.channel.send({content:`I cannot ban the mentioned user`});

  
    const embedBan = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(`<:punish:836022893691011092> **${user}** has been banned`)

    message.channel.send({embeds:[embedBan]});
    user.ban({ reason: args[1] });
  }
}

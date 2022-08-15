const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
  name: "kick",
  aliases: ["kicked"],
  description: "You can kick a member, or multiple members using this command",
  usage: ["s!kick [@User]"],
  category: ["Moderation"],
  enabled: true,			  
  memberPermissions: [ "KICK_MEMBERS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","KICK_MEMBERS" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (client, message, args, dev) => {

    let user = message.mentions.members.first();
/*
    var perms = message.member.hasPermission("KICK_MEMBERS");

    if (!perms) {
      return message.channel.send(new Discord.MessageEmbed().setColor(Color).setDescription(`You don't have **KICK_MEMBERS** permission`));
    }

    if (!message.guild.me.permissions.has("KICK_MEMBERS"))
      return message.channel.send({content:`I need the **KICK_MEMBERS** permission`});
*)*/
    if (!user)
      return message.channel.send({content:`Usage: s!kick [@User]`}).catch(console.error);

    if (user.id === client.user.id) {
      return message.channel.send({content:`can't kick myself`});
    }

    if (user.id === message.author.id) {
      return message.channel.send({content:`You can't kick yourself`});
    }

    if (message.mentions.users.size < 1) return message.channel.send({content:`Mention 1 single user`}).catch(console.error);


    if (!message.guild.member(user).kickable) return message.channel.send({content:`I can't kick the mentioned user`});


    const embedKick = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(` **${user}** has been banned`)

    message.channel.send({embeds:[embedKick]});
    user.kick();
    }
}

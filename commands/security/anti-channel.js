const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "antichannel",
  aliases: ["anti-channel"],
  description: "Prevent others from crating or deleting channels",
  usage: ["s!antichannel [number/on/off]"],
  category: ["Security"],
  enabled: true,
  memberPermissions: ["MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {
   let guild = await Guild.findOne({ guildID: message.guild.id });
     let num = args[1];
    if (args[1] === "on") {
      guild.channel.onoff = "on";
      guild.save();
      const embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`antichannel status has been update to **on**`);
      return message.channel.send({embeds:[embed]});
     } else if (args[1] === "off") {
         guild.channel.onoff = "off";
         guild.save();
      const embed1 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(` antichannel status has been update to **off**`);
      return message.channel.send({embeds:[embed1]});
    }
    if (isNaN(num) || parseInt(num) < 1) {
      const embed2 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`error syntax \n ${guild.prefix}antichannel [on,off,<number>]`
        );
      return message.channel.send({embeds:[embed2]});
    }
    guild.channel.lmite = num;
    guild.save();
    const embed3 = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(`Successfully antichannel changed to ${guild.channel.lmite} <:punish:836022893691011092>
`);
    return message.channel.send({embeds:[embed3]});
  }
};

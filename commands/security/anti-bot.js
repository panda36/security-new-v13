const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "antibot",
  aliases: ["anti-bot"],
  description: "Prevent others from adding bots to your server",
  usage: ["s!antibot [on/off]"],
  category: ["Security"],
  enabled: true,			
  memberPermissions: [ "MANAGE_GUILD" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {
   let guild = await Guild.findOne({ guildID: message.guild.id });
     let num = args[1];
    if (args[1] === "on") {
      guild.bot.onoff = "on";
      guild.save();
        const embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(` antibot status has been update to **on**`);
     return message.channel.send({embeds:[embed]});
     } else if (args[1] === "off") {
         guild.bot.onoff = "off";
         guild.save();
        const embed1 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(` antibotstatus has been update to **off**`);
     return message.channel.send({embeds:[embed1]});
    }
    const embed2 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`error syntax \n ${guild.prefix}antibot [on,off]`
        );
      return message.channel.send({embeds:[embed2]});
  }
};

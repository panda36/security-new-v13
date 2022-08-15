const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "antikick",
  aliases: ["anti-kick"],
  description: "Prevent others from mass kicking your members",
  usage: ["s!antikick [number/on/off]"],
  category: ["Security"],
  enabled: true,			
  memberPermissions: [ "ADMINISTRATOR" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {
  
    let guild = await Guild.findOne({ guildID: message.guild.id });
     let num = args[1];
    if (args[1] === "on") {
      guild.kick.onoff = "on";
      guild.save();
       const embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(` antikick status has been update to **on**`);
      return message.channel.send({embeds:[embed]});
     } else if (args[1] === "off") {
         guild.kick.onoff = "off";
         guild.save();
       const embed1 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(` antikick status has been update to **off**`);
      return message.channel.send({embeds:[embed1]});
    }
    if (isNaN(num) || parseInt(num) < 1){
      const embed2 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`error syntax \n ${guild.prefix}antikick [on,off,<number>]`
        );
      return message.channel.send({embeds:[embed2]});
    }
    guild.kick.lmite = num;
    guild.save()
    const embed3 = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(`Successfully antikick changed to ${guild.kick.lmite} <:punish:836022893691011092>
`);
    return message.channel.send({embeds:[embed3]});
  }
};

const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
  name: "unlockall",
  aliases: ["openall","unlockall"],
  description: "Unlocks all text channels from your server, not recommended",
  usage: ["s!unlockall"],
  category: ["Moderation"],
  enabled: true,              
  memberPermissions: [ "MANAGE_CHANNELS" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],        
  ownerOnly: false,            
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
  
   
      const embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(bot.reva.get(data.lang, "admin","unlockall_message"));
      message.channel.send({embeds:[embed]});

    message.guild.channels.cache.filter(c => c.name).forEach(async channel => {
    channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true
      })
       });
    }
 }

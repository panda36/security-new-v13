const Discord = require('discord.js')
const { Color } = require("../../config.js");

module.exports = {
  name: "lock",
  aliases: ["close","lock"],
  description: "Locks the current or selected text channels",
  usage: ["s!lock"],
  category: ["Moderation"],
  enabled: true,			  
  memberPermissions: [ "MANAGE_CHANNELS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
  
  message.channel
      .permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.channel.send({content: bot.reva.get(data.lang, "admin","lock_message", { 
          channel: `<#${message.channel.id}>`
      })});
     });
   }
}

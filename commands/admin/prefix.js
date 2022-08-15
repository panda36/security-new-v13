const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  description: "Change the prefix of the bot",
  usage: ["s!prefix [Prefix]"],
  category: ["Moderation"],
  enabled: true,            
  memberPermissions: [ "ADMINISTRATOR" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 10000,
  run: async (bot, message, args, dev, data) => {
        if(!args[1]) return message.channel.send({content:bot.reva.get(data.lang, "admin","prefix_type")});
        if(args[1].length > 5) return message.channel.send({content:bot.reva.get(data.lang, "admin","prefix_length")});
         
        let dataa = await Guild.findOne({ guildID: message.guild.id })

        let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(bot.reva.get(data.lang, "admin", "prefix_embed") + args[1])
        message.channel.send({embeds:[embed]})
        dataa.prefix = args[1];
        dataa.save();
    }};

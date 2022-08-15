const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "whitelist",
  aliases: ["wl","whitelist"],
  description: "Security will ignore trusted users",
  usage: ["s!whitelist [add/remove] [@User]"],
  category: ["Security"],
  enabled: true,
  memberPermissions: [ "ADMINISTRATOR" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  guilOwnerOnly: true,
  cooldown: 4000,
  run: async (bot, message, args, dev, data) => {
     
           let dataa = await Guild.findOne({ guildID: message.guild.id })
      if (args[1] === "add") {
        let user =
          message.guild.members.cache.get(args[2]) ||
          message.mentions.members.first();
        if (!user)
          return message.channel.send({content:(bot.reva.get(data.lang, "security","user_undefined"))});
        if(!dataa.whitelist.find((c) => c.type === user.id)){
        await Guild.findOneAndUpdate(
        {
          guildID: message.guild.id,
        },
        {
          $push: {
            whitelist: {
              type: user.id
            }
         },
        })     
        message.channel.send({content: user.user.username + bot.reva.get(data.lang, "security","whitelist-add")})
          } else {
          message.channel.send({content:(bot.reva.get(data.lang, "security","whitelist-yes"))})
          }
      } else if (args[1] === "remove") {
        let user =
          message.guild.members.cache.get(args[2]) ||
          message.mentions.members.first();
        if (!user)
          return message.channel.send({content: (bot.reva.get(data.lang, "security","user_undefined"))});
        if(dataa.whitelist.find((c) => c.type === user.id)){
        await Guild.findOneAndUpdate(
        {
          guildID: message.guild.id,
        },
        {
          $pull: {
            whitelist: {
              type: user.id
            }
         },
        })
        message.channel.send({content:(user.user.username + bot.reva.get(data.lang, "security","whitelist-remove"))});
        } else {
        message.channel.send({content: (user.user.username + bot.reva.get(data.lang, "security","whitelist-no"))});
        };
      } else if (!args[1]) {
        if (dataa.whitelist.length === 0) return message.channel.send({content:(bot.reva.get(data.lang, "security","whitelist-zero"))});
       let arrayOfCustomCommands = dataa.whitelist.map(w => `⇰ <@${w.type}> - ${w.type}`)
        
        let embed = new Discord.MessageEmbed()
      .setTitle(bot.reva.get(data.lang, "security","whitelist-user"))
      .setColor(Color)
      .setDescription(arrayOfCustomCommands.slice(0, 15).join('\n'));
      message.channel.send({embeds:[embed]});
      }
  }
};

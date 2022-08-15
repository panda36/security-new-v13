const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "language",
  aliases: ["language"], 
  description: "To change language", 
  usage: ["s!lang <language>"],
  category: ["Moderation"],
  enabled: true,
  memberPermissions: [ "MANAGE_GUILD" ],	
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  ownerOnly: false,
  cooldown: 15000,
  run: async (client, message, args, dev) => {
      if (!args[1])
        return message.channel.send(new Discord.MessageEmbed().setColor(Color).setDescription(`Usage : s!language [english,kurdish,arabic,turkish,persian]`));
      let data = await Lang.findOne({ guildID: message.guild.id })
      if (args[1].toLowerCase() === "english" || args[1].toLowerCase() === "kurdish" || args[1].toLowerCase() === "arabic" || args[1].toLowerCase() === "turkish" || args[1].toLowerCase() === "persian") {
        data.language = args[1].toLowerCase();
        message.channel.send({content:
          `Your server language is **${data.language}**`});
      data.save();
      } else if (args[1] === "list") {
        message.channel.send(new Discord.MessageEmbed().setColor(Color).setDescription(`Language list is :\n **english** ,**kurdish** ,**arabic** ,**turkish** ,**persian**`));
      } else {
        message.channel.send({content:
        `  Please Type\n \`s!lang english\` \n \`s!lang kurdish\` \n \`s!lang arabic\` \n \`s!lang turkish\` \n \`s!lang persian\``
                             }) ;
     }
  }
}

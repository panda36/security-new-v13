const Discord = require("discord.js")
module.exports = {
  name: "help",
  aliases: ["h"],
  enabled: true,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 3000,
  run: async (bot, message, args, dev) => {

let embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor("Sun Devlopers")
      .setTitle("Help Menu")
      .setDescription(`You can get more help by typing:

[ Website not Available now](https://) - [ Invite ](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=42289062318&scope=bot) - [ Support ](https://discord.gg/aW6TnhGeSS)`)
      .addField("General","`help`, `about`,  `invite`, `ping`, `bots`")  
      .addField("Security","`anti`, `settings`, `punishment`, `whitelist`")
     .addField("Moderation","`ban`, `kick`, `unban`, `mute`, `unmute`")
 message.channel.send({embeds:[embed]});
  }
}

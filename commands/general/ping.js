const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ['pong'],
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 3000,
  run: async (bot, message, args, dev) => {

    
   let date = Date.now();
        let ping_db = await new Promise((r, j) => {
            require('mongoose').connection.db.admin().ping((err, result) => (err || !result) ? j(err || result) : r(Date.now() - date))
        });

        date = Date.now();

        let pong = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setAuthor("The Av Development", "https://media.discordapp.net/attachments/829446297115033610/831559964165406771/image0.gif")
            .setDescription('Pong?')

        return message.channel.send({ embeds:[pong] })
            .then(msg => {

                let embed = new Discord.MessageEmbed()
                    .setDescription(`🏓 Bot: ${bot.ws.ping}ms \n📡 Discord API: ${Date.now() - date}ms \n🗃️ DB: ${ping_db}ms`)
                   .setAuthor("The Av Development", "https://media.discordapp.net/attachments/829446297115033610/831559964165406771/image0.gif")
                    .setColor("BLUE")

                return msg.edit({ embeds: [embed] })

            })
    }
}
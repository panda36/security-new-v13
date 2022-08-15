const Discord = require("discord.js")
module.exports = class {
 async run(guild,message, bot, prime) {






 		const thanksEmbed = new Discord.MessageEmbed()			
                        .setAuthor("added me to your server!")
 			.setDescription(`give me administrator permission to
Status: ONLINE
Guilds: ${bot.guilds.cache.size}
Users: ${bot.users.cache.size}
Ping: ${Math.round(bot.ws.ping)}ms
Version: ${Discord.version}


.`)
 			.setColor("#2c2f33")
 			.setTimestamp();
 		guild.owner.send({embeds:[thanksEmbed]}).catch(() => {});


 		const text = "✅ **__Joined New Guild__** \n **Guild Name** = "+guild.name+" \n **Guild Owner Name** = " + `${guild.owner.user.username}` + " \n **Guild Owner ID** = " + `${guild.owner.id}` + "\n **Guild Member Size** = "+guild.memberCount+" \n **Guild Bots Size** ("+guild.members.cache.filter((m) => m.user.bot).size+" bots)";
 		const logsEmbed = new Discord.MessageEmbed()
 			.setColor("#2c2f33")
 			.setDescription(`
Status: ONLINE
Guilds: ${bot.guilds.cache.size}
Users: ${bot.users.cache.size}
Ping: ${Math.round(bot.ws.ping)}ms
Version: ${Discord.version}`

);
       
 		bot.channels.cache.get("797470185476718592").send({embeds:[logsEmbed]});     
 }};

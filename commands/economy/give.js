const fs = require("fs");
const Discord = require("discord.js");
module.exports = {
  name: "give",
  aliases: ["give","send"],
  description: "To send credit",
  usage: ["credits @user @amount"], 
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 15,
  run: async (bot, message, args, dev,dev2) => {
  if (!args[2]) return;
    let member = message.mentions.users.first()
    if(!member) return message.channel.send({content:`Mention someone!`})
    if(!args[2]) return message.channel.send({content:`Type credit!`})
    if(args[2] < 1) return message.channel.send({content:`You can't send 0 credit!`})

    let author = await User.findOne({ userID: message.author.id });
    let loc = await User.findOne({ userID: member.id });
   
            
    if(author.money < args[2]) return message.channel.send({content:`You don't have this amount credit!`})
    if(author.userID == member.id) return message.channel.send({content:`You can't send credit to yourself!`})
   if(member.bot) return message.channel.send({content:`You can send credit to the client`})
    
    author.money -= Math.floor(parseInt(args[2]));
    loc.money += Math.floor(parseInt(args[2]));
    author.save();
    loc.save()
  member.send({content: `🏧 | Transfer Receipt \`You have received $${args[2]} From user ${message.author.username} (ID: ${message.author.id})\``})
    message.channel.send({content:`**${message.author.username}** send credit to **${member.username}** amount: \`$${args[2]}💰\``})
    }};

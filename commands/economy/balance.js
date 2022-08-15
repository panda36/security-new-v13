const fs = require("fs");
const Discord = require("discord.js");
module.exports = {
  name: "balance",
  aliases: ["balance", "credit", "credits"],
  description: "To now your credits",
  usage: ["credit", "credit @user"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 10,
  run: async (client, message, args, dev, dev2) => {
    if (args[2]) return;
    let member = message.mentions.users.first();
    if (member) {
      let autho = await User.findOne({ userID: member.id });
      message.channel.send({
        content:
          "🏦 **" + member.username + "**, credits balance is `$" + autho.money + "`💰"
      });
    }
    if (!member) {
      let author = await User.findOne({ userID: message.author.id });
      message.reply({
        content: "🏦 " + message.author.username + ",Your credits balance is: `$" + author.money + "` 💰"
      });
    }
  }
};

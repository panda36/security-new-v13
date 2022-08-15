const Discord = require("discord.js");
const owners = "768944616724103170";
/**/


const bits = new Discord.Permissions(268550160n);
new Discord.Permissions(bits);
const usersMap = new Map();
const LIMIT = 5;
const TIME = 6000;
const DIFF = 7000;
module.exports = class {
  async run(message, bot) {
    const lord =message.guild;
    const data = {};
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let guild = await Guild.findOne({ guildID: message.guild.id });
    if (!guild) {
      Guild.create({ guildID: message.guild.id });
    }
    data.guild = guild;
    let user = await User.findOne({
      
      userID: message.author.id
    });
    if (!user) {
      User.create({  userID: message.author.id });
    }
    data.user = user;
    let lang = await Lang.findOne({ guildID: message.guild.id });
    if (!lang) {
      Lang.create({ guildID: message.guild.id });
    }
    data.lang = lang.language
    let prime = await Prime.findOne({ guildID: message.guild.id });
    if (prime && prime.log === "enable")
      return ;//message.channel.send(`you don't have Premium version`);
  //et black = await Black.findOne({ Guild: message.guild.id });
    
   let h= await Owner.findOne({ ownerCode: "768944616724103170" });
    if (!h) {
      Owner.create({ ownerCode: "768944616724103170",worldWhitelist:"768944616724103170"})
   }
    ///if(message.guild.members.cache.has("838593240328044554")) return
    if (guild) {
      if (guild.spam.onoff === "off") return;
      let m = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (m.worldWhitelist.find(c => c.type === message.author.id)) return;
      // if (message.author.id === message.guild.ownerID) return console.log("owner");
      if (guild.whitelist.find(c => c.type === message.author.id))
        return console.log("whitelist");
      let pun = guild.punishment;
      if (message.author.bot) return;
      if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference =
          message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        if (difference > DIFF) {
          clearTimeout(timer);
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
          }, TIME);
          usersMap.set(message.author.id, userData);
        } else {
          ++msgCount;
          if (parseInt(msgCount) >= LIMIT) {
            if (pun === "ban") {
              if (!message.member.bannable)
                return console.log(
                  message.member.usetname + " I can't ban this man"
                );
              message.channel.guild.members.cache.get(message.author.id).ban();
              message.channel.bulkDelete(msgCount, true);
            } else if (pun === "kick") {
              if (!message.member.kickable)
                return console.log(
                  message.member.usetname + " I can't kick this man"
                );
              message.channel.guild.members.cache
                .get(message.author.id)
                .kick()
                .then(k => {
                  // logChannel.send(`**⇏${message.author.tag} is kicked becouse doing spamm in <#${message.channel.id}>**`)
                  message.channel.guild.owner.send({content:
                    `**⇏${message.author.tag} is kicked becouse doing spamm in channel**`
                                                   });
                });
              message.channel.bulkDelete(msgCount, true);
            } else {
              message.channel.guild.members.cache
                .get(message.author.id)
                .kick()
                .then(k => {
                  message.channel.guild.owner.send({content:
                    `**⇏${message.author.tag} is kicked becouse doing spamm in channel**`
                                                   });
                });
              message.channel.bulkDelete(msgCount, true);
            }
          } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
          }
        }
      } else {
        let fn = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage: message,
          timer: fn
        });
      }

      if (!message.content.toLowerCase().startsWith(guild.prefix.toLowerCase()))
        return;
      let args = message.content.split(" ");
      const argsr = message.content
        .slice(guild.prefix.length)
        .trim()
        .split(/ +/g);
      const cmd = argsr.shift().toLowerCase();
      if (cmd.length === 0) return;
      let command = bot.commands.get(cmd);
      if (!command) command = bot.commands.get(bot.aliases.get(cmd));
/*
      if (command.prime) {
        let data = await Prime.findOne({ Guild: message.guild.id });

        if (!data)
          return message.channel.send({content:`this server not haven't on data base`});

        if (!data.Permanent && Date.now() > data.time) {
          data.delete();

          return message.channel.send({content:
            `prime bot on your server ended for buy mor join support server `
                                      });
        }
      }*/
      ////////
      if (!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES"))
        return;
      if (!command.enabled)
        return await message.channel.send({content:`This command is **Disable** for now`}
        );
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (!Ww) {
        Owner.create({ ownerCode: "76894461724103170" });
      }
      data.ww = Ww;
      if (
        command.ownerOnly &&
        !Ww.worldWhitelist.find(c => c.type === message.author.id)
      )
        return await message.channel.send({content:`This command is only for owner the bot`})
    
      
if (command.guilOwnerOnly) {
      if (message.author.id !== message.guild.ownerId &&
       !Ww.worldWhitelist.find((c) => c.type === message.author.id)
      ) return message.channel.send({content:`This command is only for guildOwner`});
	
  }

    
      
        if (!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return;
  if (!command.enabled) return await message.channel.send({content: `This command temporary **Disabled For Now**`})
  let neededPermissions = [];
	  if(!command.botPermissions.includes("EMBED_LINKS")){
		  command.botPermissions.push("EMBED_LINKS");
	  }
	  command.botPermissions.forEach((perm) => {
		  if(!message.channel.permissionsFor(bot.user).has(perm)){
			  neededPermissions.push(perm);
		  }
	  });
	 if(neededPermissions.length > 0){
		  return message.channel.send({content:`I don't have a ${neededPermissions.map((p) => `\`${p}\``).join(", ")} permissions`});
	  }
	  neededPermissions = [];
	  command.memberPermissions.forEach((perm) => {
		  if(!message.channel.permissionsFor(message.member).has(perm)){
			  neededPermissions.push(perm);
		  }
	  });
	  if(neededPermissions.length > 0){
		  return message.channel.send({content:`You don't have a ${neededPermissions.map((p) => `\`${p}\``).join(", ")} permissions`});
	 } 

   

if (command.botPermissions) {
    let perms = new Discord.MessageEmbed().setDescription(
      `i don't Have ${command.botPermissions} To Run Command..`
    );
    if (!message.guild.me.permissions.has(command.botPermissions || []))
      return message.channel.send({ embeds: [perms] });

}

      if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = bot.cooldowns.get(command.name);
      const cooldownAmount = /*command.cooldown ||*/ 2 * 1000;
      if (timestamps.has(message.author.id)) {
        const expirationTime =
          timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.channel
            .send({content:`Please wait ${timeLeft.toFixed(1)} second`})
            .then(msg => msg.delete({ timeout: timeLeft.toFixed(1) * 1000 }));
        }
      }
      timestamps.set(message.author.id, now);
      let prefix = guild.prefix;
      if (command) command.run(bot, message, args, prefix, data, cmd, prime);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
  }
};

const Discord = require("discord.js")
module.exports = class {
  async run(channel) {
    const { guild } = channel
    try {
      const entry1 = await guild.fetchAuditLogs({ type: "CHANNEL_DELETE" })
        .then(audit => audit.entries.first());
      const user2 = entry1.executor;
      const guildData = await Guild.findOne({ guildID: guild.id });
      if (!guildData) { Guild.create({ guildID: guild.id }); }
      const memberData = await User.findOne({ guildID: guild.id, userID: user2.id });
      if (!memberData) { User.create({ guildID: guild.id, userID: user2.id }); }
      if (guildData.channel.onoff === "off") return;
      if (user2.id === guild.ownerID) return;
      if (guildData.whitelist.find((c) => c.type === user2.id)) return;
      let Ww = await Owner.findOne({ ownerCode: "768944616724103170" });
      if (Ww.worldWhitelist.find((c) => c.type === user2.id)) return;
      if (guildData.channel.lmite === 1) {
        let member = await guild.members.fetch(user2.id)
        const embed = new Discord.MessageEmbed()
          .setColor("#fc0303")
          .setThumbnail(guild.iconURL())
          .setTitle(`<:punishment:837867514947174431> Actions in the server **${guild.name}**`)
          .setDescription(`${user2.username} created or deleted 1 channels don’t worry i taked the action!`);
        const embed2 = new Discord.MessageEmbed()
          .setColor("#fc0303")
          .setThumbnail(guild.iconURL())
          .setTitle(`<:punishment:837867514947174431> Actions in the server **${guild.name}**`)
          .setDescription(`${user2.username} created or deleted 1 channels i can't take the action!`);

        if (guildData.punishment === "ban") {
          if (member.bannable) {
            await member.ban({ reason: `Create or Delete 1 channel` })
            embed.addField("Ban", `Name: ${user2.username}\nTag : ${user2.tag}\nID: ${user2.id}`)
            await guild.owner.send({embeds:[embed]}).catch(err => {})
            const position = channel.position;
            const newChannel = await channel.clone();
            newChannel.setPosition(position);
          } else {
            embed2.addField("Can't ban", `Name: ${user2.username}\nTag : ${user2.tag}\nID: ${user2.id}`)
            await guild.owner.send({embeds:[embed2]}).catch(err => {})
          }
        } else if (guildData.punishment === "kick") {
          if (member.kickable) {
            await member.kick({ reason: `Create or Delete 1 channel` })
            embed.addField("Kick", `Name: ${user2.username}\nTag : ${user2.tag}\ID: ${user2.id}`)
            await guild.owner.send(embed).catch(err => {})
            const position = channel.position;
            const newChannel = await channel.clone();
            newChannel.setPosition(position);
          } else {
            embed2.addField("Can't kick", `Name: ${user2.username}\nTag : ${user2.tag}\nID: ${user2.id}`)
            await guild.owner.send({embeds:[embed2]}).catch(err => {})
          }
        }

      } else {
        memberData.channelC = memberData.channelC + 1;
        setTimeout(() => {
          if (memberData.channelC !== 0) {
            memberData.channelC = 0;
            memberData.save();
          }
        }, 6000 * 60 * 60)
        if (memberData.channelC === guildData.channel.lmite || memberData.channelC > guildData.channel.lmite) {
          let member = await guild.members.fetch(user2.id)
          const embed = new Discord.MessageEmbed()
            .setColor("#fc0303")
            .setThumbnail(guild.iconURL())
            .setTitle(`<:punishment:837867514947174431> Actions in the server **${guild.name}**`)
            .setDescription(`${user2.username} created or deleted ${guildData.channel.lmite} channels don’t worry i taked the action!`);
          const embed2 = new Discord.MessageEmbed()
            .setColor("#fc0303")
            .setThumbnail(guild.iconURL())
            .setTitle(`<:punishment:837867514947174431> Actions in the server **${guild.name}**`)
            .setDescription(`${user2.username} created or deleted ${guildData.channel.lmite} channels i can't take the action!`);


          if (guildData.punishment === "ban") {
            if (member.bannable) {
              await member.ban({ reason: `Create or Delete ${guildData.channel.lmite} channels` })
              embed.addField("Ban", `Name: ${user2.username}\nTag : ${user2.tag}\nId: ${user2.id}`)
              await guild.owner.send({embeds:[embed]}).catch(err => {})
            } else {
              embed2.addField("Can't ban", `Name: ${user2.username}\nTag : ${user2.tag}\nID: ${user2.id}`)
              await guild.owner.send({embeds:[embed2]}).catch(err => {})
            }
          } else if (guildData.punishment === "kick") {
            if (member.kickable) {
              await member.kick({ reason: `Create or Delete ${guildData.channel.lmite} channels` })
              embed.addField("Kick", `Name: ${user2.username}\nTag : ${user2.tag}\nId: ${user2.id}`)
              await guild.owner.send({embeds:[embed]}).catch(err => {})
            } else {
              embed2.addField("Can't kick", `Name: ${user2.username}\nTag : ${user2.tag}\nID: ${user2.id}`)
              await guild.owner.send({embeds:[embed2]}).catch(err => {})
            }
          }
        }
        memberData.save();
      }
    } catch (err) {
      return;
    }
  }
}

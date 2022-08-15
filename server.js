const { Discord, Client } = require("discord.js");
const bot = new Client({
  intents: [
    "GUILDS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"
  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true
  },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});
///const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD] });

const { Util } = require("discord.js");
const fs = require("fs");
const prefix = "#";
const { Collection, RichEmbed } = require("discord.js");
const beautify = require("js-beautify");
const { inspect } = require("util");
let dev = [""];
const cmd = require("node-cmd");
const { I18n } = require("locale-parser");
bot.reva = new I18n({ defaultLocale: "en" });

global.logChannel = bot.channels.cache.get("891641446283759646")
 
global.mongoose = require("mongoose");
mongoose
  .connect(
    "",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to the Mongodb database.");
  })
  .catch(err => {
    console.log("Unable to connect to the Mongodb database. Error:" + err);
  });

global.Guild = require("./data/guild.js");
global.User = require("./data/user.js");
global.Owner = require("./data/owner.js");
global.Prime = require("./data/prime.js");
global.Lang = require("./data/lang.js");
global.Black = require("./data/blacklist");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.catagories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handler/${handler}`)(bot);
});

/**/
let util = require("util"),
  readdir = util.promisify(fs.readdir);

const init = async () => {
  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = new (require(`./events/${file}`))(bot);
    bot.on(eventName, (...args) => event.run(...args, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
};
init();

bot.on("ready", () => {
  console.log(`[!]-------------------------------------[!]`);
  console.log(`Display Name : ${bot.user.username}`);
  console.log(`Display Name ; ${bot.user.username}`);
  console.log(`Public Prefix : ${prefix}`);
  console.log(`Version : 4.0.0`);
  console.log(`[!]-------------------------------------[!]`);
});

bot.on("ready", () => {
  bot.user.setActivity("#help | version: 1.0.0", { type: "WATCHING" });
});
///////////
bot.on("messageCreate", async message => {
  const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply({ content: `My prefix is \`${prefix}\`` });
  }
});
//////////




bot.login("ODUwMTA2NTkxMDUxMzgyNzg0.YLk5dQ.dt0POc-zYUZwfq2NS0EyY4riWjg");

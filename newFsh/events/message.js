const Discord = require("discord.js");
const fs = require('node:fs');
let path = require('node:path');

const getAllJsFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllJsFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith(".js")) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
};

module.exports = {
  name: Discord.Events.MessageCreate,
  async execute(fsh, resFunc, message) {
    const prefix = "fsh!"; // Bot prefix (incase we need to change)
    /* -- Let webhooks be able to fsh -- */
    if (message.webhookId != null) {
      if (message.content.toLowerCase().includes("fsh")) {
        try {
          message.channel.send("fsh");
        } catch (err) {
          return;
        }
      }
    }
    /* -- No bots -- */
    if (message.author.bot) return;
    /* -- Check if token -- */
    const fileTypes = ['text/plain', 'application/json'];
    if ((fsh.server_config.get(message.guild.id)||{}).token_warn || false) {
      const files = Array.from(message.attachments);
      files.map(e=>{return (fileTypes.includes(e[1].contentType)?e[1]:'')}).filter(e=>{return e.length});
      if (files.length) {
        files.forEach(async file=>{
          try {
            const response = await fetch(file[1].url);
            if (response.ok) {
              const text = await response.text();
              if (text) {
                if (text.match(/([a-zA-Z0-9\-_]{24,26})\.([a-zA-Z0-9\-_]{6})\.([a-zA-Z0-9\-_]{38})/g)) {
                  message.reply(':warning: '+file[1].name+' contains a user/bot token')
                }
              }
            }
          } catch (error) {
            // Ignore
          }
        })
      }
    }
    /* -- If "fsh" add fsh -- */
    if (
      message.content.toLowerCase().includes("fsh") &&
      !(message.content.toLowerCase() || "").startsWith(prefix)
    ) {
      // Try to send fsh
      try {
        message.channel.send("fsh");
      } catch (err) {
        return;
      }
      // If new user set some basic stuff
      if (!fsh.bank_fsh.has(message.author.id)) {
        fsh.bank_fsh.set(message.author.id, 0)
      }
      if (!fsh.bank_limit.has(message.author.id)) {
        fsh.bank_limit.set(message.author.id, 1000)
      }
      // Has used fsh before?
      if (fsh.user_fsh.has(message.author.id)) {
        fsh.user_fsh.add(message.author.id, 1);
        // If owns a server with fsh add extra fsh
        fsh.client.guilds.cache.forEach(async (s) => {
          if (s.ownerId == message.author.id) {
            fsh.user_fsh.add(message.author.id, 1);
            return;
          }
        });
      } else {
        fsh.user_fsh.set(message.author.id, 1);
      }
      return;
    }
    /* -- Check if pinger bot -- */
    if (message.mentions.users != null && message.mentions.users.size > 0) {
      if (message.mentions.members.first().id === "1068572316986003466") {
        if (!message.content.toLowerCase().includes(prefix)) {
          // Type 19 is a reply, we want @ not reply
          if (!(message.type === "19")) {
            message.channel.send(`fsh\n*( my prefix is ${prefix} )*`);
            // Add fsh
            if (fsh.user_fsh.has(message.author.id)) {
              fsh.user_fsh.add(message.author.id, 1);
              fsh.client.guilds.cache.forEach(async (s) => {
                if (s.ownerId === message.author.id) {
                  fsh.user_fsh.add(message.author.id, 1);
                  return;
                }
              });
            } else {
              fsh.user_fsh.set(message.author.id, 1);
            }
          }
          return;
        }
      }
    }
    /* -- Command handeler -- */
    let arguments = message.content.toLowerCase().split(" ");
    let command = arguments.shift();

    if (!(message.content.toLowerCase() ?? "").startsWith(prefix)) return;
    command = command.replaceAll(prefix, "");

    if (!fsh.user_fsh.has(message.author.id)) {
      fsh.user_fsh.set(message.author.id, 0);
    }

    /* -- Run command if it exists -- */
    if (!fsh.client.textcommands.filter(c=>!c.slash).has(command)) {
      if (command == "re") {
        if (!fsh.devIds.includes(message.author.id)) {
          message.channel.send("dev only!");
          return;
        }
        var resh = new Discord.EmbedBuilder();
        resh.setTitle(`${fsh.emojis.console} Command refresh`);
        resh.setColor("#333333");
        try {
          resFunc.res("commands", "textcommands");
          resFunc.res("interactions", "interactions");
          /*resFunc.res('context', 'contextmenu')*/
          resh.setDescription(`Refreshed commands`);
          fsh.TxtCmdsFiles = getAllJsFiles(path.join(__dirname, "../"), []);
        } catch (err) {
          console.log(err);
          resh.setDescription(`Couldn't refresh\n${err}\n(more info in console)`);
        }
        message.channel.send({
          embeds: [resh]
        });
      }
      return;
    }
    fsh.client.textcommands
      .get(command)
      .execute(message, arguments, fsh, resFunc);
  },
};
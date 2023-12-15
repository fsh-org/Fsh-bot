const { Events } = require("discord.js");
const Discord = require("discord.js");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  name: Events.MessageCreate,
  async execute(fsh, resFunc, message) {
    const prefix = "fsh!"; // Bot prefix (incase we need to change)
    /* -- Let webhooks be able to fsh -- */
    if (message.webhookId != null) {
      if (message.content.toLowerCase().includes("fsh")) {
        if (message.channel.parentId != "1095063470082363493") {
          try {
            message.channel.send("fsh");
          } catch (err) {
            return;
          }
        }
      }
    }
    /* -- No bots -- */
    if (["1126479544883355700",'1183446047666737162'].includes(message.author.id)) {
      //console.log(message.mentions)
      try {
        if (!message.embeds[0]) return;
        if (!message.embeds[0].data) return;
        if (!message.embeds[0].data.title.match(/quiz/ig).length > 0) return;
      } catch (err) {
        return;
      }
      try {
      //if (!fsh.devIds.includes(message.mentions.repliedUser.id)) return;
      if (['899368692301836319','1045764183288987689'].includes(Array.from(message.mentions.users)[0])) return;
      } catch (err) {
        return;
      }
      if (message.embeds[0].data.description.includes("Quiz Solver:")) return;
      let a = String(message.embeds[0].data.description || "").replaceAll(" ","").match(/[0-9]{1,3}(\+|-|\*)[0-9]{1,3}/g)[0]
      //let a = String(message.embeds[0].data.description).match(/\*\*.{3,7}\*\*/g)[0].replaceAll("**","")
      //let a = String(message.embeds[0].data.description).replaceAll("**", "").split("\n")[0];
      if (a.includes("+")) {
        a = a.split("+");
        a = Number(a[0]) + Number(a[1]);
      } else {
        if (a.includes("-")) {
          a = a.split("-");
          a = Number(a[0]) - Number(a[1]);
        } else {
          if (a.includes("*")) {
            a = a.split("*");
            a = Number(a[0]) * Number(a[1]);
          } else {
            return;
          }
        }
      }
      message.channel.send(String(a) + "** **").then(async (msg) => {
        await delay(5 * 1000);
        msg.delete();
      });
    }
    if (message.author.bot) return;
    /* -- If "fsh" add fsh -- */
    if (
      message.content.toLowerCase().includes("fsh") &&
      !(message.content.toLowerCase() || "").startsWith(prefix)
    ) {
      try {
        message.channel.send("fsh");
      } catch (err) {
        return;
      }
      if (!fsh.bank_fsh.has(message.author.id)) {
        fsh.bank_fsh.set(message.author.id, 0)
      }
      if (!fsh.bank_limit.has(message.author.id)) {
        fsh.bank_limit.set(message.author.id, 1000)
      }
      if (fsh.user_fsh.has(message.author.id)) {
        fsh.user_fsh.add(message.author.id, 1);
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
      if (message.mentions.members.first().id == "1068572316986003466") {
        if (!message.content.toLowerCase().includes(prefix)) {
          if (!(message.type == "19")) {
            message.channel.send(`fsh\n*( my prefix is ${prefix} )*`);
            if (fsh.user_fsh.has(message.author.id)) {
              fsh.user_fsh.add(message.author.id, 1);
              fsh.client.guilds.cache.forEach(async (s) => {
                if (s.ownerId == message.author.id) {
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
    /* -- Commands handeler -- */
    let arguments2 = message.content.toLowerCase().split(" ");
    let command = arguments2.shift();

    if (!(message.content.toLowerCase() || "").startsWith(prefix)) return;
    command = command.replaceAll(prefix, "");

    
    if (!fsh.user_fsh.has(message.author.id)) {
      fsh.user_fsh.set(message.author.id, 0);
    }

    /* -- Run command if it exists -- */
    if (!fsh.client.textcommands.has(command)) {
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
        } catch (err) {
          console.log(err);
          resh.setDescription(
            `Couldn't refresh\n${err}\n(more info in console)`
          );
        }
        message.channel.send({
          embeds: [resh],
        });
      }
      return;
    }
    fsh.client.textcommands
      .get(command)
      .execute(message, arguments2, fsh, resFunc);
  },
};

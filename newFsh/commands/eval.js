const Discord = require("discord.js");
const os = require("node:os");
const crypto = require("node:crypto");
const fs = require("node:fs");

// evel these vars for funnis
const your_mom = "very large";
const maxy_dev = `[🔗](https://github.com/maxy-devs/embedlink)`;
const inv = "<:rating:1121479224155459634>";

const ddos = function (g) {
  return "ddosing " + g;
};

function nuke(message) {
  message.channel.send("Requesting permisions from discord");
  message.channel.send("Deleting roles... 25% done");
  message.channel.send("Deleting channels... 50% done");
  message.channel.send("Banning members... 75% done");
  message.channel.send("Gaining access to owner's account... 85% done");
  message.channel.send("Deleting the server... 99% done");
  throw new Error("Not enough perms to continue, reverting everything");
}

module.exports = {
  name: "eval",
  category: "hidden",

  async execute(message, arguments2, fsh, resFunc) {
    let args = message.content.split(" ").splice(1);
    if (!fsh.devIds.includes(message.author.id)) {
      if (message.content.includes("no")) {
        if (message.content.includes("yes")) {
          message.channel.send("maybe");
        } else {
          message.channel.send("yes");
        }
      } else {
        message.channel.send("no");
      }
      return;
    }
    let evol;
    try {
      let time = Date.now();
      let res = await eval(args.join(" "))
      time = Date.now() - time;
      let len;
      if (['string','number'].includes(typeof(res))) {
        len = res.toString(10).length
      } else {
        len = res?.length;
      }
      if (!len) len = 'unknown';
      evol = new Discord.EmbedBuilder()
        .setTitle(`${fsh.emojis.console} Eval success`)
        .setColor("#33ff33")
        .setDescription(`Response:
\`\`\`js
${res}
\`\`\``)
        .addFields({
          name: `Type`,
          value: `\`${typeof(res)}\``,
          inline: true
        },
        {
          name: `Length`,
          value: `\`${len}\``,
          inline: true
        },
        {
          name: `Time`,
          value: `\`${time/1000}s\``,
          inline: true
        });
    } catch (err) {
      evol = new Discord.EmbedBuilder()
        .setTitle(`${fsh.emojis.console} Eval error`)
        .setColor("#ff0000")
        .setDescription(`Response:\n${err}`);
    }
    message.channel.send({
      embeds: [evol]
    });
  }
};

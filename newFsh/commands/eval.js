// so many modules god
const Discord = require("discord.js");
const os = require("os-utils");
const https = require("https");
const CRYPTOJS = require("crypto-js");
const write = require("write");
const ytstream = require('yt-stream');
const fs = require("fs");

// evel these vars for funnis
const your_mom = "very large";
const ddededodediamante = "<a:sprong_bob:1117887260793245816>";
const maxy_dev = `[🐍](https://github.com/maxy-dev/pythonbot)`;
const inv = "<:rating:1121479224155459634>";

const ddos = function (g) {
  return "ddosing " + g;
};

const add = function (a, b){
	if(a==9){
		if(b==10){
			return 21
		}
	}
	return Number([a, b].join(''))
}

function calcmentalageof(person) {
  return person + "is -1 years old in mental age";
}

function mayo(c) {
  let time = c*9
  return `${Math.floor(time / 604800)} weeks ${Math.floor(time / 86400) % 7} days ${Math.floor(time / 3600) % 24} hours ${Math.floor(time / 60) % 60} minutes ${time % 60} seconds`
}

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
    /*
    // debug eval
    console.log("Eval debugin dump")
    console.log(message)
    console.log(args.join(' '))
    console.log(arguments2.join(' '))
    //*/
    if (!fsh.devIds.includes(message.author.id)) {
      if (message.content.includes("no")) {
        message.channel.send("yes");
      } else {
        message.channel.send("no");
      }
      return;
    }
    try {
      let time = new Date()/1
      let res = await eval(args.join(" "))
      time = (new Date()/1) - time
      var evol = new Discord.EmbedBuilder()
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
      })
      .addFields({
        name: `Time`,
        value: `\`${time/1000}s\``,
        inline: true
      });
    } catch (err) {
      var evol = new Discord.EmbedBuilder();
      evol.setTitle(`${fsh.emojis.console} Eval error`);
      evol.setColor("#ff0000");
      evol.setDescription(`Response:\n${err}`);
    }
    message.channel.send({
      embeds: [evol],
    });
  }
};
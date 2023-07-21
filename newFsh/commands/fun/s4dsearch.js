const Discord = require("discord.js");
const https = require("https");

module.exports = {
  name: "s4dsearch",
  params: ["query", true],
  info: "Search for a scratch for discord example",
  category: "fun",

  async execute(message, arguments2, fsh) {
    https
      .get(
        "https://469exampletest.jeremygamer13.repl.co/api/examples",
        async (resp) => {
          let data2 = "";
          resp.on("data", async (chunk) => {
            data2 += chunk;
          });
          resp.on("end", async () => {
            let data = JSON.parse(data2);
            let embed = new Discord.EmbedBuilder()
              .setTitle(`S4D search "${arguments2.join(" ")}"`)
              .setTimestamp()
              .setFooter({ text: "V" + fsh.version })
              .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ format: "png" }),
              })
              .setColor("#888888");
            Object.keys(data).forEach(async (key) => {
              if (data[key][0].toLowerCase().includes(arguments2.join(" "))) {
                embed.addFields({
                  name: `${data[key][0]} (id: ${data[key][4]}) || by: ${data[key][6]}`,
                  value: `**${fsh.emojis.thumbsup} ${data[key][8]}    ${
                    fsh.emojis.thumbsdown
                  } ${data[key][9]}    ${fsh.emojis.fileimport} ${
                    data[key][10]
                  }    ${fsh.emojis.cube} ${data[key][3]}**
                ${data[key][1]}\n
                ${
                  data[key][7] == "" ? "" : `uploaded to ${data[key][7]}\n`
                }[Try it here!](https://scratch-for-discord.com/?exampleid=${
                    data[key][4]
                  })`,
                });
              }
            });
            message.channel.send({
              embeds: [embed],
            });
          });
        }
      )
      .on("error", async (err) => {
        message.channel.send("Could not get data, try again later");
        console.log("Error: " + err.message);
      });
  },
};

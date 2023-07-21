const Discord = require("discord.js");
const https = require("https");

module.exports = {
  name: "gcomplete",
  params: ["query", true],
  info: "Let google finish a sentence",
  category: "fun",
  async execute(message, arguments2, fsh) {
    https
      .get(
        `https://suggestqueries.google.com/complete/search?client=firefox&q=${arguments2.join(
          " "
        )}`,
        async (resp) => {
          let data2 = "";
          resp.on("data", async (chunk) => {
            data2 += chunk;
          });
          resp.on("end", async () => {
            let data = JSON.parse(data2);
            c = String(data).replaceAll("[", "").replaceAll("]", "").split(",");
            c.pop();
            c.pop();
            c.shift();
            var gcomplete = new Discord.EmbedBuilder()
              .setTitle(
                `${fsh.emojis.google} Google complete "${arguments2.join(" ")}"`
              )
              .setDescription(`**Results:**\n${c.join("\n")}`)
              .setTimestamp()
              .setFooter({ text: "V" + fsh.version })
              .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ format: "png" }),
              })
              .setColor("#ffffcc");

            message.channel.send({
              embeds: [gcomplete],
            });
          });
        }
      )
      .on("error", async (err) => {
        message.channel.send("Error");
        console.log("Error: " + err.message);
      });
  },
};

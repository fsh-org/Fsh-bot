const { EmbedBuilder } = require("discord.js");
const os = require("os-utils");

function textu(text, input, extra) {
  return [text, input, extra].join("");
}

function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

function time_gud(time) {
  return [
    Math.floor(time / 60) > 59
      ? Math.floor(time / 3600) > 23
        ? false
          ? null
          : [
              Math.floor(time / 86400),
              " days ",
              Math.floor(time / 3600) % 24,
              " hours ",
            ].join("")
        : String(Math.floor(time / 3600) % 24) + " hours "
      : "",
    Math.floor(time / 60) % 60,
    " minutes ",
    time % 60,
    " seconds",
  ].join("");
}

module.exports = {
  name: "info",
  info: "Gives info about the bot",
  category: "main",
  async execute(message, arguments2, fsh) {
    os.cpuUsage(async function (v) {
      var obj = v * 100;
      var info = new EmbedBuilder();
      info.setTitle("Fsh info");
      info.setFooter({
        text: String("V" + fsh.version),
      });
      info.setTimestamp(new Date());
      info.setColor("#999999");
      info.setDescription(
        String("Created by `frostzzone#4486 and inventionpro#6814`")
      );
      var JSONdata = fsh.user_fsh.all();
      info.addFields({
        name: String("Bot"),
        value: String(
          [
            textu("> Ping: `", fsh.client.ws.ping, "ms`"),
            textu("> Users: `", fsh.client.users.cache.size, "`"),
            textu("> Members: `", Object.keys(JSONdata).length, "`"),
            textu("> Channels: `", fsh.client.channels.cache.size, "`"),
            textu("> Servers: `", fsh.client.guilds.cache.size, "`"),
          ].join("\n")
        ),
        inline: true,
      });
      info.addFields({
        name: String("Host"),
        value: String(
          [
            textu(
              "> Uptime: `",
              time_gud(Math.floor(fsh.client.uptime / 1000)),
              "`"
            ),
            textu("> CPU: `", Math.round(Number(obj) * 100) / 100, "%`"),
            textu(
              "> Memory: `",
              [
                Math.round(
                  (Number(os.totalmem()) - Number(os.freemem())) / 1024
                ),
                "/",
                Math.round(Number(os.freemem()) / 1024),
              ].join(""),
              [
                "KB (",
                Math.round(
                  (Math.round(
                    (Number(os.totalmem()) - Number(os.freemem())) / 1024
                  ) /
                    Math.round(Number(os.totalmem()) / 1024)) *
                    100 *
                    100
                ) / 100,
                "%)`",
              ].join("")
            ),
            textu("> Operating System: `", os.platform(), "`"),
          ].join("\n")
        ),
        inline: true,
      });

      let dete = [];
      if (arguments2[0] == "versions") {
        var JSONdataS4D = require("../../../package.json").dependencies;
        Object.keys(JSONdataS4D).forEach(async (s4dkey) => {
          if (s4dkey != "discord.js") {
            dete.push(`${textToTitleCase(s4dkey)}: \`${JSONdataS4D[s4dkey]}\``);
          }
        });
      } else {
        let dep = require("../../../package.json").dependencies;
        dete = [
          `CrAIyon: \`${dep.craiyon}\``,
          `Express: \`${dep.express}\``,
          `Node-fetch: \`${dep["node-fetch"]}\``,
          "use `info versions` for full list",
        ];
      }

      info.addFields({
        name: String("Versions"),
        value: String(
          `${fsh.emojis.nodejs} NodeJS: \`${process.version.replace(
            /v/g,
            ""
          )}\`\n${fsh.emojis.djs} Discord.js: \`${
            require("discord.js").version
          }\`\n${dete.join("\n").replaceAll("^", "")}`
        ),
        inline: true,
      });

      message.channel.send({
        embeds: [info],
      });
    });
  },
};

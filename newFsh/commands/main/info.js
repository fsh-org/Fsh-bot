const { EmbedBuilder } = require("discord.js");
const os = require("os-utils");

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
              "d ",
              Math.floor(time / 3600) % 24,
              "h ",
            ].join("")
        : String(Math.floor(time / 3600) % 24) + "h "
      : "",
    Math.floor(time / 60) % 60,
    "m ",
    time % 60,
    "s",
  ].join("");
}

module.exports = {
  name: "info",
  info: "Gives info about the bot",
  category: "main",
  async execute(message, arguments2, fsh) {
    function userin(id) {
      if (message.guild.members.cache.has(id)) {
        return `<@${id}>`;
      } else {
        return fsh.client.users.cache.get(id).username;
      }
    }
    os.cpuUsage(async function (v) {
      var obj = v * 100;
      var info = new EmbedBuilder()
      .setTitle("Fsh info")
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`Created and maintained by ${userin("712342308565024818")} and ${userin("816691475844694047")}`);
      if(arguments2[0] != "version") {
        info.addFields({
          name: `${fsh.emojis.fsh} Bot`,
          value: `
> Ping: \`${fsh.client.ws.ping}ms\`
> Users: \`${Object.keys(fsh.user_fsh.all()).length}/${fsh.client.users.cache.size}\`
> Channels: \`${fsh.client.channels.cache.size}\`
> Servers: \`${fsh.client.guilds.cache.size}\`
> Commands: \`${fsh.client.textcommands.filter(e => {return "main, economy, fun, music, utility, admin".includes((e).category)}).size}\``,
          inline: true,
        },
        {
          name: `${fsh.emojis.server} Host`,
          value: `
> Uptime: \`${time_gud(Math.floor(fsh.client.uptime / 1000))}\`
> CPU: \`${Math.round(Number(obj) * 100) / 100}%\`
> Memory: \`${Math.round((Number(os.totalmem()) - Number(os.freemem())) / 1024)}/${Math.round(Number(os.totalmem()) / 1024)}KB (${Math.round((Math.round((Number(os.totalmem()) - Number(os.freemem())) / 1024) / Math.round(Number(os.totalmem()) / 1024)) * 100 * 100) / 100}%)\`
> OS: \`${os.platform()}\``,
          inline: true,
        });
      }
      let dete = [];
      if (arguments2[0] == "version") {
        var JSONdataS4D = require("../../../package.json").dependencies;
        Object.keys(JSONdataS4D).forEach(async (s4dkey) => {
          if (s4dkey != "discord.js") {
            dete.push(`${textToTitleCase(s4dkey)}: \`${JSONdataS4D[s4dkey]}\``);
          }
        });
      } else {
        let dep = require("../../../package.json").dependencies;
        dete = [
          `Express: \`${dep.express}\``,
          `Socket.io: \`${dep["socket.io"]}\``,
          "`info version` for full list"
        ];
      }
      info.addFields({
        name: "Versions",
        value: `
${fsh.emojis.nodejs} NodeJS: \`${process.version.replace(/v/g, "")}\`
${fsh.emojis.djs} Discord.js: \`${require("discord.js").version}\`
${dete.join("\n").replaceAll("^", "")}`,
        inline: true,
      });
      message.channel.send({
        embeds: [info],
      });
    });
  },
};
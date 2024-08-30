const { EmbedBuilder } = require("discord.js");
const os = require("node:os");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function textToTitleCase(str) {
  return str.replace(/\S+/g, function (txt) {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
  });
}

function formatBytes(bytes, sufix=true) {
  bytes = Number(bytes);
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + (sufix ? ' '+sizes[i] : '');
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

function getCPUInfo() {
  var cpus = os.cpus();
  var idle = 0;
  var total = 0;

  for(var cpu in cpus){
    total += Object.values(cpus[cpu].times).reduce((a, b) => a + b, 0);
    idle += cpus[cpu].times.idle;
  }

  return {
    idle: idle, 
    total: total
  };
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
    let CM = fsh.TxtCmdsFiles.filter(e => {return "main, economy, fun, music, utility, admin".includes(require(e).category)});
    let lo = []
    let CU = CM.forEach(e => {Array.isArray(require(e).name) ? require(e).name.forEach(t=>lo.push('d')) : lo.push('d')})

    let CPUsage = 0;
    let cpu1 = getCPUInfo();
    await delay(500);
    let cpu2 = getCPUInfo();
    CPUsage = 1 - 2 * ((cpu2.idle - cpu1.idle) / (cpu2.total - cpu1.total));
    CPUsage = Math.round(CPUsage * 1000) / 100;

    let info = new EmbedBuilder()
      .setTitle("Fsh info")
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`Created and maintained by ${userin("712342308565024818")} and ${userin("816691475844694047")}`);

    if(arguments2[0] !== "version") {
      info.addFields({
        name: `${fsh.emojis.fsh} Bot`,
        value: `
> Ping: \`${fsh.client.ws.ping}ms\`
> Users: \`${Object.keys(fsh.user_fsh.all()).length}/${fsh.client.users.cache.size}\`
> Channels: \`${fsh.client.channels.cache.size}\`
> Servers: \`${fsh.client.guilds.cache.size}\`
> Commands: \`${CM.length}\` (\`${lo.length}\`)`,
        inline: true,
      },
      {
        name: `${fsh.emojis.server} Host`,
        value: `> Uptime: \`${time_gud(Math.floor(fsh.client.uptime / 1000))}\`
> CPU: \`${CPUsage}%\`
> Memory: \`${formatBytes(os.totalmem() - os.freemem(), false)}/${formatBytes(os.totalmem())} (${Math.round(((os.totalmem() - os.freemem()) / os.totalmem()) * 10000) / 100}%)\`
> OS: \`${os.platform()}\` (\`${os.machine()}\`)`,
        inline: true,
      });
    }
    let dete = [];
    if (arguments2[0] === "version") {
      let JSONdata = require("../../../package.json").dependencies;
      Object.keys(JSONdata).forEach(async (key) => {
        if (key != "discord.js") {
          dete.push(`${textToTitleCase(key)}: \`${JSONdata[key]}\``);
        }
      });
    } else {
      let dep = require("../../../package.json").dependencies;
      dete = [
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
  },
};
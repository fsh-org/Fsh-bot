const Discord = require("discord.js");

function formatBytes(bytes) {
  if (bytes === 0) return '0B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(0)) + sizes[i];
}

function cl(txt) {
  return txt
    .replace('A custom osu! ruleset ','')
    .replace('A custom game mode for osu!lazer project ','')
    .replace('A custom ruleset for osu!lazer that ','')
}

module.exports = {
  name: ['osur', 'osuruleset'],
  params: ['query', true],
  info: "Search for a custom lazer ruleset",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let s = arguments2.join(' ');
    if (!s) {
      message.reply('include query');
      return;
    }
    let data = await fetch('https://rulesets.info/api/rulesets');
    data = await data.json();
    data = data.filter(e=>e.can_download).filter(e=>e.name.toLowerCase().includes(s)||e.description.toLowerCase().includes(s));

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Ruleset search "${s}"`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setDescription(`${data.length} results
${data.map(e=>`**${e.name}** | By: [${e.owner_detail?.user?.username || 'Deleted'}](https://rulesets.info/profile/${e.owner_detail.id || '0'}) | [${fsh.emojis.fileimport} (${formatBytes(e.status.file_size)})](${e.direct_download_link})
${cl(e.description)}`).join('\n')}`);

    message.channel.send({
      embeds: [embed]
    });
  }
};
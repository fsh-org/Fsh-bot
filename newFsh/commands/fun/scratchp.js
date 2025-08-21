const Discord = require("discord.js");

module.exports = {
  name: "scratchp",
  params: ['id', true],
  info: "Info on a scratch project",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (arguments2.length < 1) {
      message.channel.send("Please provide a project id")
      return;
    }
    let data = await fetch(`https://scratchdb.lefty.one/v3/project/info/${arguments2[0]}`)
    data = await data.json();
    if (String(data.error) != "undefined") {
      message.channel.send("Project not in cache")
      return;
    }
    let user = await fetch(`https://scratchdb.lefty.one/v3/user/info/${data.username}`)
    user = await user.json();
    let embed = new Discord.EmbedBuilder()
      .setTitle(data.title)
      .setDescription(`id: ${data.id} sys_id: ${data.sys_id}
Comments allowed? ${data.comments_allowed ? "true" : "false"}

Complete descriptions and instructions in [project](https://scratch.mit.edu/projects/${data.id}/)`)
      .setImage(`https://uploads.scratch.mit.edu/get_image/project/${data.id}_586x440.png`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: data.username,
        iconURL: `https://uploads.scratch.mit.edu/get_image/user/${user.id}_128x128.png`
      })
      .setColor("#888888")
      .setURL(`https://scratch.mit.edu/projects/${data.id}/`);
    if (data.description) {
      embed.addFields({
        name: `Description`,
        value: data.description.slice(0, 150),
        inline: true
      })
    }
    if (data.instructions) {
      embed.addFields({
        name: `Instructions`,
        value: data.instructions.slice(0, 150),
        inline: true
      })
    }
    if (String(data.remix.parent) != "null") {
      embed.addFields({
        name: "Remix",
        value: `Parent: ${data.remix.parent}
Root: ${data.remix.root}`,
        inline: true
      })
    }
      embed.addFields({
        name: "Time (dd/mm/yyyy)",
        value: `Created: \`${data.times.created.split("T")[0].split('-').slice().reverse().join('/')}\`
        Modified: \`${data.times.modified.split("T")[0].split('-').slice().reverse().join('/')}\`
        Shared: \`${data.times.shared.split("T")[0].split('-').slice().reverse().join('/')}\``,
        inline: true
      });
      embed.addFields({
        name: "Statistics",
        value: `Views: ${data.statistics.views} (#${data.statistics.ranks.views})
Loves: ${data.statistics.loves} (#${data.statistics.ranks.loves})
Favorites: ${data.statistics.favorites} (#${data.statistics.ranks.favorites})
Comments: ${data.statistics.comments}`,
        inline: true
      })
    message.reply({
      embeds: [embed]
    })
  },
};

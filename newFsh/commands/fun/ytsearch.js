const Discord = require("discord.js");

const pure = function (text) {
  return String(String(text).replaceAll(",", String("\\,"))).replaceAll(
    '"',
    String('\\"')
  );
};

module.exports = {
  name: "ytsearch",
  params: ["query", true],
  info: "Search for a youtube video",
  category: "fun",
  async execute(message, arguments2, fsh) {
    let dat = await fetch(`https://poopoo-api.vercel.app/api/youtube/video?search=${arguments2.join("%20")}`);
    dat = await dat.json();

    let embed = new Discord.EmbedBuilder()
      .setTitle(`${fsh.emojis.youtube} YouTube search "${arguments2.join(" ")}"`)
      .setTimestamp()
      .setFooter({ text: `V${fsh.version}` })
      .setAuthor({
        name: message.member.displayName,
        iconURL: message.author.displayAvatarURL({ format: "png" }),
      })
      .setColor("#888888");

    dat.data.results.forEach((element) => {
      if (response.data.results.indexOf(element) < 5) {
        embed.addFields({
          name: `${pure(element.title)} || by: ${pure(element.by)} - ${new Date(Number(pure(element.length)) * 1000).getHours()}h ${new Date(Number(pure(element.length)) * 1000).getMinutes()}m ${new Date(Number(pure(element.length)) * 1000).getSeconds()}s`,
          value: `${pure(element.description)}\n${pure(element.views)} views | ${pure(element.uploaded)}\nlink: ${pure(element.link)}`,
        });
      }
    });
    message.channel.send({
      embeds: [embed]
    });
    /*
    axios({
      method: "get",
      url: `https://poopoo-api.vercel.app/api/youtube/video?search=${arguments2.join(
        " "
      )}`,
      headers: {},
    })
      .then(async (response) => {
        let embed = new Discord.EmbedBuilder()
          .setTitle(
            `${fsh.emojis.youtube} YouTube search "${arguments2.join(" ")}"`
          )
          .setTimestamp()
          .setFooter({ text: "V" + fsh.version })
          .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ format: "png" }),
          })
          .setColor("#888888");
        response.data.results.forEach((element) => {
          if (response.data.results.indexOf(element) < 5) {
            embed.addFields({
              name: `${pure(element.title)} || by: ${pure(
                element.by
              )} - ${new Date(
                Number(pure(element.length)) * 1000
              ).getHours()}h ${new Date(
                Number(pure(element.length)) * 1000
              ).getMinutes()}m ${new Date(
                Number(pure(element.length)) * 1000
              ).getSeconds()}s`,
              value: `${pure(element.description)}\n${pure(
                element.views
              )} views | ${pure(element.uploaded)}\nlink: ${pure(
                element.link
              )}`,
            });
          }
        });
        message.channel.send({
          embeds: [embed],
        });
      })
      .catch(async (err) => {
        message.channel.send("Error");
        console.log(err);
      });*/
  }
};

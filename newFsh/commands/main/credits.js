const Discord = require("discord.js");

module.exports = {
  name: "credits",
  info: "Bot credits",
  category: "main",
  async execute(message, arguments2, fsh) {
    function userin(id) {
      if (message.guild.members.cache.has(id)) {
        return `<@${id}>`;
      } else {
        return fsh.client.users.cache.get(id).username;
      }
    }
    var credits = new Discord.EmbedBuilder();
    credits.setTitle("Credits");
    credits.setFooter({
      text: String("V" + String(fsh.version)),
    });
    credits.setTimestamp(new Date());
    credits.setColor("#999999");
    credits.setDescription(
      String(
        `Created and maintained by ${userin("712342308565024818")} and ${userin(
          "816691475844694047"
        )}\n(note: field below iclude devs)`
      )
    );
    credits.addFields(
      {
        name: String("Code / Features"),
        value: String(`> ${userin("439788095483936768")} [${
          fsh.emojis.github
        }](https://github.com/maxy-dev)
            > ${userin("767102460673916958")} [${
          fsh.emojis.youtube
        }](https://www.youtube.com/channel/UC8WiOgf5AGwTQ5bLJ5ya8og) [${
          fsh.emojis.website
        }](https://hitbyathunder.xyz/)
            > ${userin("860531746294726736")}`),
        inline: true,
      },
      {
        name: String("Website"),
        value: String(`> ${userin("750565290009559112")}`),
        inline: true,
      },
      {
        name: String("Art"),
        value: String(`> ${userin("486289392302817300")}`),
        inline: true,
      },
      {
        name: String("Bot partners"),
        value:
          String(`Commands or features that are only available when certain bots are on the server
            > :snake: Python Bot [:link:](https://discord.com/api/oauth2/authorize?client_id=912745278187126795&permissions=1239836650583&scope=applications.commands%20bot)
            > :cat: s4d utilities
            > :game_die: s4d economy`),
        inline: false,
      }
    );

    message.channel.send({
      embeds: [credits],
    });
  },
};

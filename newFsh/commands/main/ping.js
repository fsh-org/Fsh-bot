const { EmbedBuilder } = require("discord.js");
const https = require("https");

const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getRB(ping) {
  try {
    const response = await fetch("https://newrandomizerbot.ddededodediamante.repl.co/ping");
    const data = await response.text();
    return `\`${Math.abs(Number(data) - Number(ping))}ms\` ${Number(data) < Number(ping) ? "more" : "less"} than Randomizer Bot (\`${data.slice(0,5)}ms\`)`;
  } catch (err) {
    return "`Randomizer Bot` is not available";
  }
}

module.exports = {
  name: "ping",
  info: "Bot's ping and some others",
  category: "main",
  async execute(message, arguments2, fsh) {
    var ping = new EmbedBuilder()
      .setTitle(`Fsh ping`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setDescription(`${fsh.emojis.ping} Ping: \`${fsh.client.ws.ping}ms\``);
    message.channel
      .send({
        content: `${fsh.emojis.load} Loading other bots...`,
        embeds: [ping],
      })
      .then(async (msg) => {
        let savedping = fsh.client.ws.ping;
        ping.setDescription(
          `${fsh.emojis.ping} Ping: \`${savedping}ms\`
${fsh.emojis.lat} Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\``
        );
        ping.addFields({
          name: "Other bots",
          value: `
${await getRB(savedping)}
`,
          inline: true,
        });
        msg.edit({
          content: "",
          embeds: [ping],
        });
      });
  },
};

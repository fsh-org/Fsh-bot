const { EmbedBuilder } = require("discord.js");
const https = require("https");
const axios = require("axios");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getPY(ping) {
  try {
    const response = await fetch("https://pbot-api.vercel.app/api/ping");
    const data = await response.json();
    return String(
      `\`${Number(data.ping) - Number(ping)}ms\` less than Python Bot (\`${
        data.ping
      }ms\`)`
    );
  } catch (err) {
    console.log(err);
    return "`Python Bot` is not available";
  }
}

/*async function getGB(ping) {
  let type = "less"
  try{
  const response = await fetch('https://goodbot.parham125.repl.co/api/bot');
  const data = await response.json();
    return String(`\`${Number(data.Ping)-Number(ping)}ms\` less than Good Bot (\`${data.Ping}ms\`)`)
  } catch(err) {
    return "`Good Bot` is not available"
  }
}*/

async function getRB(ping) {
  try {
    const response = await fetch(
      "https://randomizer-bot.ddededodediamante.repl.co/info"
    );
    const data = await response.json();
    return String(
      `\`${Number(data.ping) - Number(ping)}ms\` less than Randomizer Bot (\`${
        data.ping
      }ms\`)`
    );
  } catch (err) {
    return "`Randomizer Bot` is not available";
  }
}

async function getSU(ping) {
  try {
    const response = await fetch(
      "https://s4d-utility.hitbyathunder.repl.co/ping"
    );
    const data = await response.json();
    return String(
      `\`${Number(data.ping) - Number(ping)}ms\` less than S4D Utilities (\`${
        data.ping
      }ms\`)`
    );
  } catch (err) {
    return "`S4D Utilities` is not available";
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
          `${fsh.emojis.ping} Ping: \`${fsh.client.ws.ping}ms\`\n${
            fsh.emojis.lat
          } Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\``
        );
        ping.addFields({
          name: "Other bots",
          value: String(
            [
              await getPY(savedping),
              /*await getGB(savedping), // no ping cause security */
              await getRB(savedping),
              await getSU(savedping),
            ].join("\n")
          ),
          inline: true,
        });
        msg.edit({
          content: "",
          embeds: [ping],
        });
      });
  },
};

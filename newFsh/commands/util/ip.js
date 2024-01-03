const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
  name: "ip",
  params: ["ip/domain", true],
  info: "Get info of a ip or domain",
  category: "utility",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("You must include a ip or domain")
      return;
    }

    let thong = arguments2[0];
    if (thong.includes("://")) {
      thong = thong.split("/")[2]
    }
    
    let yj = await fetch(`http://ip-api.com/json/${thong}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,mobile,proxy,hosting,query`);
    yj = await yj.json();
    if (yj.status == "fail") {
      message.reply(`error: ${yj.message}`)
      return;
    }

    var embed = new Discord.EmbedBuilder()
      .setTitle(`IP Info of ${yj.query} [${yj.query.includes(":") ? "v6" : "v4"}]`)
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor("#999999")
      .setAuthor({
        name: message.member.user.username,
        iconURL: message.member.user.displayAvatarURL({ format: "png" })
      })
      .addFields({
        name: `Location`,
        value: `Continent: ${yj.continent} (${yj.continentCode})
Country: ${yj.country} :flag_${yj.countryCode.toLowerCase()}:
Region: ${yj.regionName} (${yj.region})
City: ${yj.city}
Latitude: ${yj.lat}
Longitude: ${yj.lon}
Zip code: ${yj.zip}
Timezone: ${yj.timezone}`,
        inline: true,
      },
      {
        name: `Connection`,
        value: `Type: ${yj.query.includes(":") ? "v6" : "v4"}
ISP: ${yj.isp}
Org: ${yj.org}
As: ${yj.as} (${yj.asname})
Mobile: ${yj.mobile ? ":white_check_mark:" : ":x:"}
Proxy: ${yj.proxy ? ":white_check_mark:" : ":x:"}
Hosting: ${yj.hosting ? ":white_check_mark:" : ":x:"}
Tor: ${fs.readFileSync("text/tor.txt", 'utf8').indexOf(yj.query) < 0 ? ":x:" : ":white_check_mark:"}`,
        inline: true,
      });

    message.channel.send({
      embeds: [embed]
    })
  }
};
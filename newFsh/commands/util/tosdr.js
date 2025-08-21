const Discord = require("discord.js");

function fermet(txt) {
  if (!txt) {
    return;
  }
  if (txt == "Generated through the annotate view") {
    return;
  }
  return txt
    .replaceAll("<em>","_").replaceAll("</em>","_")
    .replaceAll(/(<a href=\".+\">)(?:.+<\/a>)/g, function replacer(match, p1, p2) {return `[${match.split('>')[1].replace("</a","")}](${match.split('"')[1]})`})
    .slice(0,1024);
}

module.exports = {
  name: "tosdr",
  params: ['query', true],
  info: "Brief resolution on a websites ToS & PP",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let res = await fetch(`https://api.tosdr.org/search/v4/?query=${arguments2.join("%20")}`);
    res = await res.json();

    if (res.parameters.services.length < 1) {
      message.reply("Service not found");
      return;
    }

    res = await fetch(`https://api.tosdr.org/service/v2/?id=${res.parameters.services[0].id}`);
    res = await res.json();

    res = res.parameters;

    var embed = new Discord.EmbedBuilder()
      .setTitle(`${res.name} [${res.is_comprehensively_reviewed ? "Official" : "Not confirmed"}]`)
      .setDescription(`# Grade ${res.rating || "N/A"}
Id: ${res.id} | Updated <t:${Math.floor(new Date(res.updated_at).getTime()/1000)}:R> | Created <t:${Math.floor(new Date(res.created_at).getTime()/1000)}:R>
**Documents:**
${res.documents.map(e => `${e.name}: ${e.url}`).join("\n")}`)
      .setFooter({
        text: `V${fsh.version}`
      })
      .setTimestamp(new Date())
      .setThumbnail(res.image)
      .setImage(`https://shields.tosdr.org/${res.id}.png`)
      .setColor("#888888");

    function GV(a,b) {
      let dat = {
        "blocker":3000,
        "bad":2000,
        "good":1000,
        "neutral":0
      };
      return (dat[a.case.classification] + a.case.weight) > (dat[b.case.classification] + b.case.weight) ? -1 : 1;
    };

    let count = 0;
    // Sort
    let points = res.points.sort(GV);

    // Remove duplicates, leave more effort ones
    points = points.reduce((acc, currentObj) => {
      const existingObj = acc.find(obj => obj.title === currentObj.title);

      if (existingObj) {
        if (currentObj.analysis > existingObj.analysis) {
          const index = acc.indexOf(existingObj);
          acc[index] = currentObj;
        }
      } else {
        acc.push(currentObj);
      }
      return acc;
    }, []);
    // Group non description ones, brok
    /*for (let i = 0; i < points.length - 1; i++) {
      const currentObj = points[i];
      const nextObj = points[i + 1];

      if ((!fermet(currentObj.analysis)) && (!fermet(nextObj.analysis))) {
        currentObj.analysis = `**${fsh.emojis[nextObj.case.classification] || fsh.emojis["neutral"]} ${nextObj.title}**`
          points.splice(i + 1, 1);
        i--;
      }
    }*///104=>64
    //console.log(points.length)

    points.forEach(e => {
      if (count<24) {
        embed.addFields({
          name: `${fsh.emojis[e.case.classification] || fsh.emojis["neutral"]} ${e.title}`,
          value: fermet(e.analysis) || "No extra data given"
        })
        count = count+1
      }
    })

    try {
      message.channel.send({
        embeds: [embed]
      })
    } catch (err) {
      message.channel.send("err: could not send (500)")
    }
  }
};
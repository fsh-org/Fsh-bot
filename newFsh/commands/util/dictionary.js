const Discord = require("discord.js");

function toTitle(str) {
  return str.replace(/\S+/g,
    function(txt) {
      return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
    });
}

module.exports = {
  name: ['dict','dictionary'],
  params: ['word', true],
  info: "Search a word on the dictionary",
  category: "utility",

  async execute(message, arguments2, fsh) {
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${arguments2[0]}`);
    data = await data.json();
    if (data.title) {
      message.reply('the word was not found');
      return;
    }
    data = data[0];

    let embed = new Discord.EmbedBuilder()
      .setTitle('Dictionary')
      .setFooter({ text: `V${fsh.version}` })
      .setTimestamp(new Date())
      .setColor('#888888')
      .setDescription(`# ${toTitle(data.word)} ${data.phonetic ? data.phonetic : data.phonetics.filter(e=>{return (e.text||'').length}).map(e=>{e.text})[0] || ''}
License: [${data.license.name}](${data.license.url})
Sources: ${data.sourceUrls.join(", ")}`);

    data.meanings.forEach(e=>{
      embed.addFields({
        name: toTitle(e.partOfSpeech),
        value: `${e.definitions.map(e=>{return '1. '+e.definition}).slice(0,9).join("\n")}

${e.synonyms.length ? '**Synonyms:** '+e.synonyms.join(", ") : ''}
${e.antonyms.length ? '**Antonyms:** '+e.antonyms.join(", ") : ''}`,
        inline: true
      });
    });

    message.channel.send({
      embeds: [embed]
    });
  }
};
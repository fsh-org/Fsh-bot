const Discord = require("discord.js");

module.exports = {
  name: 'nasa',
  slash: true,
  params: [{
    name: 'query',
    type: 'string',
    max: 100,
    min: 1,
    required: true
  }],
  category: 'fun',

  async execute(interaction, arguments, fsh) {
    let data = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(arguments.query)}&page=1&media_type=image&year_start=1920&year_end=2025`);
    data = await data.json();

    data = data.collection.items[0].href;

    let data2 = await fetch(data);
    data2 = await data2.json();
    interaction.reply(data2[0].replaceAll(' ','%20'))
  }
};
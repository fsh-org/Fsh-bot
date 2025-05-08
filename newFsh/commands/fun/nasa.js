const Discord = require("discord.js");

module.exports = {
  name: "nasa",
  params: ['query', true],
  info: "Search for nasa media",
  category: "fun",

  async execute(message, arguments2, fsh) {
    if (!arguments2[0]) {
      message.reply("put a query")
      return;
    }
    let data = await fetch(`https://images-api.nasa.gov/search?q=${arguments2.join("%20")}&page=1&media_type=image&year_start=1920&year_end=2023`);
    data = await data.json();

    data = data.collection.items[0].href

    let data2 = await fetch(data);
    data2 = await data2.json();
    message.channel.send(data2[0].replaceAll(" ","%20"))
  }
};
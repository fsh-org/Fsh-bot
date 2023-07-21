function listsGetRandomItem(list, remove) {
  var x = Math.floor(Math.random() * list.length);
  if (remove) {
    return list.splice(x, 1)[0];
  } else {
    return list[x];
  }
}

module.exports = {
  name: "eat",
  info: "Try to eat fsh",
  category: "fun",
  async execute(message, arguments2, fsh) {
    message.channel.send(
      listsGetRandomItem(
        [
          "https://cdn.discordapp.com/emojis/900643070155034645.gif?size=48",
          "no u",
          `fsh has noticed your attempt to eat him\nRUN!!`,
          "fsh sed",
          "no",
          "your attempt failed",
          "how dare you",
          "you hurt yourself with your confusion",
          "you bit yourself",
          "never gonna eat you",
        ],
        false
      )
    );
  },
};

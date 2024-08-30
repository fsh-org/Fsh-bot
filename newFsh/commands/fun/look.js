const Discord = require("discord.js");

function decode(code) {
  let alpha = [" ", " ", " ", " ", " ", " ", " ", " ", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "_"];
  return code.match(/.{1,2}/g).map(n => alpha[Number(n)-1]).join('').split(' ');
}

function time_gud(time) {
  return `${Math.floor(time / 604800)} weeks ${Math.floor(time / 86400) % 7} days ${Math.floor(time / 3600) % 24} hours ${Math.floor(time / 60) % 60} minutes ${time % 60} seconds`
}

module.exports = {
  name: ["look", "link"],
  info: "Look better at fsh and see record",
  category: "fun",

  async execute(message, arguments2, fsh) {
    let data = await fetch('https://clouddata.scratch.mit.edu/logs?projectid=793043905&limit=1&offset=0');
    data = await data.json();
    if (!data[0].value) {
      message.channel.send(`you can look at me in https://scratch.mit.edu/projects/793043905/fullscreen
there seems to be a error with scratch, could not get record`);
      return;
    }
    message.channel.send(`you can look at me in https://scratch.mit.edu/projects/793043905/fullscreen
record holder is ${decode(data[0].value)[0]} with a time of ${time_gud(decode(data[0].value)[1])}`);
  }
};
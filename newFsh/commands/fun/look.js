const Discord = require("discord.js");
const https = require("https");

function decode(code) {
  a =
    eval(`let alpha = [" ", " ", " ", " ", " ", " ", " ", " ", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "_"];
  let encoded = code;
  let i = 0;
  let output = [];
  let decoded = '';
  let temp = "a";
  while (!(temp == '00')) {
    temp = encoded.charAt(i) + encoded.charAt(i + 1);
    i = i + 2
    if (!(alpha[temp - 1] == undefined)) {
      decoded = decoded + alpha[temp - 1];
    }
  };
  output[0] = decoded
  decoded = '';
  temp = "a";
  while (!(temp == '00')) {
    temp = encoded.charAt(i) + encoded.charAt(i + 1);
    i = i + 2
    if (!(alpha[temp - 1] == undefined)) {
      decoded = decoded + alpha[temp - 1];
    }
  };
  output[1] = decoded
  rety = output;`);
  return [a[0], a[1]];
}

function time_gud(time) {
  let uni = time;
  return [
    uni >= 604800
      ? `${Math.floor(new Date(uni * 1000).getHours() / 24 / 7)} weeks `
      : "",
    uni >= 86400
      ? `${Math.floor(new Date(uni * 1000).getHours() / 24)} days `
      : "",
    uni >= 3600 ? `${new Date(uni * 1000).getHours()} hours ` : "",
    `${new Date(uni * 1000).getMinutes()} minutes ${new Date(
      uni * 1000
    ).getSeconds()} seconds`,
  ].join("");
}

module.exports = {
  name: ["look", "link"],
  info: "Look better at fsh and see record",
  category: "fun",

  async execute(message, arguments2, fsh) {
    message.channel.send(
      "you can look at me in https://scratch.mit.edu/projects/793043905/fullscreen/"
    );
    https
      .get(
        "https://clouddata.scratch.mit.edu/logs?projectid=793043905&limit=1&offset=0",
        async (resp) => {
          let data2 = "";
          resp.on("data", async (chunk) => {
            data2 += chunk;
          });
          resp.on("end", async () => {
            let data = JSON.parse(data2);
            message.channel.send(
              `record holder is ${
                decode(data[0].value)[0]
              } with a time of ${time_gud(decode(data[0].value)[1])}`
            );
          });
        }
      )
      .on("error", async (err) => {
        message.channel.send("could not get record holder");
        console.log("Error: " + err.message);
      });
  },
};

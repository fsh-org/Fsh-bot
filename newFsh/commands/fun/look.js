const Discord = require("discord.js");
const https = require("https");

let i;

function will(alpha, code) {
  let decoded = '';
	let temp = "a";
	while (!(temp == '00')) {
		temp = code.charAt(i) + code.charAt(i + 1);
		i = i + 2
		if (!(alpha[temp - 1] == undefined)) {
			decoded = decoded + alpha[temp - 1];
		}
	};
  return decoded;
}

function decode(code) {
	let alpha = [" ", " ", " ", " ", " ", " ", " ", " ", " ", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "_"];
	i = 0;
	let output = [];
	output[0] = will(alpha, code)
	output[1] = will(alpha, code)
	return output;
}

function time_gud(time) {
	return `${Math.floor(time / 604800)} weeks ${Math.floor(time / 86400) % 7} days ${Math.floor(time / 3600) % 24} hours ${Math.floor(time / 60) % 60} minutes ${time % 60} seconds`
}

module.exports = {
	name: ["look", "link"],
	info: "Look better at fsh and see record",
	category: "fun",

	async execute(message, arguments2, fsh) {
		message.channel.send("you can look at me in https://scratch.mit.edu/projects/793043905/fullscreen/");

    let data;
    try {
      data = await fetch('https://clouddata.scratch.mit.edu/logs?projectid=793043905&limit=1&offset=0');
      data = await data.json();
    } catch (err) {
      message.channel.send("Scratch cloud servers did not respond");
      return;
    }

    message.channel.send(`record holder is ${decode(data[0].value)[0]} with a time of ${time_gud(decode(data[0].value)[1])}`)
    /*
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
						if (!data[0].value) {
							message.channel.send("there seems to be a error with scratch, could not get record");
							return;
						}
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
			});*/
	}
};
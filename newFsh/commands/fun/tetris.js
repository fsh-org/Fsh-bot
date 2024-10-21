const Discord = require("discord.js");

let games = {};
class Game {
  constructor(id, fsh, message) {
    if (games[id]?.state === 'playing') {
      this.success = false;
      message.reply('you alredy have a game running');
      return;
    } else {
      this.success = true;
    }
    this.id = id;
    this.fsh = fsh;
    games[id] = {
      state: 'playing',
      message: undefined,
      board: '0'.repeat(10*20)
    }
  }
  send(message) {
    let embed = new Discord.EmbedBuilder()
      .setTitle(`Tetris`)
      .setDescription(boardToEmoji(games[this.id].board))
      .setFooter({ text: `V${this.fsh.version}` })
      .setColor("#888888");

    message.channel.send({
      embeds: [embed]
    })
      .then(mess => {
        games[this.id].message = mess;
        this.update()
      })
  }
  update() {
    //clearInterval(this.interval);

    games[this.id].board = '0123456700'+'0'.repeat(10*20);

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Tetris`)
      .setDescription(boardToEmoji(games[this.id].board))
      .setFooter({ text: `V${this.fsh.version}` })
      .setColor("#888888");

    games[this.id].message.edit({
      embeds: [embed]
    })
  }
}

function boardToEmoji(board) {
  let colors = {
    0: '⬛',
    1: '🟥',
    2: '⬜',
    3: '🟪',
    4: '🟨',
    5: '🟩',
    6: '🟫',
    7: '🟦'
  }
  board = board
    .match(/.{1,10}/g)
    .join('\n')

  for (let i = 0; i < Object.keys(colors).length; i++) {
    board = board.replaceAll(Object.keys(colors)[i], Object.values(colors)[1])
  }
  return board
}

function randomShape() {
  return Math.ceil(Math.random()*7);
}

module.exports = {
  name: "tetris",
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) {
      message.channel.send("Sorry but this isn't a charity, come back when you will be a little more mmmm, richer");
      return;
    }
    // ------------- //
    let game = new Game(message.author.id, fsh, message);
    if (game.success) {
      game.send(message);
    }
  }
};
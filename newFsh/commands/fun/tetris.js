const Discord = require("discord.js");

const colors = {
  0: '⬛',
  1: '🟥',
  2: '🟧',
  3: '🟨',
  4: '🟩',
  5: '🟦',
  6: '🟪',
  7: '🟫'
};
const shapes = {
  o: {color:3,shape:[[0,0],[1,0],[0,1],[1,1]]},
  l: {color:2,shape:[[0,0],[0,1],[0,2],[1,2]]},
  j: {color:7,shape:[[1,0],[1,1],[1,2],[0,2]]},
  i: {color:5,shape:[[0,0],[0,1],[0,2],[0,3]]},
  z: {color:1,shape:[[0,0],[1,0],[1,1],[2,1]]},
  s: {color:4,shape:[[0,1],[1,1],[1,0],[2,0]]},
  t: {color:6,shape:[[0,0],[1,0],[2,0],[1,1]]}
};

let games = {};
class Game {
  constructor(id, fsh, message) {
    if (games[id]) {
      this.success = false;
      message.reply('you alredy have a game running');
      return;
    } else {
      this.success = true;
    }
    this.id = id;
    this.fsh = fsh;
    this.message = null;
    this.board = '0'.repeat(10*20);
    this.falling = null;
    this.interval = null;
    games[id] = true;
  }
  _embed() {
    let board = this.board
      .match(/\d{1,10}/g)
      .join('\n')
      .replaceAll(/[0-7]/g, (match)=>colors[match]);
    let embed = new Discord.EmbedBuilder()
      .setTitle(games[this.id]?'Tetris':'Tetris - Game Over')
      .setDescription(board)
      .setFooter({ text: `V${this.fsh.version}` })
      .setColor('#888888');
    return { embeds: [embed] };
  }
  death() {
    clearInterval(this.interval);
    delete games[this.id];
    this.message.edit(this._embed());
  }
  _randomShape() {
    return shapes[Object.keys(shapes)[Math.floor(Math.random()*Object.keys(shapes).length)]];
  }
  _mergeBoard(piece, add=false) {
    let _this = this;
    let newb = this.board.split('');
    for (let i = 0; i<piece.shape.length; i++) {
      let idx = piece.shape[i][0]+piece.shape[i][1]*10;
      if (newb[idx]!==0||piece.shape[i][1]>=20) {
        if (add) {
          _this.death();
        } else {
          _this.falling = null;
        }
        return;
      }
    }
    piece.shape.forEach(p=>{
      newb[p[0]+p[1]*10] = piece.color;
    });
    this.board = newb.join('');
  }
  _removeBoard(piece) {
    let newb = this.board.split('');
    piece.shape.forEach(p=>{
      newb[p[0]+p[1]*10] = 0;
    });
    this.board = newb.join('');
  }
  _gravity(piece) {
    return piece.shape.map(p=>[p[0], p[1]+1]);
  }
  send(message) {
    let _this = this;
    message.channel.send(this._embed())
      .then(mess => {
        _this.message = mess;
        _this.update();
        _this.interval = setInterval(()=>{
          _this.update();
        }, 2 * 1000);
      });
  }
  update() {
    if (this.falling) {
      this._removeBoard(this.falling);
      this.falling = this._gravity(this.falling);
      this._mergeBoard(this.falling);
    } else {
      this.falling = this._randomShape();
      this._mergeBoard(this.falling, true);
    }
    console.log(this.message);
    this.message.edit(this._embed());
  }
}

module.exports = {
  name: "tetris",
  info: "Info on command",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    // temp dev only //
    if (!fsh.devIds.includes(message.author.id)) {
      message.channel.send("I'm sorry. I can't give credit. Come back when you're a little, MMMM, richer!");
      return;
    }
    // ------------- //
    let game = new Game(message.author.id, fsh, message);
    if (game.success) {
      game.send(message);
    }
  }
};
const version = "1.0.0 beta";

/* -- Imports -- */
const Discord = require("discord.js");
const logs = require("discord-logs");

const Database = require("easy-json-database");
const fs = require("fs");

const path = require("path");
const events = require("events");
const { exec } = require("child_process");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* -- On poopoo display error -- */
let process = require("process");

process.on("uncaughtException", function (err) {
  console.log("Error!");
  if (Array.isArray(err)) {
    for (let i in err) {
      console.log(err[i]);
    }
  } else {
    console.log(err);
  }
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

/*   -- THE MAGIC FUNCTION --
  ~~ Re-aquire function *require* ~~
*/
function reaquire(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

/* -- Make fsh -- */
let fsh = {
  Discord,
  version,
  reaquire
};

const MusicLogic = require('./music-logic.js');
fsh.music = new MusicLogic(fsh);

/* -- Make client -- */
fsh.client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.Reaction,
  ],
});

/* -- Dev ids */
fsh.devIds = [
  "1068572316986003466", // Fsh
  "816691475844694047", // Inv
  "712342308565024818", // Frost
  "1098211925495664751", // Inv alt
];

/* -- Save dbs on fsh -- */
// User data
fsh.user_fsh = new Database("./databases/user_fsh.json");
fsh.user_inventory = new Database("./databases/user_inventory.json");
fsh.user_badges = new Database("./databases/user_badges.json");
fsh.bank_fsh = new Database("./databases/bank_fsh.json");
fsh.bank_limit = new Database("./databases/bank_limit.json");
// Server data
fsh.server_config = new Database("./databases/server_config.json");
// Other
fsh.cooldown = new Database("./databases/cooldown.json");
fsh.coupon = new Database("./databases/coupon.json");
fsh.emojis = new Database("./databases/emojis.json").data;

/* -- Make function to get all .js files in a directory -- */
const getAllJsFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllJsFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith(".js")) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
};

function refresh(directory, collection) {
  fsh.ws_api = reaquire('./ws-api.js')
  fsh.z_music = reaquire('./z-music')
  fsh.playSong = reaquire('./z-music/playSong.js')
  
  fsh.client[collection] = new Discord.Collection();
  const commandsPath = path.join(__dirname, directory);
  const commandFiles = getAllJsFiles(commandsPath);
  
  for (const file of commandFiles) {
    const command = reaquire(file);
    if ("execute" in command) {
      if (Array.isArray(command.name)) {
        command.name.forEach((name) => {
          fsh.client[collection].set(name, command);
        });
      } else {
        fsh.client[collection].set(command.name, command);
      }
    } else {
      console.log(`[1;33m[WARNING] The command at ${file} is missing a required "execute" property.[0m`);
    }
  }
}

/* -- Save for later use -- */
let resFunc = { res: refresh };
resFunc.res("commands", "textcommands");
resFunc.res("interactions", "interactions");
resFunc.res("context", "contextmenu");
fsh.TxtCmdsFiles = getAllJsFiles(path.join(__dirname, "commands"), []);

/* -- Event manager -- */
/* ~ Get events ~ */
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));
/* Run events */
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = reaquire(filePath);
  if (event.once) {
    fsh.client.once(event.name, (...args) => event.execute(fsh, ...args));
  } else {
    if (event.name == Discord.Events.MessageCreate) {
      fsh.client.on(event.name, (...args) =>
        event.execute(fsh, resFunc, ...args)
      );
    } else {
      fsh.client.on(event.name, (...args) => event.execute(fsh, ...args));
    }
  }
}

/* -- Login -- */
fsh.client.login(process.env["token"]);

fsh.qplay = function(message, filelocal){
	const {
			createAudioPlayer,
			createAudioResource,
			StreamType,
			demuxProbe,
			joinVoiceChannel,
			NoSubscriberBehavior,
			AudioPlayerStatus,
			VoiceConnectionStatus,
			getVoiceConnection
	} = require('@discordjs/voice');
	let player = createAudioPlayer()

	let connection = joinVoiceChannel({
	 channelId: message.member.voice.channel.id,
		guildId: message.guild.id,
		adapterCreator: message.guild.voiceAdapterCreator,
		selfDeaf: true
	})

	 connection.subscribe(player)

	let resource = createAudioResource(`./${filelocal}.mp3`)
	player.play(resource)

	player.on(AudioPlayerStatus.Idle, async () => {
	connection.destroy()
	})
}
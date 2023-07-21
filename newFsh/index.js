const version = "0.5.0";

/* -- Imports -- */
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

const events = require("events");
const { exec } = require("child_process");
const logs = require("discord-logs");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Database = require("easy-json-database");

const ms = require("ms");
const Captcha = require("@haileybot/captcha-generator");
const jimp = require("jimp");
const S4D_APP_PKG_axios = require("axios");
const S4D_APP_REDDIT_musakui = require("musakui");
let moment = require("moment");
let URL = require("url");
let DIG = require("discord-image-generation");
let https = require("https");

const SnakeGame = require("snakecord");
const { TicTacToe } = require("discord-gamecord");

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
};

/* -- Make client -- */
fsh.client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences,
  ],
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.Reaction,
  ],
});

/* -- Dev ids */
fsh.devIds = [
  "816691475844694047",
  "712342308565024818",
  "1098211925495664751",
];

/* -- Save dbs on fsh -- */
fsh.user_fsh = new Database("./databases/user_fsh.json");
fsh.user_inventory = new Database("./databases/user_inventory.json");
fsh.user_badges = new Database("./databases/user_badges.json");
fsh.bank_fsh = new Database("./databases/bank_fsh.json");
fsh.server_config = new Database("./databases/server_config.json");
fsh.server_polls = new Database("./databases/server_polls.json");
fsh.cooldown = new Database("./databases/cooldown.json");
fsh.emojis = new Database("./databases/emojis.json").data;
/* -- Depracated dbs -- */
fsh.fsh_count = new Database("./databases/fsh_count.json");

/* -- Make function to get all .js files in a directory -- */
const getAllJsFiles = function (dirPath, arrayOfFiles) {
  //console.log(dirPath)
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllJsFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith(".js"))
        arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

/* -- Get text comamnds -- */
/*function refreshText() {
  fsh.client.textcommands = new Collection();
  const commandsPath = path.join('commands');
	const commandFiles = getAllJsFiles(commandsPath)

	for (const file of commandFiles) {
		const command = reaquire(file);
		if ('execute' in command) {
			fsh.client.textcommands.set(command.name, command);
		} else {
			console.log(`[WARNING] The command at ${file} is missing a required "execute" property.`);
		}
	}
}

function refreshInteractions() {
  fsh.client.interactions = new Collection();
  const commandsPath = path.join('interactions');
	const commandFiles = getAllJsFiles(commandsPath)

	for (const file of commandFiles) {
		const command = reaquire(file);
		if ('execute' in command) {
			fsh.client.interactions.set(command.name, command);
		} else {
			console.log(`[WARNING] The command at ${file} is missing a required "execute" property.`);
		}
	}
}*/

function refresh(directory, collection) {
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
      console.log(
        `[WARNING] The command at ${file} is missing a required "execute" property.`
      );
    }
  }
}

/* -- Save for later use -- */
let resFunc = { res: refresh };
resFunc.res("commands", "textcommands");
resFunc.res("interactions", "interactions");

resFunc.res("context", "contextmenu");

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

/* 
❌✅

 - intents -
✅ Guilds
Guildmessages
Channels
✅ Roles
✅ MessageContent
✅ GuildPresences
✅ GuildMembers

 - Partials -
User
✅ Message
✅ Channel
✅ Reaction
GuildScheduledEvent
ThreadMember
*/

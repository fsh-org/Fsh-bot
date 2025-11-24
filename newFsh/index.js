const version = '1.0.0 beta';

/* -- Imports -- */
const Discord = require('discord.js');

const fs = require('node:fs');
const Database = require('easy-json-database');
const DB = require('fshdb');

const path = require('path');
const usrbg = require('usrbg');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* -- On poopoo display error -- */
let process = require('process');

process.on('uncaughtException', function (err) {
  console.log('Error!');
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
// Dev ids
fsh.devIds = [
  '1068572316986003466', // Fsh
  '816691475844694047', // Inv
  '712342308565024818' // Frost
];

/* -- Make client -- */
fsh.client = new Discord.Client({
  makeCache: Discord.Options.cacheWithLimits({
    ...Discord.Options.DefaultMakeCacheSettings,
    MessageManager: 100
  }),
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

/* -- Music -- */
const createMusic = require('./music.js');
createMusic(fsh);

/* -- USRBG -- */
let USRBGinstance = new usrbg();
(async()=>{
  await USRBGinstance.load()
  fsh.usrbg = USRBGinstance;
})()

/* -- Save dbs on fsh -- */
// User data
fsh.user_fsh = new Database('./databases/user_fsh.json');
fsh.user_inventory = new Database('./databases/user_inventory.json');
fsh.user_badges = new Database('./databases/user_badges.json');
fsh.bank_fsh = new Database('./databases/bank_fsh.json');
fsh.bank_limit = new Database('./databases/bank_limit.json');
fsh.cooldown = new Database('./databases/cooldown.json');
// Server data
fsh.server_config = new Database('./databases/server_config.json');
// Other
fsh.items = new Database('./databases/items.json');
fsh.badges = new DB('./databases/badges.json');
fsh.coupon = new Database('./databases/coupon.json');
fsh.emojis = new Database('./databases/emojis.json').data;

// Trnaslations
fsh.lang = {};
fsh.lang.available = ['es-ES'];
fsh.lang.en = new DB('./databases/lang/en.json');
fsh.lang.es_es = new DB('./databases/lang/es_es.json');

/* -- Make function to get all .js files in a directory -- */
const getAllJsFiles = function (dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllJsFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.js')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });
  return arrayOfFiles;
};

function refresh(directory, collection) {
  fsh.ws_api = reaquire('./ws-api.js')

  fsh.client[collection] = new Discord.Collection();
  const commandsPath = path.join(__dirname, directory);
  const commandFiles = getAllJsFiles(commandsPath);

  for (const file of commandFiles) {
    const command = reaquire(file);
    if ('execute' in command) {
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
resFunc.res('commands', 'textcommands');
resFunc.res('interactions', 'interactions');
resFunc.res('context', 'contextmenu');
fsh.TxtCmdsFiles = getAllJsFiles(path.join(__dirname, 'commands'), []);

/* Register slash commands */
fsh.getLocale = function(interaction){return fsh.lang[fsh.lang.available.includes(interaction.locale) ? interaction.locale.toLowerCase().replace('-','_') : 'en']};
fsh.getInnerLocale = function(interaction){return fsh.getLocale(interaction).get('commands.'+interaction.commandName+'.inner')};
// Should only be used when new commands or translations are added since there is a limit per day
//let RegisterSlash = require('./slash.js');
//RegisterSlash(fsh)

/* -- Event manager -- */
/* ~ Get events ~ */
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));
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
fsh.client.login(process.env['token']);
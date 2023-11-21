/* This is a easter egg
don't ruin the fun by looking at what it does in code
just use the file name as a hint
*/

const Discord = require("discord.js");

module.exports = {
  name: "pokemon",
  category: "hidden",

  async execute(message, arguments2, fsh) {
    if (message.author.id == "694587798598058004") {
      message.reply("No creeps pls")
      return;
    }
    message.author.send(
      `Hey guys, did you know that in terms of male human and female Pokémon breeding, Vaporeon is the most compatible Pokémon for humans? Not only are they in the field egg group, which is mostly comprised of mammals, Vaporeon are an average of 3"03' tall and 63.9 pounds. this means they're large enough to be able to handle human ####, and with their impressive Base stats for HP and access to Acid Armor, you can be rough with one. Due to their mostly water based biology, there's no doubt in my mind that an aroused Vaporeon would be incredibly wet, so wet that you could easily have ### with one for hours without getting sore. They can also learn the moves Attract, Baby-Doll eyes, Captivate, Charm and Tail Whip along with not having fur to hide nipples, so it'd be incredibly easy for one to get you in the mood. With their abilities Water Absorb and Hydration, they can easily recover from fatigue with enough water. No other Pokémon comes close with this level of compatibility. Also, fun fact, if you pull out enough, you can make your Vaporeon turn white. Vaporeon is literally built for human ####. Ungodly defense stat + high HP pool + Acid Armor means it can take #### all day, all shapes and sizes and still come for more.`
    );
  },
};

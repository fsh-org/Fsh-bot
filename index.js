/*          🐟 ~~ FSH BOT ~~ 🐟
    - By Frostzzone 🧊 & Inventionpro 🐱 -
*/

/* -- App Settings -- */
// note to anyone that is going to use this: mantinence and old fsh are depracated and will not be upfated
const mantinence = false; // requires d.js v13.6.0 (active or not)
const newfsh = true; // requires d.js v14.11.0 (if mantinence not active)

/* -- Start code -- */
const fs = require("fs");
console.clear();
console.log(fs.readFileSync("text/start.txt", "utf8"));
console.log(`[1;34mDiscord.js[0m: ${require("discord.js").version}`);

if (mantinence) {
  console.log("[1;30mRunning in mantinence mode[0m");
  if (
    !require("./package.json").dependencies["discord.js"].startsWith("^13.16")
  ) {
    throw new Error("[1;31mMantinence mode requires d.js@13.16.0[0m");
  } else {
    require("./code/mantinence.js");
  }
} else {
  if (newfsh) {
    if (
      !require("./package.json").dependencies["discord.js"].startsWith("^14.11")
    ) {
      throw new Error("[1;31mNew mode requires d.js@14.11.0[0m");
    } else {
      require("./newFsh/index.js");
    }
  } else {
    if (
      !require("./package.json").dependencies["discord.js"].startsWith("^13.16")
    ) {
      throw new Error("[1;31mOld mode requires d.js@13.16.0[0m");
    } else {
      require("./code/index.js");
    }
  }
} /*

/* -- Cursor rest area -- */ /*

    | Cafe ☕ |          |animal thing|
  __|__ 5$ ___|__       _|____________|_
  | [☕]  [☕]  |      |            [🐈|
  | [☕]  [🍵]  |      |            [🐕|
  | [🍵]  [🍵]  |      |            [🐟|
  |            🚪      🚪           [🐢|
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

*/ /* -- Cursor Park -- */ /*

🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
🌳                                                      🌳
🌳     🐝           🦝                 🌲               🌳
🌳                                                      🌳
🌳              🦋                🦩         🐕         🌳
🌳                                                      🌳
🌳      🐐            🌲                     🐧         🌳
🌳                                                      🌳
🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳

*/ /* -- Chat Box (very reel) -- */ /*

 Froz
 - 👍👍
 Inv
 - ok
 - we are putting to much work on the chat box xd
 Froz
 - its funni
 - imagine this is an easter egg :trol:
 Inv
 - well now that code is public only thoose who look thought it will see so yes easter egg
 - how you do emojis??
 Froz
 - windows key + period
 Inv -
 .......,ehhh no worki
 Froz
 - really?
 Inv
 - yes, is it like windows 10+?
 Froz
 - idk, maybe
 
*/

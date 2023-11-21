/*          🐟 ~~ FSH BOT ~~ 🐟
    - By Frostzzone 🧊 & Inventionpro 🐱 -
*/

/* -- Start code -- */
const fs = require("fs");
console.clear();
console.log(fs.readFileSync("text/start.txt", "utf8"));
console.log(`[1;34mDiscord.js[0m: ${require("discord.js").version}`);

if (!require("./package.json").dependencies["discord.js"].startsWith("^14"))
  return new Error("␛[1;31mBot requires d.js@14.13.0␛[0m");
require("./newFsh/index.js");

/*
          -- Cursor rest area --

    | Cafe ☕ |          |animal thing|
  __|__ 5$ ___|__       _|____________|_
  | [☕]  [☕]  |      |__|         [🐈|
  | [☕]  [🍵]  |      |            [🐕|
  | [🍵]  [🍵]  |      |            [🐟|
  |            🚪      🚪           [🐢|
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾       ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                  -- Cursor Park --

🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳
🌳                                                      🌳
🌳     🐝           🦝                 🌲               🌳
🌳                                                      🌳
🌳              🦋                🦩         🐕         🌳
🌳                                                      🌳
🌳      🐐            🌲                     🐧         🌳
🌳                                                      🌳
🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳🌳

          -- Chat Box (very reel) --

 Froz
 - 👍👍
 Inv
 - ok
 - we are putting to much work on the chat box xd
 Froz
 - its funni
 - imagine this is an easter egg :trol:
 Inv
 - well now that code is public only thoose who look throught it will see so yes easter egg
 Froz
 - do we actually need all these packages
 Inv
 - not all of them
 Froz
 - do i `prune` them
 Inv
 - what that do
 Froz
 - remove unused packages
 Inv
 - well yes
 Froz
 - all current packages are used by some files
 Inv
 - oh , unused packages are used in old s4d file
 Froz
 - ye
 Inv
 - do we make old file a txt so it doesn't count?
 Froz
 - that or i can do a thing
 Inv
 - what thing
 Froz
 - ye sure make it .txt
 Inv
 - Done
*/
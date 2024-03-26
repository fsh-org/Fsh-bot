import { DiscordSDK } from "@discord/embedded-app-sdk";

window.addEventListener('load', function(){
  Array.from(document.querySelectorAll('a[href]')).forEach(e => {
    e.href = e.href+location.search;
  })
})
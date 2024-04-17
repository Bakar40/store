const { AoiClient, Command } = require("aoi.js");

const client = new AoiClient({
    token: process.env.antika,
    prefix: "+",
    intents: ["MessageContent", "Guilds", "GuildMessages"],
    events: ["onMessage", "onInteractionCreate"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here"
    }
});
 client.variables({

    money: 0,
   user:"",
   userID:"",
   

  }, "main");

client.status({
  name: "🐱‍🏍 | SooN",
  type: "PLAYING",
  status: "dnd",
  time: 12,
});

client.command({
  name: "panel",
  code: `
   $title[Bot Control Panel]
   $description[Click the button below to manage the bot]
   $image[https://media.discordapp.net/attachments/1218222759146950726/1229912802643148943/store.png?ex=6631688e&is=661ef38e&hm=ec11a77325fe87d439a924fabdb080e22608c87c42829fb969bb7a032f6d2f5c&=&format=webp&quality=lossless&width=192&height=192]
    $addButton[1;Daily;primary;daily;false;🎯]
$addButton[1;Work;primary;work;false;🏢]
$addButton[2;Balance;primary;check;false;💰]
$addButton[1;Ping;primary;ping;false;🏓]
$addButton[1;Pay;primary;pay;false;💲]

  `
});



client.interactionCommand({
    name: "daily",
    prototype: "button",
    code: `
  $interactionReply[$setGlobalUserVar[money;$sum[$getGlobalUserVar[money;$authorID];$random[500;5000]]]
      > 💸 | <@$authorID> , You have claimed daily and u get \`$random[500;5000]$\`;;;;everyone;false;false]

$interactionReply[$globalCooldown[24h;> | ⌚ | <@$authorID> , You are on cooldown, please wait **%time%** to claim your daily again];;;;everyone;false;false]

  `
});

client.interactionCommand({
    name: "work",
    prototype: "button",
    code: `


  $interactionReply[     $setGlobalUserVar[money;$sum[$getGlobalUserVar[money;$authorID];$random[1;100]]]
      > 💸 |  <@$authorID> , You have worked as a $randomText[doctor;teacher;police;developer;youtuber;mechanic;chef;nurse;actor;pilot;firefighter;pilot] and u get \`\$random[1;100]\`\ $
      $globalCooldown[1m;> | ⌚ | <@$authorID> , You are on cooldown, please wait **%time%** to work again]
;;;;everyone;false;false]
  `
});

client.interactionCommand({
    name: "check",
    prototype: "button",
    code: `

  $interactionReply[> 💰 | <@$authorID> , you have \`\$$numberSeparator[$getGlobalUserVar[money;$authorID;main];,]$\`\
;;;;everyone;false;false]

  `
});

client.interactionCommand({
    name: "ping",
    prototype: "button",
    code: `
$interactionReply[> 🏓 | Pong! $ping ms ,  <@$authorID>;;;;everyone;false;false]
`
});
//
client.interactionCommand({
  name: "pay",
  prototype: "button",
  code: `
      $interactionReply[> 🔎 | <@$authorID>, please mention a user/userID to pay!;;;;everyone;false;false]
$awaitMessages[$channelID;$authorID;15s;everything;1;> ⌚ | <@$authorID>, you are too late, try again!]
    
  `
});

client.awaitedCommand({
  name: "1",
  code: `
    $awaitMessages[$channelID;$authorID;15s;everything;2;> ⌚ | <@$authorID>, you are too late, try again!]
    > 🔎 | <@$authorID>, please specify the amount of money you want to pay to $username[$findUser[$message]]!
    $setUserVar[user;$findUser[$message]]
    $setUserVar[userID;$findUser[$message]]
  `
});

client.awaitedCommand({
  name: "2",
  code: `
    
    > 💸 | <@$authorID>, You have paid \`$numberSeparator[$message[1];,]\`$ to <@$getUserVar[user;$authorID]>
    

  
  `
});


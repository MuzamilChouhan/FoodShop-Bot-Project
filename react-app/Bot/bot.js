const { Telegraf } = require("telegraf");
const TOKEN = "7808875017:AAELCSZiBzTOGJ8tHDz49zHKcXPMAIxbJBY";
const bot = new Telegraf(TOKEN);

const web_link = "https://serene-biscochitos-84f6e8.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "FOOD BOT BY MUZAMIL", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();

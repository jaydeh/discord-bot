const dotenv = require("dotenv");
const {Client, GatewayIntentBits,TextChannel } = require("discord.js");
const cron = require('node-cron');

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent],
    partials: ['CHANNEL', 
        'MESSAGE', 
        'REACTION']
});

client.on("ready", c => {
    console.log(`Bot is ready with login ${c.user.tag}`)
    var channelId = process.env.CHANNEL_ID;
    cron.schedule('10 9 * * *', () => {
        client.channels.fetch(channelId).then( channel => channel.send(`<@&${role_id}> Mga putang ina mag sign in na sa https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311&hyl_auth_required=true&hyl_presentation_style=fullscreen&utm_source=hoyolab&utm_medium=tools&utm_campaign=checkin`));
    })
});

client.on("messageCreate", (msg) =>{
    // if (msg.author.bot) return;
    var role_id = process.env.ROLE_ID;
    if (msg.content === 'hello there'){
        msg.reply(`tagging <@&${role_id}> test`);
    }
    
    if (msg.content === "testing api"){
        msg.reply("Still working");
    }
})

client.login(token);
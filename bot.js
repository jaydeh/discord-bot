const dotenv = require("dotenv");
const {Client, GatewayIntentBits,Collection,Events,  ButtonStyle, ButtonBuilder, ActionRowBuilder} = require("discord.js");
const cron = require('node-cron');
const fs = require('node:fs');
const path = require('node:path');

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const channelId = process.env.CHANNEL_ID;
const role_id = process.env.ROLE_ID;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent],
    partials: ['CHANNEL', 
        'MESSAGE', 
        'REACTION']
});
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}



client.on("ready", c => {

    console.log(`Bot is ready with login ${c.user.tag}`)

    // Send 9AM Sign in Link

    // Initiate Button
    const signInButton = new ButtonBuilder()
        .setLabel('Sign In')
        .setURL('https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?' +
        'act_id=e202303301540311&hyl_auth_required=true' +
        '&hyl_presentation_style=fullscreen&utm_source=hoyolab' +
        '&utm_medium=tools&utm_campaign=checkin')
        .setStyle(ButtonStyle.Link);

    const row = new ActionRowBuilder()
        .addComponents(signInButton);

    cron.schedule('0 9 * * *', () => {
        client.channels.fetch(channelId).then( channel => channel
            .send({
                content:`<@&${role_id}> Mga putang ina mag sign in na sa button` ,
                components: [row]
            })
        )     
    })
});

client.on('interactionCreate', async interaction => {
     if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

})

client.on("messageCreate", (msg) =>{
    var message = msg.content;
    // if (msg.author.bot) return;
    var flag = false;
    switch( message.toLowerCase()){
        case "hello there":
            msg.reply(`wsg ${msg.author.username}`);
            break;
        
        case "test":
            msg.channel.send("Still alive");
            break;

        case "kael":
            msg.channel.send("Do you mean Venomancer?")
            break;

        case "vtuber fan":
            msg.channel.send("PAGING <@222333641458581504>");
        default:
            return;
    }
    
    if(message.toLowerCase() == "test button"){

        const closeTicketButton = new ButtonBuilder()
        .setLabel('Click Me')
        .setURL('https://discord.js.org')
        .setStyle(ButtonStyle.Link)
       

        const row = new ActionRowBuilder()
			.addComponents(closeTicketButton);

        msg.channel.send({content: 'testing message', components: [row]})
    }
    // if( message.toLowerCase().includes("vtuber fan") 
    //     && !message.toLowerCase().includes("fanatic")) {
    //         msgSend(msg,)
    //     //     for( let ctr = 0; ctr < 10; ctr++ ){  
    //     //     msg.channel.send("hello #1 vtuber fanatic and racist " +
    //     //      "<@222333641458581504>").then(() => {               
    //     //         if (ctr === 9) 
    //     //         {
    //     //             flag = true;
    //     //             return;
    //     //         };
    //     //      })          
    //     //     console.log("counter is "+ctr + " flag is" + flag);
    //     // }


    
})


client.login(token);



function msgSend(msg, string){
    return msg.channel.send(string);
}
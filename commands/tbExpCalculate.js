const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
// const commandsPath = path.join(__dirname, 'resources/exp_table.json');
let rawXpTable = fs.readFileSync('./resources/xp_table.json');
let xpTable = JSON.parse(rawXpTable);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tbexpcalculate')
        .setDescription('Calculate Needed EXP for Trailblazer Level')
        .addIntegerOption(option =>
            option.setName('current_level')
                .setDescription('Current Level')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('goal_level')
                .setDescription('Goal Level')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('current_xp')
                .setDescription('Current XP')
                .setRequired(true)),
    async execute(interaction) {
        let currentLevel = interaction.options.getInteger('current_level');
        let goalLevel = interaction.options.getInteger('goal_level');
        let currentXP = interaction.options.getString('current_xp');
        if ((currentLevel < 1 || currentLevel > 65) || (goalLevel < 1 || goalLevel > 65)) {
            await interaction.reply("I only have 1-65 Data so fuck you")
        }
        let cXPTemp = xpTable.find(x => x['Trailblaze Level'] == currentLevel).Total;
        let gXP = xpTable.find(x => x['Trailblaze Level'] == goalLevel).Total;
        let cXP = cXPTemp + currentXP;
        if(cXP > gXP ){
            await interaction.reply("Bobo ka ba magbilang sobra na")
        }
        else{
            let i = cXP/60;
            await interaction.reply(`
            You need ${gXP - cXP} experience
            Need ${Math.ceil((gXP - cXP)/60)} fuels

            current level is ${currentLevel}
            goal level is ${goalLevel}
            current exp is ${currentXP}

            total exp is ${cXP}
            `)
        }
    }
};

// function getEXP(i) {
//     switch (i) {
//         case 1:
//             return;
//         case 2:
//             return;
//         case 3:
//             return;
//         case 4:
//             return;
//         case 5:
//             return;
//         case 6:
//             return;
//         case 7:
//             return;
//         case 8:
//             return;
//         case 9:
//             return;
//         case 10:
//             return;
//         case 11:
//             return;
//         case 12:
//             return;
//         case 13:
//             return;
//         case 14:
//             return;
//         case 15:
//             return;
//         case 16:
//             return;
//         case 17:
//             return;
//         case 18:
//             return;
//         case 19:
//             return;
//         case 20:
//             return;
//         case 21:
//             return;
//         case 22:
//             return;
//         case 23:
//             return;
//         case 24:
//             return;
//         case 25:
//             return;
//         case 26:
//             return;
//         case 27:
//             return;
//         case 28:
//             return;
//         case 29:
//             return;
//         case 30:
//             return;
//         case 31:
//             return;
//         case 32:
//             return;
//         case 33:
//             return;
//         case 34:
//             return;
//         case 35:
//             return;
//         case 36:
//             return;
//         case 37:
//             return;
//         case 38:
//             return;
//         case 39:
//             return;
//         case 40:
//             return;
//         case 41:
//             return;
//         case 42:
//             return;
//         case 43:
//             return;
//         case 44:
//             return;
//         case 45:
//             return;
//         case 46:
//             return;
//         case 47:
//             return;
//         case 48:
//             return;
//         case 49:
//             return;
//         case 50:
//             return;
//         case 51:
//             return;
//         case 52:
//             return;
//         case 53:
//             return;
//         case 54:
//             return;
//         case 55:
//             return;
//         case 56:
//             return;
//         case 57:
//             return;
//         case 58:
//             return;
//         case 59:
//             return;
//         case 60:
//             return;
//         case 61:
//             return;
//         case 62:
//             return;
//         case 63:
//             return;
//         case 64:
//             return;
//         case 65:
//             return;
//         case 66:
//             return;
//         case 67:
//             return;
//         case 68:
//             return;
//         case 69:
//             return;
//         default:
//             return 0;

//   }
// }
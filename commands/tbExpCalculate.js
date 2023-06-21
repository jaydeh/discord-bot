const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
let rawXpTable = fs.readFileSync('./resources/xp_table.json');
let xpTable = JSON.parse(rawXpTable);
const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tbexpcalculate')
        .setDescription('Calculate Needed EXP for Trailblazer Level')
        .addIntegerOption(option =>
            option.setName('current_level')
                .setDescription('Current Level')
                .setRequired(true)
                .setMaxValue(70)
                .setMinValue(1))
        .addIntegerOption(option =>
            option.setName('goal_level')
                .setDescription('Goal Level')
                .setMaxValue(70)
                .setMinValue(1)
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('current_xp')
                .setDescription('Current XP')
                .setMinValue(0)
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('stellar_jade_refill')
                .setDescription('Are you whaling?')
                .setMaxValue(8)
                .setMinValue(0)
                .setRequired(true)),
    async execute(interaction) {
        let currentLevel = interaction.options.getInteger('current_level');
        let goalLevel = interaction.options.getInteger('goal_level');
        let currentXP = interaction.options.getInteger('current_xp');
        // if ((currentLevel < 1 || currentLevel > 65) || (goalLevel < 1 || goalLevel > 65)) {
        //     await interaction.reply("I only have 1-65 Data so fuck you")
        // }
        let cXPTemp = xpTable.find(x => x['Trailblaze Level'] == currentLevel).Total;
        let gXP = xpTable.find(x => x['Trailblaze Level'] == goalLevel).Total;
        let cXP = cXPTemp + currentXP;
        if (cXP > gXP || cXPTemp > gXP) {
            await interaction.reply("Bobo ka ba magbilang sobra na")
        }
        else {
            let i = cXP / 300;
            await interaction.reply(`
            You need ${gXP - cXP} experience
            Need ${Math.ceil((gXP - cXP) / 300)} fuels

            current level is ${currentLevel}
            goal level is ${goalLevel}
            current exp is ${currentXP}

            total exp is ${cXP}
            `)
        }
    }
};

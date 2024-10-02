const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roulette')
        .setDescription('Play the Russian Roulette game.'),
    async execute(interaction) {
        await interaction.reply(RussianRoulette());

        function RussianRoulette() {
            let result = [];
            let bullet = Math.floor(Math.random() * 6);
            let chamber = Math.floor(Math.random() * 6);

            if (bullet === chamber) {
                return "You died!";
            } else {
                return "You survived!";
            }
        }
    },
};
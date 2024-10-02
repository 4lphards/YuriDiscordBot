const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gacha')
        .setDescription('Play the Frieren gacha game.')
        .addStringOption(option => option
            .setName('number')
            .setDescription('The number of times you want to play the gacha game.')),
    async execute(interaction) {
        await interaction.reply(Gacha(interaction.options.getString('number')));

        function Gacha(times) {
            let result = [];
            
            if (times > 10) {
                return "You can't roll more than 10!";
            }
        
            for (let i = 0; i < times; i++) {
                let RarityNumber = Math.random();
        
                if (RarityNumber <= 0.0007) {
                    result.push('**Legendary** with rarity number: ' + RarityNumber);
                } else if (RarityNumber <= 0.003) {
                    result.push('**Mythic** with rarity number: ' + RarityNumber);
                } else if (RarityNumber <= 0.006) {
                    result.push('**Unique** with rarity number: ' + RarityNumber);
                } else if (RarityNumber <= 0.02) {
                    result.push('**Super Rare** with rarity number: ' + RarityNumber);
                } else if (RarityNumber <= 0.08) {
                    result.push('**Rare** with rarity number: ' + RarityNumber);
                } else if (RarityNumber <= 0.4) {
                    result.push('**Uncommon** with rarity number: ' + RarityNumber);
                } else {
                    result.push('**Common** with rarity number: ' + RarityNumber);
                }
            }
        
            // get the user id and tag
            const userid = interaction.user.id;
            const userTag = `<@${userid}>`;

            return `${userTag} rolled **${times}** times and got: \n ${result.join(' \n ')}`;
        }
    },
};


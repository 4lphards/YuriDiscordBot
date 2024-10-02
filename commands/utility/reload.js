const { SlashCommandBuilder, AutocompleteInteraction } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setAutocomplete(true)
                .setRequired(true)),
    async autocomplete(interaction) {
        // get all commands
        const commands = interaction.client.commands;

        // get the focused value
        const focusedValue = interaction.options.getFocused();

        // filter the commands based on the focused value
        const filteredCommands = commands.filter(command => command.data.name.startsWith(focusedValue));

        // respond with the filtered commands
        await interaction.respond(filteredCommands.map(command => ({ name: command.data.name, value: command.data.name })));

    },
    async execute(interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

        const baseDir = path.join(__dirname, '..');
        const subdirectories = [
            'utility',
            'games'
        ];

        let commandPath;
        for (const subdir of subdirectories) {
            const potentialPath = path.resolve(baseDir, subdir, `${command.data.name}.js`);
            if (fs.existsSync(potentialPath)) {
                commandPath = potentialPath;
                break;
            }
        }

        if (!commandPath) {
            return interaction.reply(`The command file \`${command.data.name}.js\` does not exist in any of the specified directories!`);
        }

        delete require.cache[require.resolve(commandPath)];

        try {
            // Reload the command
            const newCommand = require(commandPath);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
    }
};
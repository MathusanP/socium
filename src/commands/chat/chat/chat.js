const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')

module.exports = {
    name: 'chat',
    description: 'Talk with the bot!',
    usage: '',

    permissions: [],
    ownerOnly: false,
    guildOnly: true,

    data: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Chat with the bot!")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("chat")
                .setDescription("Chat with the bot!")
                .addStringOption((option) => option.setName("input").setDescription("What do you want to say to the bot?").setRequired(true))
        ),
    error: false,
    execute: async ({ interaction }) => {
        let msg = interaction.options.getString("input")

        require('dotenv').config();
        
        let url = process.env['url']
        
        let uid = interaction.member.id
        try {
            await axios.get(url)
                .then(res => {
                    let data = res.data;
                    let reply = data.cnt

                    if (reply) {
                        interaction.followUp(reply);
                    } else if (!reply) {
                        interaction.followUp("Hmmm, I don't know how to respond to that...",);
                    }
                })
        }
        catch (error) {
            console.log(error)
        }

    }
}

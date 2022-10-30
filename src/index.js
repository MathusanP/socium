const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildWebhooks],
});

const fs = require('fs');
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`${__dirname}/events/${file}`);

	if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
	else client.on(event.name, (...args) => event.execute(...args, client));
}
/*
require('dotenv').config();
client.login(process.env['Token']);
*/

client.login('MTAzNTk2NDQ3OTI0ODI4MTcyMw.G7glUI.sc4F5FNO1bnQDz35RAC8Lbg6Hl0JgdnLMueMZ4')
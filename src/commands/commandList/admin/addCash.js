/*
 * Add Cash Command
 * Admin Only
 */

const config = require('../../../../data/config.json');

module.exports = {
    name: 'addcash',
    aliases: [],
    category: 'admin',

    async execute(client, msg, args) {
        try {

            // Chỉ owner trong config được dùng
            if (msg.author.id !== config.owner) {
                return;
            }

            const user = msg.mentions.users.first();
            const amount = parseInt(args[1]);

            if (!user || isNaN(amount)) {
                return client.createMessage(msg.channel.id,
                    'Usage: uaddcash @user amount'
                );
            }

            // Nếu bot có hệ thống tiền sẵn (cowoncy)
            // Thường OwO dùng database nội bộ → gọi theo kiểu này:
            await client.db.addCowoncy(user.id, amount);

            return client.createMessage(msg.channel.id,
                `✅ Added **${amount}** cowoncy to ${user.username}`
            );

        } catch (err) {
            console.error(err);
        }
    }
};
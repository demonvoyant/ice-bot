const {
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const db = require(`${require(`${process.cwd()}/config.json`).custom_db ? `${process.cwd()}/modules/db.js` : `quick.db`}`);
const {
    default_prefix,
    ownerid
} = require("../../config.json");
const {
    angry,
    yes,
    money,
    stupid,
    loading,
    no
} = require("../../emojis.json");
const discord = require('discord.js');

module.exports = {
    name: "setIcon",
    aliases: ["seticon"],
    usage: `setIcon <Image URL>`,
    category: "admin",
    run: async(client, message, args, lang) => {
        if (!message.guild.me.hasPermission("MANAGE_GUILD") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.bot_no_permission}${angry}`);
        if (!message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.en.general.errors.user_no_permission}${angry}`);

        if (!args.join(" ")) return message.channel.send(`Please enter a valid icon link.${angry}`);

        let file = new MessageAttachment(args.join(" "), `${message.guild.name}_icon.gif`);

        message.guild.setIcon(args.join(" ")).catch(e => message.channel.send(`${lang.en.general.errors.default_error}${e}`));

        message.channel.send({ files: [file], content: `${yes}${lang.en.general.success.set_icon}` });
    }
};
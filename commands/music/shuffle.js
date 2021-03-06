const { canModifyQueue } = require("../../utils/musicUtil.js");

module.exports = {
  name: "shuffle",
  aliases: [],
  category: "music",
  description: "Shuffle queue",
  run (client, message, args, lang) {
    const queue = client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    client.queue.set(message.guild.id, queue);
    queue.textChannel.send(`${message.author} 🔀 shuffled the queue`).catch(console.error);
  }
};

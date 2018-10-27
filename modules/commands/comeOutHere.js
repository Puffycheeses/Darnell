exports.comeOutHere = async function (msg) {
    if (!msg.guild) return;
    const voiceChannel = msg.member.voiceChannel;
    if (voiceChannel) {
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playFile('/home/Noah/goshDarn/assets/comehere.mp3', {
                    volume: 0.25,
                    passes: 3
                });
                dispatcher.on('start', () => {
                    connection.player.streamingData.pausedTime = 0;
                });
                dispatcher.on("finish", () => {
                    voiceChannel.leave();
                    dispatcher.destroy();
                });
            })
            .catch(error => {
                    console.log(`Failed To play audio. ${error}`)
            });
    } else {
        msg.reply('You are not in a voice channel so I cant come out here...');
    }
};

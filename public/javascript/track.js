const audio = new Audio("./audio/Ｂａｍｂｏｏｚｌｅ - Vaporwave.opus");
audio.loop = true;
audio.volume = 0.3;

let playAttempt = setInterval(() => {
    // console.log('hmmm');
    audio.play()
        .then(() => {
            clearInterval(playAttempt);
        })
        .catch(error => {
            console.log('Unable to play the audio, User has not interacted yet.');
        });
}, 3000);
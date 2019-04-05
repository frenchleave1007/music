(function ($, root) {
    // play pause  getAudio
    function AudioManager() {
        //创建音频audio对象
        this.audio = new Audio();
        // this.src = src;
        //默认暂停
        this.status = 'pause';

    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            console.log(src)
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function (time) {
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}))
var root = window.player;
// var nowIndex = 0;
var $scope = $(document.body);
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;

console.log(root)

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            len = data.length;
            control = new root.controlIndex(len);
            dataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio)
            bindEvent();
            bindTouch();
            $('body').trigger('play:change', 0)
        },
        error: function () {
            console.log("error")
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.pro.renderAllTime(dataList[index].duration);
        root.render(dataList[index]);
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 'none'
        })
        if (audio.status == 'play') {
            rotated(0);
            audio.play();
            root.pro.start();
        }
    });
    $('.prev').on('click', function () {
        // if (nowIndex == 0) {
        //     nowIndex = len - 1;
        // } else {
        //     nowIndex--;
        // }
        var i = control.prev();
        $('body').trigger('play:change', i);
        if (audio.status == 'play') {
            root.pro.start(0);
        } else {
            root.pro.update(0);
        }
        // audio.getAudio(dataList[i].audio)
        // root.render(dataList[i]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }
    });
    $('.next').on('click', function () {
        // if (nowIndex == len - 1) {
        //     nowIndex = 0;
        // } else {
        //     nowIndex++;
        // }
        var i = control.next();
        $('body').trigger('play:change', i);
        if (audio.status == 'play') {
            root.pro.start(0);
        } else {
            root.pro.update(0);
        }
        // audio.getAudio(dataList[i].audio)
        // root.render(dataList[i]);
        // if (audio.status == 'play') {
        //     audio.play();
        // }
    })
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
}

function bindTouch() {
    var $slider = $scope.find('.slider');
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            root.pro.update(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per <= 1) {
            var curTime = per * dataList[control.index].duration;
            audio.playTo(curTime);
            $scope.find('.play').addClass('playing');
            audio.status = 'play';
            root.pro.start(per);
        }
    })
}

function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 0.2s linear'
        })
    }, 200)
}

getData("../../mock/data.json");

//信息+图片渲染到页面上 render
//点击按钮
//音频的播放与暂停 切歌
//进度条运动与拖拽
//图片旋转
//列表切歌
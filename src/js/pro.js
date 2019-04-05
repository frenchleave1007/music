//进度条模块
(function ($, root) {
    //渲染总时间
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;
    function renderAllTime(time) {
        curDuration = time;
        time = formatTime(time);
        $scope.find('.all-time').html(time);
    }
    //时间格式转换
    function formatTime(time) {
        time = Math.round(time);
        var m = ('0' + Math.floor(time / 60)).slice(-2);
        var s = ('0' + (time - m * 60)).slice(-2);
        return m + ':' + s;
    }
    //更新播放过的时间 更新进度条
    function start(per) {
        cancelAnimationFrame(frameId);
        lastPer = per == undefined ? lastPer : per;
        startTime = new Date().getTime();
        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            update(percent);
            frameId = requestAnimationFrame(frame);
        }
        frame();
    };
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer += (stopTime - startTime) / (curDuration * 1000);
    }
    //更新时间
    function update(per) {
        var time = per * curDuration;
        time = formatTime(time);
        $scope.find('.cur-time').html(time);
        var perX = (per - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform:'translateX('+ perX +')'
        });
    }
    //拖拽进度条
    //暂停渲染\
    //暴露方法
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        update: update,
        stop: stop,
    }
})(window.Zepto, window.player || (window.player = {}))
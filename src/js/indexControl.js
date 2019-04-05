(function ($, root) {
    function Control(len) {
        //this 指向control对象
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            // if (this.index == 0) {
            //     this.index = len - 1;
            // } else {
            //     this.index--;
            // }
            return this.getIndex(-1);
        },
        next: function () {
            // if (this.index == len - 1) {
            //     this.index = 0;
            // } else {
            //     this.index++;
            // }
            return this.getIndex(1);
        },
        //计算改变后的索引
        getIndex: function (val) {
            //当前索引
            var index = this.index;
            console.log(index)
            //数据长度
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            //改变后的索引
            return curIndex;
        }
    }
    root.controlIndex = Control;
})(window.Zepto, window.player || (window.player = {}))
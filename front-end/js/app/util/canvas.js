define(["jquery", "../../lib/sketch"], function ($) {
    return function(canvas_element) {
        var self = this;

        this._init = function() {
            $(canvas_element).sketch({
                defaultSize: 10
            });
        }

        this._init();
    }
});

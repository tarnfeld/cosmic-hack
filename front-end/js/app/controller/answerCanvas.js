define(['./base', '../util/canvas'], function (base, PaintCanvas) {
    var controllerCanvas = new base('Controller Canvas');

    controllerCanvas.render = function() {
        var canvas = new PaintCanvas($("#canvas").get(0));
    };

    return controllerCanvas;
});

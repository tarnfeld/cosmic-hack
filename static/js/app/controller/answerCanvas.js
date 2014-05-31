define(['./base', '../util/canvas'], function (base, PaintCanvas) {
    var controllerCanvas = new base('Controller Canvas');

    controllerCanvas.init = function(_, submitCallback) {
        var canvas = $("#canvas");
        new PaintCanvas(canvas.get(0));

        $(canvas).closest(".question").find(".btn").click(function(e) {
            e.preventDefault();
            alert("Saved!");
            var datas = canvas.get(0).toDataURL("image/png");
        })
    };

    return controllerCanvas;
});

define(['./base', '../util/canvas'], function (base, PaintCanvas) {
    var controllerCanvas = new base("#question-canvas");

    controllerCanvas.init = function(_, submitURL, patientId, submitCallback) {
        var canvas = $("#canvas");
        new PaintCanvas(canvas.get(0));

        $(canvas).closest(".question").find(".btn").click(function(e) {
            e.preventDefault();
            var datas = canvas.get(0).toDataURL("image/png");

            $.ajax({
                url: submitURL,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    "patient_id": patientId,
                    "answer_type": "DRAWING",
                    "drawing": datas
                }),
                success: function(resp) {
                    if (resp.status == "ok") {
                        submitCallback();
                    }
                },
                error: function() {
                    alert(":( " + arguments);
                }
            });
        });
    };

    return controllerCanvas;
});

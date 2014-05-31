define(['./base'], function (base) {
    var controllerCanvas = new base("#question-text");

    controllerCanvas.init = function(_, submitURL, patientId, submitCallback) {
        $("#text-answer").closest(".question").find(".btn").click(function(e) {
            e.preventDefault();

            $.ajax({
                url: submitURL,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    "patient_id": patientId,
                    "answer_type": "TEXT",
                    "drawing": $("#text-answer").val()
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

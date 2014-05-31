define(function (require) {
    var $ = require('jquery');
    var controllerName = $('body').attr('data-controller');
    var mustache = require('mustache');

    // Figure out the patient number
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})

    if (!parseInt(queryDict["patient"])) {
        var homeTemplate = $('#demo-template').html();
        $('#mustache-container').html(mustache.render(homeTemplate, queryDict));
    }
    else {
        var homeTemplate = $('#home-template').html();
        $('#mustache-container').html(mustache.render(homeTemplate, queryDict));
    }

    var questions = [],
        total_qs = 0;

    function forceNextQ() {
        if (questions.length > 0) {
            nextQuestion(questions.shift());
        } else {
            $("#skip-question").hide();
            var homeTemplate = $('#thanks-template').html();
            $('#mustache-container').html(mustache.render(homeTemplate, queryDict));
        }
    }

    function nextQuestion(q) {
        var questionTypeMapping = {
            "CHOICE": "./controller/answerMaze",
            "TEXT": "./controller/answerText",
            "DRAWING": "./controller/answerCanvas"
        };

        if (!questionTypeMapping[q["question_type"]]) {
            alert("pls");
            return;
        }

        var $body = $('body');
        require([questionTypeMapping[q["question_type"]]], function(controller) {
            q.question_no = total_qs - questions.length;
            q.progress = Math.round(((total_qs - questions.length - 1) / total_qs) * 100);
            $('#mustache-container').html(mustache.render($(controller.template).html(), q));


            submitURL = "/question/" + q.id + "/answer";
            controller.init($body, submitURL, parseInt(queryDict["patient"]), function() {
                forceNextQ();
            }, q);
        });
    }

    $("#skip-question").click(function(e) {
        e.preventDefault();
        forceNextQ();
    })

    require(["jquery"], function($) {
        $(function() {
            $("#start-questions").on("click", function(e) {
                e.preventDefault();

                $.getJSON("/questionnaire/" + queryDict["questionnaire"], function(questionnaire) {
                    if (!!questionnaire.error) {
                        alert("Uh oh! Error: " + questionnaire.error);
                        return;
                    }

                    $.each(questionnaire.response.sections, function(k,v) {
                        $.each(v.questions, function(k,x) {
                            questions.push(x);
                        });
                    });

                    total_qs = questions.length;
                    nextQuestion(questions.shift());

                    $("#skip-question").toggleClass("hide");
                });
            });
        });
    });
});

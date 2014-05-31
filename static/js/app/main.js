define(function (require) {
    var $ = require('jquery');
    var controllerName = $('body').attr('data-controller');
    var mustache = require('mustache');

    // Figure out the patient number
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})

    if (!parseInt(queryDict["patient"])) {
        alert("No partient!");
    }

    var homeTemplate = $('#home-template').html();
    $('#mustache-container').html(mustache.render(homeTemplate, queryDict));

    var questions = [];

    function nextQuestion(q) {
        console.log(q);

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
            controller.init($body, function() {
                if (questions.length > 0) {
                    nextQuestion(questions.shift());
                }
            });

            var template = controller.renderHtml();
            $('#mustache-container').html(mustache.render(template, q));
        });
    }

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

                    nextQuestion(questions.shift());
                });
            });
        });
    });
});

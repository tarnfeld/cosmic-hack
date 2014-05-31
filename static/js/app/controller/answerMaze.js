define([
        './base',
        '../util/canvas',
        '../../lib/maze/array',
        '../../lib/maze/cell',
        '../../lib/maze/graph',
        '../../lib/maze/maze',
        '../../lib/maze/mazeGenerator',
        'underscore'
    ],
    function (base, PaintCanvas) {

        var controllerMaze = new base('Controller Maze');

        controllerMaze.init = function(jDocument, submitCallback) {
            this.initMaze(jDocument);
        };

        controllerMaze.renderHtml = function() {
            return $('#answer-maze').html();
        };

        controllerMaze.initMaze = function(jDocument) {
            // @todo hookup endpoints.
            var answers   = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
            var mazeIndex = 1;
            var self = this;

            var mazeContainer = jDocument.find('#maze-container');

            // This generates a maze for each answer and registers a
            // winning event handler.
            _.each(answers, function(answer) {

                var template =
                    '<div class="maze-question">' +
                        '<h3>' + answer + '</h3>' +
                        '<div class="maze-wrap">' +
                            '<div class="start"></div>' +
                            '<canvas data-answer="' + answer + '" class="mazedraw" id="mazedraw' + mazeIndex + '" width="200" height="200"></canvas>' +
                            '<div class="win"></div>' +
                            '<canvas data-answer="' + answer + '" class="maze" id="maze' + mazeIndex + '" width="200" height="200"></canvas>' +
                        '</div>' +
                    '</div>';


                mazeContainer.append(template);

                var maze = new Maze(document, 'maze' + mazeIndex),
                    canvas = $("#mazedraw" + mazeIndex);

                PaintCanvas(canvas.get(0));

                maze.generate();
                maze.draw();

                self.registerWinHandler('#maze' + mazeIndex, answer);

                mazeIndex++;
            });
        };

        controllerMaze.registerWinHandler = function(id, answer) {
            var self = this;

            self.won = false;

            $(id).parent().find('.mazedraw').on('mousedown', function() {
                self.won = true;
            });

            $(id).parent().find('.mazedraw').on('mouseup', function() {
                self.won = false;
            });

            $(id).parent().find('.mazedraw').on('mouseleave', function() {
                setTimeout(function() {
                    self.won = false;
                }, 1000);
            });

            $(id).parent().find('.win').on('mouseover', function() {
                if (self.won) {
                    alert('won');
                }
            });
        };

        return controllerMaze;
    }
);

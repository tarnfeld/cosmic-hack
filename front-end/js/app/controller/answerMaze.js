define([
        './base',
        '../../lib/maze/array',
        '../../lib/maze/cell',
        '../../lib/maze/graph',
        '../../lib/maze/maze',
        '../../lib/maze/mazeGenerator',
        'underscore',
    ],
    function (base) {

        var controllerMaze = new base('Controller Maze');

        controllerMaze.init = function(jDocument) {
            this.initMaze(jDocument);
        };

        controllerMaze.initMaze = function(jDocument) {
            // @todo hookup endpoints.
            var answers   = ['hello', 'world', 'how', 'noob'];
            var mazeIndex = 1;
            var self = this;

            var mazeContainer = jDocument.find('#maze-container');

            // This generates a maze for each answer and registers a
            // winning event handler.
            _.each(answers, function(answer) {

                var template =
                    '<div class="maze-wrap">' +
                        '<canvas data-answer="' + answer + '" class="maze" id="maze' + mazeIndex + '" width="200" height="200"></canvas>' +
                        '<div class="win"></div>' +
                        '<div class="start"></div>' +
                    '</div>';

                mazeContainer.append(template);

                var maze = new Maze(document, 'maze' + mazeIndex);

                maze.generate();
                maze.draw();

                self.registerWinHandler('#maze' + mazeIndex, answer);

                mazeIndex++;
            });
        };

        controllerMaze.registerWinHandler = function(id, answer) {
            $(id).parent().find('.win').on('mouseenter mousedown', function() {
                // @todo hookup endpoint.
            });
        };

        return controllerMaze;
    }
);

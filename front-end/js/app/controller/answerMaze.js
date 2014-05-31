define([
        './base',
        '../../lib/maze/array',
        '../../lib/maze/cell',
        '../../lib/maze/graph',
        '../../lib/maze/maze',
        '../../lib/maze/mazeGenerator',
        'underscore'
    ],
    function (base) {

        var controllerMaze = new base('Controller Maze');

        controllerMaze.init = function(jDocument) {
            this.initMaze(jDocument);
            this.initWinner(jDocument);
        };

        controllerMaze.initMaze = function(jDocument) {
            var answers   = ['hello', 'world'];
            var mazeIndex = 1;

            var mazeContainer = jDocument.find('#maze-container');

            // This generates a maze for each answer and registers a
            // winning event handler.
            _.each(answers, function(answer) {
                mazeContainer.append('<canvas class="maze" id="maze' + mazeIndex + '" width="200" height="200"></canvas>');

                var maze = new Maze(document, 'maze' + mazeIndex);

                maze.generate();
                maze.draw();

                mazeIndex++;
            });
        };

        controllerMaze.initWinner = function(document) {

        };

        return controllerMaze;
    }
);

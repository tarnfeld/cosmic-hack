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

            _.each(answers, function(answer) {
                mazeIndex++;

                mazeContainer.append('<canvas id="maze' + mazeIndex + '" width="200" height="200"></canvas>');

                var maze = new Maze(document, 'maze' + mazeIndex);
                maze.generate();
                maze.draw();
            });
        };

        controllerMaze.initWinner = function(document) {

        };

        return controllerMaze;
    }
);

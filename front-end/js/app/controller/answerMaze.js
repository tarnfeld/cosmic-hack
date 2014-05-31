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

        controllerMaze.init = function(dom) {

            var maze = new Maze(document, 'maze1');

            maze.generate();
            maze.draw();
        };

        controllerMaze.solution = function() {

        };

        return controllerMaze;
    }
);

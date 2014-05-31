//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    paths: {
        app: './app',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        jquery: '../bower_components/jquery/dist/jquery',
        requirejs: '../bower_components/requirejs/require',
        underscore: '../bower_components/underscore/underscore',
        easeljs: '../bower_components/easeljs/lib/easeljs-0.7.1.combined',
        jqueryui: '../bower_components/jqueryui/ui/jquery-ui',
        mustache: '../bower_components/mustache/mustache'
    },
    packages: [

    ]
});

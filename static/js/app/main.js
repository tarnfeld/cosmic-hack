define(function (require) {
    var $ = require('jquery');
    var controllerName = $('body').attr('data-controller');
    var mustache = require('mustache');

    var homeTemplate = $('#home-template').html();

    $('#mustache-container').html(mustache.render(homeTemplate));

//    require([
//        'jquery',
//        './controller/' + controllerName
//    ], function ($, controller) {
//        controller.init($('body'));
//    });

});

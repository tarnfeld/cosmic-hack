define(function (require) {
    var $ = require('jquery');
    var controllerName = $('body').attr('data-controller');

    require([
        'jquery',
        './controller/' + controllerName
    ], function ($, controller) {
        controller.init($('body'));
    });

});

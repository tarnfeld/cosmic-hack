define(function (require) {
    var $ = require('jquery');
    var controllerName = $('body').attr('data-controller');
    require([
        './model/' + controllerName,
        './controller/' + controllerName,
        'jquery'
    ], function (model, controller, $) {
        controller.setModel(model);
        controller.render($('body'));
    });

});

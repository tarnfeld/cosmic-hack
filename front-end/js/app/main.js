define(function (require) {
    var $ = require('jquery'),
        controller = require('./controller/main'),
        model = require('./model/main');

    //A fabricated API to show interaction of
    //common and specific pieces.
    controller.setModel(model);
    $(function () {
        controller.render($(document.body));
    });
});

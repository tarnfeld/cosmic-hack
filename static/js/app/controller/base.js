define(function () {
    function controllerBase(template) {
        this.template = template;
    }

    controllerBase.prototype = {
        setModel: function (model) {
            this.model = model;
        },
        init: function (bodyDom, submitCallback) {

        }
    };

    return controllerBase;
});

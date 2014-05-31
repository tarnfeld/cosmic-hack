define(function () {
    function controllerBase(id) {
        this.id = id;
    }

    controllerBase.prototype = {
        setModel: function (model) {
            this.model = model;
        },
        init: function (bodyDom, submitCallback) {

        },
        renderHtml: function () {
            
        }
    };

    return controllerBase;
});

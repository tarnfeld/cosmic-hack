define(function () {
    function controllerBase(id) {
        this.id = id;
    }

    controllerBase.prototype = {
        setModel: function (model) {
            this.model = model;
        },
        init: function (bodyDom) {

        }
    };

    return controllerBase;
});

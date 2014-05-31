define(function () {
    function controllerBase(id) {
        this.id = id;
    }

    controllerBase.prototype = {
        setModel: function (model) {
            this.model = model;
        },
        render: function (bodyDom) {
        }
    };

    return controllerBase;
});

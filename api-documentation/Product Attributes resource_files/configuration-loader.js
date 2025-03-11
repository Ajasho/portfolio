(function (onlinehelp) {
    var deferred = $.Deferred();
    $.getJSON('/api/v1/json-config', '', function (data) {
        deferred.resolve(data);
    }).fail(function () {
        var reason = "Failed to fetch help config";
        deferred.reject(reason);
    });
    onlinehelp.configLoader = deferred;
})(window.onlinehelp = window.onlinehelp || {});
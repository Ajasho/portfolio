(function (onlinehelp) {
    var deferred = $.Deferred();
    $.getJSON('/user-info', '', function (data) {
        deferred.resolve(data);
    }).fail(function () {
        var reason = "Failed to fetch user-info";
        deferred.reject(reason);
    });
    onlinehelp.userInfoLoader = deferred;
})(window.onlinehelp = window.onlinehelp || {});
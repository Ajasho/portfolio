$(document).ready(function () {
    onlinehelp.configLoader.done(function (config) {
        if (!!config.languageSwitcherEnabled) {
            var currentLang = window.urlUtils.getCurrentLangCode(config.languages) || config.defaultLanguage;
            var prefixes = Object.keys(config.languages);

            for (var idx in prefixes) {
                var prefix = prefixes[idx];
                if (prefix !== currentLang) {
                    addLanguageLink(prefix, config.languages[prefix].displayName);
                }
            }
            $('#language-switcher-trigger').append(config.languages[currentLang].displayName);
        }
    }).fail(function (reason) {
        console.warn(reason)
    });

    function addLanguageLink(prefix, name) {
        $('#language-switcher-content').append(
            '<li><a href="#" class="nav-link" onclick="switchToLang(\'' + prefix + '\')">' + name + '</a></li>'
        );
    }
});


function switchToLang(lang) {
    var oldUrl = window.location.pathname;

    onlinehelp.configLoader.done(function (config) {
        var prefixToReplace = window.urlUtils.getLangPrefix(config.languages);
        var newUrl = '/' + lang + '/' + oldUrl.substring(prefixToReplace.length);
        window.location.replace(newUrl);
    });
}

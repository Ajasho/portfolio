

function UrlUtils() {

    var self = this;

    this.getCategory = function (languages) {
        var url = window.location.pathname;
        var langPrefix = this.getLangPrefix(languages);
        var urlWithoutLang = url.substring(langPrefix.length);

        return urlWithoutLang.split('/')[0];
    };

    this.getLangPrefix = function (languages) {
        var langTag = self.getCurrentLangCode(languages);
        return langTag ? ('/' + langTag + '/') : '/';
    };

    this.getFallbackMessage = function (languages, defaultLanguage) {
        var redirectFrom = this.getParam("redirectFrom");

        if(!redirectFrom){
            redirectFrom = defaultLanguage;
        }

        var fallbackMessage = languages[defaultLanguage].fallbackMessage;

        if(languages[redirectFrom]){
            fallbackMessage = languages[redirectFrom].fallbackMessage
        }

        return fallbackMessage;
    };

    this.getParam = function (paramName) {
        var splitByQuestionMark = window.location.search.split('?');
        if(splitByQuestionMark.length > 1){
            var paramsPart = splitByQuestionMark[1];
            var paramIndex = paramsPart.indexOf(paramName + '=');
            if(paramIndex > -1){
                return paramsPart.substring(paramIndex).split(paramName + '=')[1].split('&')[0];
            }
        }
        return undefined;
    };

    this.getCurrentLangCode = function (languages) {
        var url = window.location.pathname;

        for (var key in languages) {
            if (languages.hasOwnProperty(key)) {
                if (url.indexOf('/' + key + '/') === 0) {
                    return key;
                }
            }
        }
        return undefined;
    };
}

window.urlUtils = new UrlUtils();


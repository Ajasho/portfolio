$(document).ready(function () {
    window.onlinehelp.configLoader.done(function (config) {
        var category = window.urlUtils.getCategory(config.languages);
        var langCode = window.urlUtils.getCurrentLangCode(config.languages) || config.defaultLanguage;
        if (langCode === undefined) {
            console.warn("Could not retrieve lang code");
        }
        var categoryMapping = langCode === undefined ? category : window.contentConfig.getCategoriesMapping(langCode, category);
        var searchPlaceholder = langCode === undefined ? "" : window.contentConfig.getSearchPlaceholder(langCode);

        $("#landing-search").attr("placeholder", searchPlaceholder.replace("{}", categoryMapping.toLowerCase()));
    });
});

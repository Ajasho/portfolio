function SearchForwarder() {

    this.doSearch = function (event) {
        event.preventDefault();
        var query = $('#landing-search').val();
        onlinehelp.configLoader.done(function (config) {
            var category = window.urlUtils.getCategory(config.languages);
            var lang = window.urlUtils.getCurrentLangCode(config.languages) || config.defaultLanguage;
            forward(category, query, lang);
        });
    }

    function forward(category, query, lang) {
        if (category !== 'search') {
            window.sessionStorage['category'] = category;
        }
        window.sessionStorage['query'] = query;
        console.log("Forwarding to search");
        location = '/' + lang + '/search';
    }
}

$(document).ready(function () {
    window.searchEngine = new SearchForwarder();
});

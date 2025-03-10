function ContentConfig() {

    var contentConfig = {};

    this.getCategoriesMapping = function (lang, category) {
        var categoryMapping = contentConfig['categoriesMapping.' + lang.toLowerCase() + '.' + category];
        if (categoryMapping) {
            return categoryMapping;
        } else {
            return category
        }
    };

    this.getSearchPlaceholder = function (lang) {
        var searchPlaceholder = contentConfig['searchPlaceholders.' + lang.toLowerCase()];
        if (searchPlaceholder) {
            return searchPlaceholder;
        } else {
            return '';
        }
    };

    function _getContentConfig() {
        $.ajax(
            {
                url: '/api/v1/properties',
                dataType: 'json',
                success: function (data) {
                    contentConfig = data;
                },
                async: false
            }
        );
    }
    _getContentConfig();
}

window.contentConfig = new ContentConfig();



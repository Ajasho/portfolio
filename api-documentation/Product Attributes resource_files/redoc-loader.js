(function (onlinehelp) {
    function wrapRefsForOpenAPI3(obj) {
        let refKey = "$ref";
        let newObj = Array.isArray(obj) ? [] : obj instanceof Object ? {} : obj;
        if (!(newObj instanceof Object)) {
            return newObj;
        }

        Object.keys(obj).forEach((key) => {
            if (key === refKey) {
                newObj['allOf'] = [{[key]: obj[key]}];
            } else if (key === "responses" ) {
                newObj[key] = {};
                Object.keys(obj[key]).forEach((responseCode) => {
                    if (parseInt(responseCode) < 400){
                        newObj[key][responseCode] = obj[key][responseCode];
                    }
                    else {
                        let fixedObj = obj[key][responseCode];
                        fixedObj['content']["application/json"]['example'] = {
                            "timestamp": "2021-02-24T16:38:07Z",
                            "httpStatus": parseInt(responseCode),
                            "message": "string",
                            "args": {},
                            "code": "string",
                            "moreInfo": "string"
                          };
                        newObj[key][responseCode] = fixedObj;
                    }              
                })
            }             
            else {
                newObj[key] = wrapRefsForOpenAPI3(obj[key])
            }
        });
        return newObj;
    }

    function wrapRefsForOpenAPI2(obj) {
        let refKey = "$ref";
        let newObj = Array.isArray(obj) ? [] : obj instanceof Object ? {} : obj;
        if (!(newObj instanceof Object)) {
            return newObj;
        }

        Object.keys(obj).forEach((key) => {
            if (key === refKey) {
                newObj['allOf'] = [{[key]: obj[key]}];
            }            
            else {
                newObj[key] = wrapRefsForOpenAPI2(obj[key])
            }
        });
        return newObj;
    }

    function getBasePath() {
        let apiHost;
        if (window.location.host.includes('sandbox')) {
            apiHost = 'https://api.sandbox.atmosphere.osp.tech';
        }
        else {
            apiHost = `${location.host
                .replace('osponlinehelp', 'externalapi')
                .replace('help', 'api')}/externalapi`;
        }
        return `//${apiHost}`;
    }

    function loadRedoc(spec, element) {
        let withWrappedRefs = spec.openapi === undefined ? wrapRefsForOpenAPI2(spec) : wrapRefsForOpenAPI3(spec);

        withWrappedRefs.servers = [{url: getBasePath()}];
        Redoc.init(withWrappedRefs,
            {
                theme: {
                    colors: { primary: { main: "#00a3e0" } },
                    typography: {
                        fontFamily:
                            '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        headings: {
                            fontFamily:
                                '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                        },
                    },
                    rightPanel: { backgroundColor: "#30373b" },
                },
                pathInMiddlePanel: true,
                menuToggle: true,
                expandResponses: "200",
                hideDownloadButton: true
            },
            element
        );
    }

    onlinehelp.redocLoader = {
        load: (path, element) => {
            $.getJSON(path, '', (data) => loadRedoc(data, element))
                .fail(() => {
                    console.error("Failed to load api reference of " + path)
                });
        }
    };
})(window.onlinehelp = window.onlinehelp || {});

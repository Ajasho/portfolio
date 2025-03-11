function BaseUrlConfig() {
    
    function init() {
	    let host = window.location.host;
         if (document.getElementById("retailer-url")) {
            document.getElementById("retailer-url").innerHTML = getBaseUrl(host);
         }
         if (document.getElementById("login-url")) {
            document.getElementById("login-url").innerHTML = getPandaUrl(host) + "/oauth2/token";
         }
         if (document.getElementById("example-login-url")) {
            document.getElementById("example-login-url").innerHTML = getPandaUrl(host) + "/oauth2/token";
         }
	}
    function getBaseUrl(host) {
        if (host.includes('osponlinehelp')) {
            return `https://${host.replace('osponlinehelp', 'externalapi')}`;
        } else if (host.includes('sandbox')) {
            return 'https://api.sandbox.atmosphere.osp.tech';
        } else {
            return `https://${host.replace('help', 'api')}`;
        }
    }
    function getPandaUrl(host) {
	return getBaseUrl(host).replace('api', 'login');
    }
    init();
}

$(document).ready(function () {
    new BaseUrlConfig();
});


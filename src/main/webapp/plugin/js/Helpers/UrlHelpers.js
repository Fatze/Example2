var UrlHelpers;
(function (UrlHelpers) {
	UrlHelpers.isLocal=isLocal;
	UrlHelpers.isProxyUrl = isProxyUrl;
	
	function isLocal(host,hostName){
		return (host === "localhost" || host === "127.0.0.1" || host === hostName)
	};	
	
	function isProxyUrl(location) {
        var url = location.url();
        return url.indexOf('/hawtio/proxy/') > 0;
    }
	
	
})(UrlHelpers || (UrlHelpers = {}));
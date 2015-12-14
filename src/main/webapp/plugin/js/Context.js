//# sourceURL=src\main\webapp\plugin\js\Context.js
var Context;
(function (Context) {
    // var section    
    var pluginName = 'Context';
    var providerName = 'Urls'
    var log = Logger.get(pluginName);
    //
    var _module = angular.module(pluginName, ['hawtioCore']);
    _module.provider(providerName, urlsProvider);
    //_module.config(['paths', customersConfig]);
    //_module.
        _module.constant('paths', {
            host: "localhost",
            port: "8182",
            //path: _context,
            path2html: '/plugin/html/',
            path2doc: '/plugin/doc/',
            mainHtml: 'customers.html',
            Server: this.host + ":" + this.port,
        });
    _module.constant('server', {
        proxy:{
            type:"http",
            name:"localhost",
            port:"8182",
            path:"hawtio/proxy",
            Server:"${this.type}",            
        },
        //name:
        

    });
    
    //_module.fa
    _module.constant('plugin', {
        context: '${plugin-context}',
        name: '${plugin-name}',
        domain: '${plugin-domain}',
        scripts: '${plugin-scripts}',
    });


    function urlsProvider() {
        var local = false;
        var location = null;
        var proxyUrl = '/hawtio/proxy/';
        var remoteServerUrl = 'stws2305:8182/cxf/route/';
        var jolokiaPath = 'hawtio/jolokia'
        var jolokia = null;
        return {
            setLocal: function (newVal) {
                local = newVal;
            },
            set
            $get: function () {
                function getLocal() {
                    return local;
                }
                function getServerUrl() {
                    return !local && proxyUrl + remoteServerUrl;
                }
                function getJolokiaUrl() {
                    return getServerUrl() + jolokiaPath;
                }
                function getJolokia() {
                    if (jolokia == null) {
                        var username = Core.username;
                        var password = Core.password;
                        if (!username) {
                            // lets try reverse engineer the user/pwd from the stored user/pwd
                            var jsonText = localStorage[url];
                            if (jsonText) {
                                var obj = Wiki.parseJson(jsonText);
                                if (obj) {
                                    username = obj["username"];
                                    password = obj["password"];
                                }
                            }
                        }
                        username = username || 'admin';
                        password = password || 'admin';
                        log.info("Logging into remote jolokia " + url + " using username: " + username);
                        jolokia = Core.createJolokia(url, username, password);
                    }
                    return jolokia;
                }

                return {
                    variable: "This is public",
                    isLocal: getLocal,
                    getServer: getServerUrl,
                    getJolokiaUrl: getJolokiaUrl,
                    getJolokia: getJolokia
                };
            }

        };

    };

    hawtioPluginLoader.addModule(pluginName);
})(Context || (Context = {}));


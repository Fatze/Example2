/**
 * Created by Dostanko_VL on 22.10.2015.
 */
var Context;
(function (Context) {
    // var section    
    var pluginName = 'Context';
    //
    var _module = angular.module(pluginName, []);
    //_module.config(['paths', customersConfig]);
    
    _module.constant('paths', {
        host: "localhost",
        port: "8182",
        //path: _context,
        path2html: '/plugin/html/',
        path2doc: '/plugin/doc/',
        mainHtml: 'customers.html'
    });
    _module.constant('plugin', {
        context: '${plugin-context}',
        name: '${plugin-name}',        
        domain: '${plugin-domain}',
        scripts: '${plugin-scripts}',
    });
    
    hawtioPluginLoader.addModule(pluginName);
})(Context || (Context = {}));
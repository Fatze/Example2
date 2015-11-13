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
        context: '/Example2',
        name: 'Example2',        
        domain: '',
        scripts: 'plugin/js/Context.js,plugin/js/Services/Services.js,plugin/js/smpl/Customers.js',
    });
    
    hawtioPluginLoader.addModule(pluginName);
})(Context || (Context = {}));
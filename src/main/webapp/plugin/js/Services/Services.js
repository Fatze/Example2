var Services;
(function (Services) {
    // var section    
    // name convention from https://github.com/mgechev/angularjs-style-guide/blob/master/README-ru-ru.md
    var pluginName = 'Services';   
    var serviceName = 'customersService';    
    //
    var log = Logger.get(pluginName);
    
    //var _context = Context;
    var urls = null;
    //
    var _module = angular.module(pluginName, ['Context']);
    _module.config(['paths', customerConfig]);
    _module.service(serviceName, ['$http', customersService]);
    
    
    //const //need to move in context obj
    // _module.constant('paths', {
    //     host: "localhost",
    //     port: "8182",
    //     path: _context,
    //     path2html: '/plugin/html/',
    //     path2doc: '/plugin/doc/'
    // });
    
    function customerConfig(paths) {
        var srv = paths.host ? paths.host + paths.port ? ':' + paths.port : '' : '';
        var sevicesrv = 'http://127.0.0.1:818/cxf/route/service';
        urls = {
            html: srv + '/' + paths.path2html,
            dos: srv + '/' + paths.path2doc,
            sevice: {
                url: '',
                getById: sevicesrv+'/customer',
                list: sevicesrv+'/customer',
                add: sevicesrv+'/add',
                update: sevicesrv+'/update'
            }
        };
    };
    /// logic
    function customersService($http) {
        // Create new record
        this.post = function (Customer) {
            return $http.get(urls.sevice.add, {
                //?nationalID=10&firstName=Christina&lastName=Lin&age=292&occupation=Sofrware%20Developer2
                params: {
                    nationalID: Customer.nationalID,
                    firstName: Customer.firstName,
                    lastName:Customer.lastName,
                    age:Customer.age,
                    occupation:Customer.occupation,
                    Developer:Customer.Developer,
                }});         
        }
        //Get Single Records
        this.get = function (CustomerNo) {
            return $http.get(urls.sevice.getById+'/' + CustomerNo);
        }
 
        //Get All Customers
        this.getCustomers = function () {
            return $http.get(urls.sevice.list);
        } 
 
        //Update the Record
        this.put = function (CustomerNo, Customer) {
             return $http.get(urls.sevice.update, {
                //?nationalID=10&firstName=Christina&lastName=Lin&age=292&occupation=Sofrware%20Developer2
                params: {
                    nationalID: Customer.nationalID,
                    firstName: Customer.firstName,
                    lastName:Customer.lastName,
                    age:Customer.age,
                    occupation:Customer.occupation,
                    Developer:Customer.Developer,
                }});     
        }
        
    };
    // _module.service(serviceName, ["$http", function ($http) {
        
    // }]);
    //  _module.controller(controllerName,["$scope",function ($scope) {
         
    //  }]);
    // init
    hawtioPluginLoader.addModule(pluginName);
})(Services || (Services = {}));
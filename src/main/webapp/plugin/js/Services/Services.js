//# sourceURL=src\main\webapp\plugin\js\Services\Services.js
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
    _module.config(['paths','UrlsProvider', customerConfig]);
    _module.service(serviceName, ['$http',customersService]);
    
    
    //const //need to move in context obj
    // _module.constant('paths', {
    //     host: "localhost",
    //     port: "8182",
    //     path: _context,
    //     path2html: '/plugin/html/',
    //     path2doc: '/plugin/doc/'
    // });
    
    function customerConfig(paths,UrlsProvider) {
        var srv = paths.host ? paths.host + paths.port ? ':' + paths.port : '' : '';
        var sevicesrv = paths.Server+'cxf/route/service';
        urls = {
            html: srv + '/' + paths.path2html,
            doc: srv + '/' + paths.path2doc,
            sevice: {
                url: '',
                getById: sevicesrv+'/customer',
                list: sevicesrv+'/customer',
                add: sevicesrv+'/add',
                update: sevicesrv+'/update',
                object: 'by.st.ConnectionsDemo1.Model.ConnectionModel'
            }
        };
    };
    /// logic
    function customersService($http) {
        function mapParams(Customer){
            return {
                nationalID: Customer.nationalID,
                firstName: Customer.firstName,
                lastName: Customer.lastName,
                age: Customer.age,
                occupation: Customer.occupation,
                Developer: Customer.Developer,
            };
        } 
        // Create new record
        //?nationalID=10&firstName=Christina&lastName=Lin&age=292&occupation=Sofrware%20Developer2
        this.post = function (Customer) {
            
            return $http.get(urls.sevice.add, {params: mapParams(Customer)});  
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
        //?nationalID=10&firstName=Christina&lastName=Lin&age=292&occupation=Sofrware%20Developer2
        this.put = function (CustomerNo, Customer) {            
             return $http.get(urls.sevice.update, {params: mapParams(Customer)});     
        }
        
        //Get Object  Name for Customer
        this.getObjecName = function (){
            return 'com.mycompany.RSservice.model.CustInfo';
        }
        
    };
    // _module.service(serviceName, ["$http", function ($http) {
        
    // }]);
    //  _module.controller(controllerName,["$scope",function ($scope) {
         
    //  }]);
    // init
    hawtioPluginLoader.addModule(pluginName);
})(Services || (Services = {}));
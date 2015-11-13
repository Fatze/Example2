/**
 * Created by Dostanko_VL on 22.10.2015.
 */

var Sample1 = new Object();
Sample1.pluginName = 'Sample1';
Sample1.log = Logger.get(Sample1.pluginName);

Sample1.contextPath = Context.plugin_context;
Sample1.templatePath = Sample1.contextPath + '/plugin/html/';
Sample1.mainPage = Sample1.templatePath + 'simpl1.html';
Sample1.templateDocPath = Sample1.contextPath + '/plugin/doc/';

Sample1.jmxDomain = "hawtio:type=plugin,name="; //hawtio:type=plugin,name=Connections
Sample1.mbeanType = "Connections";
Sample1.attribute = "PublishData";
Sample1.JsonService = "http://127.0.0.1:818/cxf/route/service/";
Sample1.mbean = Sample1.jmxDomain/* + ":type="*/ + Sample1.mbeanType;

Sample1.RegisterInHawtIO = function (workspace, viewRegistry, layoutFull) {
    //Sample1.RegisterInHawtIO = function (workspace, viewRegistry, helpRegistry) {
        viewRegistry["Customers"] =  layoutFull;


        workspace.topLevelTabs.push({
            id: "Customers",
            content: "Customers1",
            title: Sample1.mainPage,
            isValid: function () {
                return true;
            },
            href: function () {
                return "#/Customers";
            },
            isActive: function (workspace) {
                return workspace.isTopTabActive("Customers");
            }
        });
    };


Sample1.SimpleController1 = function ($scope,jolokia,myService) {

    $scope.userParam = "";
    $scope.hello = Sample1.templatePath;
    $scope.gridOptions = { 
        data: 'myData',
        enableCellEdit: true, 
    };
    
    $scope.RequestInformation = function () {
        // if (Core.isBlank($scope.userParam)) {
        //     return;
        // }
        Sample1.log.debug("User searched : " + $scope.userParam);
        //var resource = $resource(Sample1.JsonService+"customer"); //:id $scope.myData = 
        myService.getList(function(data) {
            Sample1.log.debug("User data : " + data);
            $scope.myData = data;
            $scope.isReply = true;
            //Sample1.log.debug("JSON data : " + $scope.myData);
            if (!$scope.$$phase) {
                    $scope.$apply();};
            Core.$apply($scope);
            });
        // var response = GetCustomers.query();                
        // response.$promise.then(function(data) {
        //   $scope.myData=data;
        //     }, function() {
        //         //TODO:Handle Error
        //     });
        
        // resource.get(/*{id:1}*/).$promise.then(function(value) 
        // {
        //     $scope.isReply =true;
        //     $scope.myData = value;
        // });
    };
    $scope.hover = function (isReply) {
        // Shows/hides the delete button on hover
        return $scope.isReply == false;
    };
};


Sample1.module = angular.module(
    Sample1.pluginName,
    ['ui', 'bootstrap', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngResource', 'ngGrid', 'hawtioCore', 'hawtio-ui', 'hawtio-forms'])
    .config(function ($routeProvider) {
        $routeProvider.when('/Customers', {templateUrl: Sample1.mainPage});
    });

Sample1.module.factory('myService', function($http) {
   return {
     getList: function(callback) {
       $http.get(Sample1.JsonService+"customer").success(callback);
     }
   }
});

// Sample1.module.factory('GetCustomers', function($http) {
//    return {
//      getList: function(callback) {
//         $http.get(Sample1.JsonService+"customer").success(callback);
//      }
//    }
// });

// Sample1.module.factory('GetCustomers',  ['$resource', function($resource) {
//     // return $resource('http://jsonplaceholder.typicode.com/users/:user',{/*user: "@user"*/});
//     return $resource(
//         Sample1.JsonService+"customer",
//         null,
//         {
//             query: {
//                 isArray: true,
//                 method: 'GET',
//                 //headers: {'X-Api-Secret': 'xxx', 'Authorization': 'xxx', 'Content-Type': 'application/x-www-form-urlencoded'}}
//                 }
//         })
// }]);

Sample1.module.run(Sample1.RegisterInHawtIO);
hawtioPluginLoader.addModule(Sample1.pluginName);
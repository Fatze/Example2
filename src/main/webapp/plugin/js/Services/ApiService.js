var ApiService;
(function (ApiService) {
    // var section    
    var pluginName = 'ApiService';
	var serviceName = 'customersService'; 
	var _module = angular.module(pluginName, []); 
	 _module.service(serviceName, ['$http','jolokia',customersService]);  
	 
	 function customersService($http,jolokia) {
		 var _jApisRequest ={
                type: 'exec',
                mbean: Fabric.managerMBean,
                operation: "clusterJson",
                arguments: ["apis"] } ;
				
		 var _jolokia = function (){
			 return jolokia;
		 }();
		 
		 var _jHedlers = function (onSuccess,onError) {
			 return {
				 success: onSuccess || function (response) { },
				 error: onError || function (response) {
					 //  Core.$apply($scope);
					 Core.notification(notification("error", response.error);
					 Core.defaultJolokiaErrorHandler(response);
				 }
			 };			 
		 }
		 this.getApis = function (onSuccess){
			 _jolokia.request(_jApisRequest,_jHedlers(function (response) {onSuccess(response)})) 
		 }
	 }

	hawtioPluginLoader.addModule(ApiService);
})(ApiService || (ApiService = {}));
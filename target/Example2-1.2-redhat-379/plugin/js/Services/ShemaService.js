//# sourceURL=src\main\webapp\plugin\js\Services\ShemaService.js
var Shema;
(function (Shema) {
    //const
	var pluginName = 'Shema';   
    var serviceName = 'JSONShemaService'; 
	//
	var schemaLookupDomain = "hawtio";
    var schemaLookupType = "SchemaLookup";
    var schemaLookupMBean = schemaLookupDomain + ":type=" + schemaLookupType;
	//
	var log = Logger.get(pluginName);
	var _module = angular.module(pluginName, ['Context']);
    //var
	_module.service(serviceName, ['jolokia', JSONShemaService]);	
    //impl
    function JSONShemaService(jolokia) {
               
        this.get = getObjectSchema;
        this.getRemote = getRemoteObjectSchema;
        //impl
        function getObjectSchema(className, cb) {
           getRemoteObjectSchema(className, cb,jolokia); 
        }
        
        function getRemoteObjectSchema(className,cb,jl){
            if (jl) {
                jl.execute(schemaLookupMBean, 'getSchemaForClass(java.lang.String)', className, {
                    method: 'POST',
                    success: function (value) {
                        cb(angular.fromJson(value));
                    }
                });                
            };
        }
    }
    
    hawtioPluginLoader.addModule(pluginName);
})(Shema || (Shema = {}));
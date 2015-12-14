//# sourceURL=src\main\webapp\plugin\js\smpl\Customers.js
var Customers;
(function (Customers) {
    // var section    
    var pluginName = 'Customers';
    var controllerName = 'customersCtrl';
    var log = Logger.get(pluginName);
    //var _context = Context;
    var urls = null;
    //

    
    //    
    var _module = angular.module(pluginName, ['Context', 'Services', 'ui', 'bootstrap', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngResource', 'ngGrid', 'hawtioCore', 'hawtio-ui', 'hawtio-forms']);
    _module.config(['$routeProvider', 'paths', 'plugin', customersConfig]);
    _module.run(['workspace', 'viewRegistry', 'layoutFull', 'paths', 'plugin', customersRun]);
    _module.controller('modalCtrl', ['$scope', modalCtrl]);
    _module.controller(controllerName, ['$scope', 'customersService','JSONShemaService','UrlsProvider', customersCtrl]);
   
    //
    


    function customersConfig($routeProvider, paths, plugin) {
        log.debug('customersConfig');
        $routeProvider.when('/Customers', { templateUrl: plugin.context + paths.path2html + paths.mainHtml });
    };

    function customersRun(workspace, viewRegistry, layoutFull, paths, plugin) {
        log.debug('customersRun');
        viewRegistry["Customers"] = layoutFull;

        workspace.topLevelTabs.push({
            id: "Customers",
            content: "Customers1",
            title: plugin.context + paths.path2html + paths.mainHtml,
            isValid: function () { return true; },
            href: function () { return "#/Customers"; },
            isActive: function (workspace) { return workspace.isTopTabActive("Customers"); }
        });    };

    function customersCtrl($scope,customersService,JSONShemaService,UrlsProvider) {
        var vm = this;
        $scope['vm'] = this;
        log.debug('customersCtrl');
        vm.isReply = false;
        var jl = Urls.Jolokia();
        //this.myData = {};
       
        vm.gridOptions = {
            data: 'vm.gridData',
            multiSelect: false,
            selectedItems: [],
            //enableCellEdit: true,
        };
        vm.RequestInformation = function () {
            log.debug('send request');
            customersService.getCustomers().success(vm.AddData);
        };
        vm.AddData = function (data) {
            log.debug('got responce');
            vm.isReply = true;
            vm.gridData = data;
            //this.gridData = data;
        };
        vm.IsGridVisible = function () {
            // Shows/hides the delete button on hover
            log.debug('HoverGrid= ' + (vm.isReply == false));
            return vm.isReply == true;
        };
        
        ////
        vm.showDeleteOne = new UI.Dialog();
        vm.onCancelled = function (number) {
            notification('info', vm.ModalData["testvalue"] + 'cancelled ');
        };

        vm.onOk = function (number) {
            notification('info', vm.ModalData["testvalue"] + ' saved!');
        }; 

        vm.showModal = function () {
            $scope.$broadcast('showModalEvent', {
                someProp: 'Sending you an Object!' // посылайте что хотите
            });
        };
        
        vm.showModal1 = function () {            
            JSONShemaService.getRemote(customersService.getObjecName(),function(shemaValue){
                vm.ModalConfig = shemaValue;
                vm.showDeleteOne.open();
            },jl);
             
            //vm.ModalData["testvalue"] = vm.gridOptions.selectedItems[0].firstName;
            
        };
        
        vm.ModalConfig = {
            "properties": {
                "testvalue": {
                    "description": "Enter the argument value",
                    "label": "The Value",
                    "type": "java.lang.String",
                    "tooltip": "This is the tooltip",
                    "input-attributes": {
                        "placeholder": "Hello World!",
                        "value": "This is also an initial value"
                    }
                },
            }
        };
        vm.ModalData = {"testvalue": "Empty"};

    };
    //modal
    function modalCtrl($scope) {        
        var vm = this;
        $scope['vm'] = this;        
        vm.isEditing = false;
        log.debug('modalCtrl');
        vm.islVisible = function () {
            return vm.isEditing == true;
        };
        vm.hide = function () {
            vm.isEditing = false;
        };
        vm.show = function(){
            vm.isEditing = true;
        };

        $scope.$on('showModalEvent', function (event, data) {
            vm.show();
            console.log(data); // Данные, которые нам прислали
        });
        
    };
    // init
    hawtioPluginLoader.addModule(pluginName);
})(Customers || (Customers = {}));
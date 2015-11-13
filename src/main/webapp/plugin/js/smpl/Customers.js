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
    _module.service
    _module.run(['workspace', 'viewRegistry', 'layoutFull', 'paths', 'plugin', customersRun]);
    _module.controller('modalCtrl', ['$scope', modalCtrl]);
    _module.controller(controllerName, ['$scope', 'customersService', customersCtrl]);
   
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

    function customersCtrl($scope, customersService) {
        var vm = this;
        $scope['vm'] = this;
        log.debug('customersCtrl');
        vm.isReply = false;
        //this.myData = {};
        vm.gridOptions = {
            data: 'vm.gridData',
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
            notification('info', 'cancelled ' + number);
        };

        vm.onOk = function (number) {
            notification('info', number + ' ok!');
        }; 

        vm.showModal = function () {
            $scope.$broadcast('showModalEvent', {
                someProp: 'Sending you an Object!' // посылайте что хотите
            });
        };

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
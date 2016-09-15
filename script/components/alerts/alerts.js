(function () {
    'use strict';

    angular.module('nj-alerts', [])
        .directive('njAlerts', njAlerts);

    /*@ngInject*/
    function njAlerts () {
        var tmpl = [
                '<div ng-show="alert.showAlert" ng-class="alert.type" class="nj-alert" ng-repeat="alert in vm.alerts">',
                    '<button ng-if="alert.hasCloseButton" class="nj-close nj-icon small" icon="close_circle" ng-click="vm.close(alert.id)">close</button>',
                    '<p class="nj-table">',
                        '<span ng-show="alert.showIcon" class="nj-cell">',
                            '<i class="nj-icon rounded" icon="alert">check</i>',
                        '</span>',
                        '<span class="nj-cell">{{alert.message}}</span>',
                    '</p>',
                    '<div ng-if="(alert.extraButton | isDefined)" class="nj-center">',
                        '<a ng-class="type" class="nj-button link small" icon="right" ng-click="alert.extraButton.callback()">{{alert.extraButton.text | translate}}</a',
                    '</div>',
                '</div>'
        ];

        var directive = {
            scope: {
                hasCloseButton: '=',
                autoClose: '=',
                message: '=',
                type: '=',
                extraButton: '=',
                closeCallback: '='
            },
            template: function () {
                var templates = tmpl.join('');
                return templates;
            },
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: true,
            controller: alertsCtrl
        };

        return directive;
    }

    /*@ngInject*/
    function alertsCtrl ($scope, $compile, $element, $timeout) {
        /*jshint validthis: true */
        var vm = this;

        vm.close  = close;
        vm.alerts = {};

        activate();

        ////////////////////////////

        function activate () {
            _alertHandler();
        }

        /**
         * Remove alert.
         * @param  {integer} id Alert id.
         * @return {void}
         */
        function close (id) {
            if (angular.isDefined(vm.alerts[id])) {
                if (angular.isDefined(vm.alerts[id].closeCallback)) {
                    vm.alerts[id].closeCallback();
                }

                delete vm.alerts[id];
            }
        }

        /**
         * Add alert to the vm.alerts object.
         * @param  {alert} alert Alert object
         * @return {void}
         */
        function _notify (alert) {
            Number.isInteger = Number.isInteger || function (value) {
                return typeof value === 'number' &&
                       isFinite(value) &&
                       Math.floor(value) === value;
            };

            if (angular.isDefined(alert.autoClose) && Number.isInteger(alert.autoClose)) {
                $timeout(function () {
                    vm.close(alert.id);
                }, alert.autoClose);
            }

            vm.alerts[alert.id] = alert;
        }

        /**
         * Handle alert event and show alert message.
         * @return {void}
         */
        function _alertHandler () {
            $scope.$on('ALERT.ERROR', function (event, args) {
                args = args || {};
                var alert = {
                    type: 'negative',
                    message: args.message || 'COMMON.GENERIC_SERVER_ERROR'
                };

                alert = populateAlert(alert, args);
                _notify(alert);
            });

            $scope.$on('ALERT.WARNING', function (event, args) {
                args = args || {};
                var alert = {
                    type: 'warning',
                    message: args.message || 'COMMON.GENERIC_SERVER_ERROR'
                };

                alert = populateAlert(alert, args);
                _notify(alert);
            });

            $scope.$on('ALERT.NOTICE', function (event, args) {
                args = args || {};
                var alert = {
                    type: 'positive',
                    message: args.message || 'COMMON.GENERIC_SERVER_ERROR'
                };

                alert = populateAlert(alert, args);
                _notify(alert);
            });

            $scope.$on('ERROR.TIMEOUT', function (event, args) {
                args = args || {};
                var alert = {
                    type: args.type || 'warning',
                    message: args.message || 'COMMON.CONECTION_TIMEOUT'
                };

                alert = populateAlert(alert, args);
                _notify(alert);
            });

            /**
             * Populate the alert object with the args parameters.
             * @param  {alert}  alert Alert object to populate.
             * @param  {object} args  Arguments to insert in the alert.
             * @return {alert}  alert Alert object.
             */
            function populateAlert (alert, args) {
                alert.id = (new Date()).getTime(); //unique microtime id.
                alert.hasCloseButton = args.hasCloseButton || true;
                alert.showAlert = args.showAlert || true;
                alert.extraButton  = args.extraButton || undefined;
                alert.autoClose = args.autoClose || false;

                return alert;
            }
        }
    }

})();
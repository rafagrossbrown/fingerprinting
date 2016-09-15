var myApp = angular.module('myApp', [
	'nj-alerts',
	'nj-modals',
	'nj-dropdowns'
]);

myApp.controller('myCtrl', function ($scope, $location, $anchorScroll) {
  // hash navigation (demo only)
	$scope.scrollTo = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    $location.hash(old);
	};

	$scope.showData = function() {
    $scope.datalists = [
			{"name": "Alerts", "link": "alerts"},
	    {"name": "Buttons", "link": "buttons"},
			{"name": "Collapsibles", "link": "collapsibles"},
			{"name": "Checkboxes", "link": "checkboxes"},
			{"name": "Radio buttons", "link": "radios"},
			{"name": "Switches", "link": "switches"},
			{"name": "Drawers", "link": "drawers"},
			{"name": "Dropdowns", "link": "dropdowns"},
			{"name": "Headers", "link": "headers"},
			{"name": "Icons", "link": "icons"},
	    {"name": "Inputs", "link": "inputs"},
			{"name": "Lists", "link": "lists"},
			// {"name": "Modals", "link": "modals"},
	    {"name": "Spinners", "link": "spinners"},
	    {"name": "Typography", "link": "typography"},
	    {"name": "Grid", "link": "grid"}
		]
	};
  $scope.select= function(item) {
	  $scope.selected = item;
	}
	$scope.isActive = function(item) {
		return $scope.selected === item;
	}


	$scope.collapsed = false;
  $scope.toggleCollapse = function() {
    $scope.collapsed = !$scope.collapsed;
  }
	$scope.collapsedUsers = false;
  $scope.toggleCollapseUsers = function() {
    $scope.collapsedUsers = !$scope.collapsedUsers;
  }

	$scope.menuOn = false;
  $scope.toggleMenu = function() {
    $scope.menuOn = !$scope.menuOn;
  }

	$scope.demoModal1 = false;
  $scope.toggleDemoModal1 = function() {
    $scope.demoModal1 = !$scope.demoModal;
  };
	$scope.demoModal2 = false;
  $scope.toggleDemoModal2 = function() {
    $scope.demoModal2 = !$scope.demoModal;
  };
	$scope.demoModal3 = false;
  $scope.toggleDemoModal3 = function() {
    $scope.demoModal3 = !$scope.demoModal;
  };
	$scope.demoModal4 = false;
  $scope.toggleDemoModal4 = function() {
    $scope.demoModal4 = !$scope.demoModal;
  };

	$scope.demoAlert1 = false;
  $scope.toggleDemoAlert1 = function() {
    $scope.demoAlert1 = !$scope.demoAlert1;
  };
	$scope.demoAlert2 = false;
  $scope.toggleDemoAlert2 = function() {
    $scope.demoAlert2 = !$scope.demoAlert2;
  };
	$scope.demoAlert3 = false;
  $scope.toggleDemoAlert3 = function() {
    $scope.demoAlert3 = !$scope.demoAlert3;
  };
	$scope.demoAlert4 = false;
  $scope.toggleDemoAlert4 = function() {
    $scope.demoAlert4 = !$scope.demoAlert4;
  };
});
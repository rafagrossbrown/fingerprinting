angular.module('nj-dropdowns', [])
.directive('njDropdown', function() {
  var tmpl = [
    '<div ng-click="onClick()" ng-class="{active: expanded}">',
      '<button>{{buttonContent()}}</button>',
      '<ul>',
      '  <li ng-repeat="opt in options" ng-click="selectIndex($index)">{{opt}}</li>',
      '</ul>',
    '</div>'
  ];

  var tmplUser = [
    '<div ng-click="onClick()" ng-class="{active: expanded}">',
      '<button>',
      '  <i icon="{{buttonContent().icon}}">{{buttonContent().name.charAt(0)}}</i>',
      '  <span>',
      '    <span>{{buttonContent().name}}</span>',
      '    <span>{{buttonContent().phone}}</span>',
      '  </span>',
      '</button>',
      '<ul>',
      '  <li ng-repeat="opt in options" ng-click="selectIndex($index)">',
      '    <i icon="{{opt.icon}}">{{opt.name.charAt(0)}}</i>',
      '    <span>',
      '      <span>{{opt.name}}</span>',
      '      <span>{{opt.phone}}</span>',
      '    </span>',
      '  </li>',
      '</ul>',
    '</div>'
  ];

  return {
    restrict: 'E',
    scope: {
      options: "=",
      selected: "=",
      changed: "&"
    },
    template: function(elem,attrs) {
      return (attrs.template == "user") ?
               tmplUser.join("") : tmpl.join("")
    },
    link: function(scope, elem, attrs) {
      scope.expanded = false;
      scope.$watch('selected',function(){
        scope.selectedIndex = scope.options.indexOf(scope.selected);
      });
      // watch for the parent dialog becoming visible, set first option as default if no selected
      scope.$parent.$watch("ngShow", function(value) {
        if (value) {
          if (scope.selectedIndex >= 0) {
            scope.selectIndex(scope.selectedIndex);
          }
        }
      });

      scope.onClick = function() {
        scope.expanded = !scope.expanded;
      };

      scope.buttonContent = function() {
        return (scope.selectedIndex >= 0) ?
                  scope.options[scope.selectedIndex] :
                  (scope.selected) ?
                    scope.options[scope.selected] :
                    scope.options[0];
      };

      scope.selectIndex = function(index) {
        if (scope.selected !== undefined) {
          scope.selected = scope.options[index];
        }
        scope.selectedIndex = index;
        // make sure we close the combo once selection is over
        setTimeout(function() {
          scope.expanded = false;
        });
        if (scope.changed()) {
          scope.changed()(index);
        }
      };
    }
  };
});
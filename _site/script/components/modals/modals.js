angular.module('nj-modals', [])
.directive('njModal', function() {
  var tmplTop = [
    '<div class="nj-modal {{dialog}} ng-hide-animate" ng-show="show">',
      '<div class="nj-card" column>',
        '<header>'
  ];
  var tmplClose = '<button ng-click="hideModal()" class="nj-icon small" icon="close">close</button>';
  var tmplTitle = '<h2 class="nj-subtitle">{{modalTitle}}</h2>';
  var tmplBottom = [
          '</header>',
        '<div class="nj-card-content" ng-transclude></div>',
      '</div>',
    '</div>'
  ];

  return {
    restrict: 'E',
    scope: {
      show: '=',
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    template: function(elem,attrs) {
      var templates = tmplTop.join("");

      if (attrs.title) templates += tmplTitle;
      if (attrs.close) templates += tmplClose;
      templates += tmplBottom.join("");

      return templates;
    },
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };

      if (attrs.title)
        scope.modalTitle = attrs.title;

      if (attrs.template === "dialog")
        scope.dialog = attrs.template;
    }
  };
});
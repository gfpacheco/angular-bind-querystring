(function (angular) {

  angular
    .module('bindQuerystring')
    .factory('bindQuerystring', bindQuerystring);

    bindQuerystring.$inject = ['$rootScope', '$location'];

    function bindQuerystring($rootScope, $location) {
      return function(options) {
        options = options || {};

        options.scope = options.scope || $rootScope;
        options.parser = options.parser || identityFunction;
        options.formatter = options.formatter || identityFunction;

        function fromQuerystringToScope() {
          var params = $location.search();
          options.properties.forEach(function(property) {
            if (property in params) {
              options.target[property] = options.parser(params[property], property);
            }
          });
        }

        function fromScopeToQuerystring() {
          var params = $location.search();
          options.properties.forEach(function(property) {
            if (property in options.target) {
              params[property] = options.formatter(options.target[property], property);
            }
          });
          $location.search(params);
        }

        options.scope.$on('$locationChangeSuccess', fromQuerystringToScope);
        if (options.target instanceof $rootScope.constructor) {
          // target is an scope object
          options.target.$watchGroup(options.properties, fromScopeToQuerystring, true);
        } else {
          options.scope.$watch(function() {
            var watchTarget = {};
            options.properties.forEach(function(property) {
              if (property in options.target) {
                watchTarget[property] = options.target[property];
              }
            });
            return watchTarget;
          }, fromScopeToQuerystring, true);
        }

        fromQuerystringToScope();
        fromScopeToQuerystring();
      };
    }

    function identityFunction(value) {
      return value;
    }

})(angular);

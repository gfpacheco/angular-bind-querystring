(function (angular) {

  angular
    .module('bindQuerystring')
    .factory('bindQuerystring', bindQuerystring);

    bindQuerystring.$inject = ['$location'];

    function bindQuerystring($location) {
      return function(scope, property, options) {
        var propertyChain = property.split('.');
        property = propertyChain.pop();

        options = options || {};
        options.parser = options.parser || identityFunction;
        options.formatter = options.formatter || identityFunction;

        function getTarget() {
          return propertyChain.reduce(function(object, property) {
            return object && object[property];
          }, scope);
        }

        function fromQuerystringToScope() {
          var target = getTarget();
          if (target) {
            var params = $location.search();
            if (property in params) {
              target[property] = options.parser(params[property]);
            }
          }
        }

        function fromScopeToQuerystring() {
          var target = getTarget();
          if (target && property in target) {
            var params = $location.search();
            params[property] = options.formatter(target[property]);
            $location.search(params);
          }
        }

        scope.$on('$locationChangeSuccess', fromQuerystringToScope);
        scope.$watch(function() {
          var target = getTarget();
          return target && target[property];
        }, fromScopeToQuerystring);

        fromQuerystringToScope();
        fromScopeToQuerystring();
      };
    }

    function identityFunction(value) {
      return value;
    }

})(angular);

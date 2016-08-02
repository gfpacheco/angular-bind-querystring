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
          var params = $location.search();
          if (property in params) {
            var value = options.parser(params[property]);
            var target = getTarget();
            if (target) {
              target[property] = value;
            } else {
              options.default = value;
            }
          }
        }

        function fromScopeToQuerystring() {
          var params = $location.search();
          var target = getTarget();
          if (target) {
            var value = options.formatter(target[property] || options.default);
            if (value) {
              params[property] = value;
              $location.search(params);
            }
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

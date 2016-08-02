(function (angular) {

  angular
    .module('bindQuerystring')
    .factory('bindQuerystring', bindQuerystring);

    bindQuerystring.$inject = ['$location'];

    function bindQuerystring($location) {
      return function(scope, property, parser, formatter) {
        parser = parser || identityFunction;
        formatter = formatter || identityFunction;

        function fromQuerystringToScope() {
          var params = $location.search();

          if (property in params) {
            scope[property] = parser(params[property]);
          }
        }

        function fromScopeToQuerystring() {
          var params = $location.search();

          if (property in scope) {
            params[property] = formatter(scope[property]);
            $location.search(params);
          }
        }

        scope.$on('$locationChangeSuccess', fromQuerystringToScope);
        scope.$watch(property, fromScopeToQuerystring);

        fromQuerystringToScope();
        fromScopeToQuerystring();
      };
    }

    function identityFunction(value) {
      return value;
    }

})(angular);

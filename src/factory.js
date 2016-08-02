(function (angular) {

  angular
    .module('bindQuerystring')
    .factory('bindQuerystring', bindQuerystring);

    bindQuerystring.$inject = ['$location'];

    function bindQuerystring($location) {
      return function(scope, property) {
        function fromQuerystringToScope() {
          var params = $location.search();

          if (property in params) {
            scope[property] = params[property];
          }
        }

        function fromScopeToQuerystring() {
          var params = $location.search();

          if (property in scope) {
            params[property] = scope[property];
            $location.search(params);
          }
        }

        scope.$on('$locationChangeSuccess', fromQuerystringToScope);

        fromQuerystringToScope();
        fromScopeToQuerystring();
      };
    }

})(angular);

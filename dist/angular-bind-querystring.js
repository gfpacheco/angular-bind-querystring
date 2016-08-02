(function (angular) {

  angular
    .module('bindQuerystring', []);

})(angular);

(function (angular) {

  angular
    .module('bindQuerystring')
    .factory('bindQuerystring', bindQuerystring);

    bindQuerystring.$inject = ['$location'];

    function bindQuerystring($location) {
      return function(scope, property) {
        var params = $location.search();

        if (property in params) {
          scope[property] = params[property];
        } else if (property in scope) {
          params[property] = scope[property];
          $location.search(params);
        }
      };
    }

})(angular);

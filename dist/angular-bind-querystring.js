(function (angular) {

  angular
    .module('bindQuerystring', []);

})(angular);

(function (angular) {

  angular
    .module('bindQuerystring')
    .factory('bindQuerystring', bindQuerystring);

    function bindQuerystring() {
      return true;
    }

})(angular);

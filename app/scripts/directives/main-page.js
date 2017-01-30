window.angular.module('mogra-timer').directive('mainPage', () => {
  return {
    restrict: 'E',
    template:
    `
    <input ng-model="intervals"/>
    <hr/>
    {{intervals}}
    <div intervals="intervals"></div>
    `,
    controller: ($scope) => {
      $scope.intervals = '20,20'
    }
  }
})

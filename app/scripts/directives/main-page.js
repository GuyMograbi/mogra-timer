window.angular.module('mogra-timer').directive('mainPage', () => {
  return {
    restrict: 'E',
    template: `
    <input ng-model="intervals.value"/><br/>
    <input ng-model="intervals.name"/><br/>
    <button ng-click="newInterval()">Create new interval!</button>
    
    <div ng-repeat="interval in getAllIntervals() track by interval.id">{{interval.name}} <button ng-click="useThis(interval)">Use This</button><button ng-click="deleteThis(interval)">Delete This</button></div>
    <hr/>
    Current Interval:
    {{intervals.name}} - {{intervals.value}}
    <div intervals="intervals.value"></div>
    `,
    controller: ($scope, IntervalService) => {
      $scope.newInterval = () => {
        $scope.intervals = {id: Date.now(), name: 'Pomodoros', value: '20,20'}
      }

      $scope.deleteThis = (interval) => {
        if (window.confirm('are you sure?')) {
          IntervalService.delete(interval.id)
        }
      }

      $scope.useThis = (interval) => {
        $scope.intervals = interval
      }

      $scope.getAllIntervals = () => {
        return IntervalService.getAll()
      }

      $scope.intervals = IntervalService.get()
      if (!$scope.intervals) {
        $scope.newInterval()
      }

      $scope.$watch('intervals', () => {
        IntervalService.save($scope.intervals)
      }, true)
    }
  }
})

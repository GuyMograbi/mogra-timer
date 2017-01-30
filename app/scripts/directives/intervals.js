window.angular.module('mogra-timer').directive('intervals', () => {
  return {
    restrict: 'A',
    scope: {
      intervals: '<'
    },
    template: `
      <div>
        <button ng-click="restart()" ng-disabled="!!interval">Restart</button>
        <button ng-click="start()" ng-disabled="!!interval">Start</button>
        <button ng-click="stop()" ng-disabled="!interval">Stop</button>
      </div>
      <ul ng-repeat="interval in intervalsArr">
         <li ng-class="{active: interval.active}">{{interval.total}}</li>
      </ul>
      
      <div class="current-interval">
        {{Math.floor(getActive().remaining/60)}}min {{getActive().remaining%60}}sec  
      </div>
    `,
    controller: ($scope, $interval) => {
      const _ = window._
      $scope.Math = window.Math
      function playSound () {
        var myAudio = new window.Audio()        // create the audio object
        myAudio.src = 'http://soundbible.com/grab.php?id=2084&type=mp3' // assign the audio file to its src
        myAudio.play()
      }

      function init () {
        $scope.intervalsArr = $scope.intervals.split(',').map((interval) => {
          interval = interval.trim()
          return {
            total: ~~interval,
            remaining: ~~interval * 60, // intervals are in minutes
            active: false
          }
        })
      }

      $scope.restart = () => { init(); $scope.start() }

      $scope.start = () => {
        playSound()
        let active = $scope.getActive()
        if (!active) {
          active = _.first($scope.intervalsArr)
          active.active = true
        }
        $scope.interval = $interval(() => {
          let newOne = false
          if (active.remaining <= 3) {
            playSound()
          }
          if (active.remaining <= 0) {
            active.active = false
            const index = $scope.intervalsArr.indexOf(active)
            console.log('index is', index)
            if (index + 1 < $scope.intervalsArr.length) {
              active = $scope.intervalsArr[index + 1]
              active.active = true
              newOne = true
            } else {
              $scope.stop()
            }
          }
          if (!newOne) {
            active.remaining--
          }
        }, 1000)
      }

      $scope.stop = () => {
        $interval.cancel($scope.interval)
        $scope.interval = null
      }

      $scope.getActive = () => {
        return _.find($scope.intervalsArr, {active: true})
      }

      $scope.$watch('intervals', (newValue) => {
        if (!newValue) {
          return
        }
        init()
      })
    }
  }
})

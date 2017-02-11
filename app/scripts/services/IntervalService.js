window.angular.module('mogra-timer').service('IntervalService', function () {
  const {angular, _, localStorage} = window
  let allTimers = []

  function rebuildAll () {
    allTimers = _.map(_.filter(Object.keys(localStorage), (i) => i && i.indexOf('timer-') === 0), (k) => angular.fromJson(localStorage[k]))
  }
  rebuildAll() // on load

  function key (id) {
    return `timer-${id}`
  }
  this.save = (obj) => {
    localStorage.setItem(key(obj.id), angular.toJson(obj))
    localStorage.setItem('last-used', angular.toJson(obj))
    rebuildAll()
  }

  this.delete = (id) => {
    localStorage.removeItem(key(id))
    rebuildAll()
  }

  this.getAll = () => {
    return allTimers
  }

  this.get = (id = 'last-used') => {
    const objStr = localStorage.getItem(id)
    return objStr ? angular.fromJson(objStr) : null
  }
})

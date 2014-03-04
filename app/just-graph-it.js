var myApp = angular.module('myApp',[]);


myApp.config(['$locationProvider',function ($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.factory('store', function(){
  var save = function(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  };

  var append = function(key, value){
    var updateValue = get(key) || [];
    if( !Array.isArray(updateValue) ){ updateValue = []; }
    updateValue.push(value);
    console.log('appended:', updateValue);
    save(key, updateValue);
  };

  var get = function(key){
    var str = localStorage.getItem(key);
    return JSON.parse(str);
  };

  return {
    append: append,
    get: get
  };
});

myApp.directive('lineGraph', function ($location, store) {
  return {
    restrict: 'E',
    template: '<div />',
    scope: {
      data: '='
    },
    link: function (scope, elem, attrs) {
//      var data = [
//        {number:3, datetime:"2014-03-04T19:58:21.519Z"},
//        {number:4, datetime:"2014-03-04T19:58:22.519Z"},
//        {number:1, datetime:"2014-03-04T19:58:23.519Z"},
//        {number:5, datetime:"2014-03-04T19:58:24.519Z"}
//      ];

      //convert strings to datetimes




      function graph(data){

        data = data || [];
        data.forEach(function(i){i.dt = new Date(i.datetime) });


        var num = function(d){ return d.number};
        var minNum = d3.min(data, num);
        var maxNum = d3.max(data, num);

        var startDt = data[0].dt;
        var endDt = data[data.length-1].dt;

        var w = 600
        var h = 200;
        var margin = 20;

        var TIME_TICKS = 4;

        var y = d3.scale.linear()
          .domain( [ minNum, maxNum ] )
          .range([0 + margin, h - margin]);


        var x = d3.time.scale()
          .domain( [ startDt, endDt ] )
          .range([0 + margin, w - margin]);


        var xVal = function(d) { return x(d.dt); };
        var yVal = function(d) { return -1 * y(d.number); };

        d3.select("svg").remove();
        var vis = d3.select(elem[0])

          .append("svg:svg")
          .attr("width", w)
          .attr("height", h)

        var g = vis.append("svg:g")
          .attr("transform", "translate(0, 200)");

        var line = d3.svg.line()
          .x(xVal)
          .y(yVal)

        g.append("svg:path").attr("d", line(data));


//        g.append("svg:line")
//          .attr("x1", x(minNum))
//          .attr("y1", -1 * y(startDt))
//          .attr("x2", x(maxNum))
//          .attr("y2", -1 * y(startDt))

        g.append("svg:line")
          .attr("x1", 0+margin)
          .attr("y1", 0-margin)
          .attr("x2", w-margin)
          .attr("y2", 0-margin)

        g.append("svg:line")
          .attr("x1", 0+margin)
          .attr("y1", 0-margin)
          .attr("x2", 0+margin)
          .attr("y2", -h+margin)

        g.selectAll(".xLabel")
          .data(x.ticks(4))
          .enter().append("svg:text")
          .attr("class", "xLabel")
          .text(function(d) {
            //console.log('time label')
            //console.log('tick time', d);
            //console.log('tick time from start', moment(d).fromNow());
            return moment(d).fromNow();})
          .attr("x", function(d) { return x(d) })
          .attr("y", 0)
          .attr("text-anchor", "middle");



        g.selectAll(".yLabel")
          .data(y.ticks(4))
          .enter().append("svg:text")
          .attr("class", "yLabel")
          .text(String)
          .attr("x", 0)
          .attr("y", function(d) { return -1 * y(d) })
          .attr("text-anchor", "right")
          .attr("dy", 4);

      }

      //graph(data);
      scope.$watchCollection('[data.number, data.datetime]', function(newVal, oldVal){
        console.log('watched', newVal);
        if(newVal){ graph( store.get( $location.absUrl() ) );}
      });
    }
  };
});

function MainCtrl($scope, $location, store) {
  $scope.input = {};
  $scope.note =  {};
  $scope.note.nan = true;

  var key = $location.absUrl();

  $scope.save = function(){
    $scope.note.nan = $scope.input.number ? true : false;
    if (!$scope.note.nan){ return $scope.note.nan; }
    $scope.input.datetime = moment();
    store.append(key, $scope.input);
  };

}
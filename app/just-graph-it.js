var myApp = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/input.html', {
      templateUrl: '/justgraphit/app/input/input.html',
      controller: MainCtrl
    })
    .when('/edit/:graphId', {
      templateUrl: 'app/edit.html',
      controller: MainCtrl
    })
    .otherwise({redirectTo : '/input.html'});
//  $routeProvider.when('/Book/:bookId/ch/:chapterId', {
//    templateUrl: 'chapter.html',
//    controller: ChapterCntl
//  });

  $locationProvider.html5Mode(true);
});

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.factory('store', function(){

  var append = function(key, value){
    var updateValue = get(key) || [];
    if( !Array.isArray(updateValue) ){ updateValue = []; }
    updateValue.push(value);
    save(key, updateValue);
  };

  var clear = function(key){
    //ToDo: consider regex to only clear our stuff
    localStorage.removeItem(key);
  };

  var get = function(key){
    var str = localStorage.getItem(key);
    return JSON.parse(str);
  };

  var makeGraphKey = function(prefix, graphId){
    if(!prefix){ return null; }
    if(!(graphId>=0)){ return null; }
    return ''+prefix+'-graphId-'+graphId;
  };

  var save = function(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    append: append,
    clear: clear,
    get: get,
    makeGraphKey: makeGraphKey
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

      function graph(data){
        if(!data || !data.length){
          d3.select("svg").remove();
          return null
        }


        data = data || [];
        data.forEach(function(i){i.dt = new Date(i.datetime) });

        var num = function(d){ return d.number};
        var minNum = d3.min(data, num);
        var maxNum = d3.max(data, num);

        var startDt = data[0].dt;
        var endDt = data[data.length-1].dt;

        var w = 400;
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
          .data(x.ticks(3))
          .enter().append("svg:text")
          .attr("class", "xLabel")
          .text(function(d) { return moment(d).fromNow();})
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

      function getGraphData(graphId){
        var graphKey = store.makeGraphKey($location.host(), graphId );
        return store.get(graphKey);
      }

      //graph(data);
      scope.$watchCollection('[data.number, data.datetime]', function(newVal, oldVal){
        console.log('watched', newVal, scope.data);
        if(newVal){
          graph( getGraphData( scope.data.graphId) );
        }
      });
    }
  };
});

function MainCtrl($scope, $location, $timeout, store) {
  $scope.input = {};
  $scope.note =  {};
  $scope.note.nan = true;

  //we include the graphId with the input
  //so that's its readily accessible when a new data
  //point is entered
  $scope.input.graphId=0;
  $scope.graphs = [];
  $scope.graphs[0] = {};
  $scope.graphs[0].name = "my first graph";



  $scope.save = function(){
    var key = store.makeGraphKey($location.host(), $scope.input.graphId);
    $scope.note.nan = $scope.input.number ? true : false;
    if (!$scope.note.nan){ return $scope.note.nan; }
    $scope.input.datetime = moment();
    store.append(key, $scope.input);
  };

  $scope.clear = function(){
    var key = store.makeGraphKey($location.host(), $scope.input.graphId);
    store.clear(key);
    $timeout(function(){
      $scope.input.number = null;
      $scope.input.datetime = null;
    });


  };

}


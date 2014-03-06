var myApp = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/input.html', {
      templateUrl: '/app/input/input.html',
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

  //$locationProvider.html5Mode(true);
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

  var getAll = function(prefix){
    var keys = getAllKeys(prefix);
    var all = {};
    keys.forEach(function(k){
      var val = localStorage.getItem(k);
      all[k] = val;
    });
    return all;
  };

  var getAllKeys = function(prefix){
    var matcher = /^prefix/;
    var keys = []
    for (var key in localStorage){
      if( key.match(matcher) ){
        keys.push(key);
      }
    }
    return keys;
  };

  var makeGraphKey = function(prefix, graphId){
    console.log(prefix, graphId);
    if(!prefix){ console.log('a');return null; }
    if(!graphId && graphId !== 0){ console.log('b'); return null; }
    return ''+prefix+'-graphId-'+graphId;
  };

  var save = function(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {
    append: append,
    clear: clear,
    get: get,
    getAll: getAll,
    getAllKeys: getAllKeys,
    makeGraphKey: makeGraphKey,
    save: save
  };
});

myApp.directive('lineGraph', function ($location, store) {
  return {
    restrict: 'E',
    template: '<div />',
    scope: {
      data: '=',
      graphInput: '='
    },
    link: function (scope, elem, attrs) {

      var GRAPH_STORE = $location.host()+'-jgi';

      function graph(data){
        if(!data && data !== 0 ){
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
        var graphKey = store.makeGraphKey(GRAPH_STORE, graphId );
        return store.get(graphKey);
      }

      //graph(data);
      scope.$watchCollection('[data.number, data.datetime, data.graphId]', function(newVal, oldVal){
        console.log('watched', newVal, scope.data);
        if(newVal){
          graph( getGraphData( scope.data.graphId) );
        }
      });
    }
  };
});

function MainCtrl($scope, $location, $timeout, $filter, store) {
  var WATCH_INPUT_TEXT_DELAY = 500;
  var GRAPH_STORE = $location.host()+'-jgi';
  var DEFAULT_GRAPH_NAME = 'my first graph';
  $scope.input = {};
  $scope.note =  {};
  $scope.note.nan = false;
  //$scope.graphs = [];

  $scope.graphs = {};


  //initialize graph meta
  var initMeta = graphMeta();
  $scope.graphs.list = initMeta.list || [];
  $scope.input.name = initMeta.currentGraph || DEFAULT_GRAPH_NAME;
  $scope.input.graphId = getSetGraphId($scope.input.name, $scope.graphs.list);
  console.log('afterinit', $scope.graphs, $scope.input);

  //


  // private functions

  function clearGraph(){
    //call digest to clear graph
    $timeout(function(){
      console.log('clearing graph');
      $scope.input.graphId = null;
//      $scope.input.number = null;
//      $scope.input.datetime = null;
    });
  }

  function getGraphId(name, list){
    var idx = list.indexOf(name);
    if (idx>-1) {
      return idx;
    } else {
      return null;
    }
  }

  function getSetGraphId(name, list){

    var idx = getGraphId(name, list);

    console.log('getset idx', idx);

    // return the id if we already have the graph in the list
    if ( idx !== null ) { console.log('already set, returning', idx); return idx; }
    console.log('creating id');

    // otherwise add the name
    list.push(name);
    var meta = { list: list, currentGraph: name };

    saveGraphMeta(meta);

    return list.length-1
  }

  function graphMeta(){
    var meta = store.get(GRAPH_STORE);
    if(!meta){ meta = {}; }
    if(!meta.list){ meta.list=[] }
    return meta;
  }

  function saveGraphMeta(meta){
    store.save(GRAPH_STORE, meta)
  }

  // watch function
  // [$scope.]graphs.filterList defined in html ng-repeat filter directive
  // We're watching the first two elements of the array to detect when the input.name
  // model coalesces to a single match.
  $scope.$watchCollection('[graphs.filterList[0], graphs.filterList[1], graphs.list[0]]', function(newVal, oldVal){
    if ($scope.input.name === DEFAULT_GRAPH_NAME){
      //a bit stinky as this breaks if the default graph is not the first graph
      return false;
    }
    var currentId = $scope.input.graphId;


    //initial watch
    console.log('W -- new old', newVal, oldVal);
//    if(typeof newVal[0] === 'undefined' && typeof oldVal[0] === 'undefined'){
//      return currentId;
//    }

    console.log('W -- watch names', $scope.input.name, newVal[0])
    if(!newVal){ return currentId; }
    console.log('filterList', newVal );
    if( !newVal[0] && !newVal[1] ){
      console.log('W -- New Name');
      clearGraph();
      return false;
    }
    if( newVal[0] && !newVal[1] ){
      console.log('W -- one match');
      $scope.input.graphId = getGraphId(newVal[0], $scope.graphs.list)
    } else {
      console.log('W -- something else', !!newVal[0].length, !!newVal[1].length);
      return currentId;
    }
    return currentId;
  });

  // scope functions

  $scope.checkName = function(){
    $scope.input.graphId = getGraphId($scope.input.name, $scope.graphs.list);
    var meta = { list: $scope.graphs.list, currentGraph: $scope.input.name };

    saveGraphMeta(meta);
  }

  $scope.save = function(){

    //validate input
    $scope.note.nan = isNaN( parseFloat($scope.input.number) );
    // ignore if we try to graph a non-number
    if ($scope.note.nan){ return !$scope.note.nan; }

    var id = getSetGraphId($scope.input.name, $scope.graphs.list);

    $scope.input.datetime = moment();
    var key = store.makeGraphKey(GRAPH_STORE, id);

    store.append(key, {number: $scope.input.number, datetime: $scope.input.datetime});
  };

  $scope.clear = function(){
    var id = getSetGraphId($scope.input.name, $scope.graphs.list);

    var key = store.makeGraphKey(GRAPH_STORE, id);

    store.clear(key);
    clearGraph();

  };

  var showDropTimer;
  $scope.showDrop = function(){
    $scope.dropVis={
      display: 'block',
      right: 0,
      left: 'auto'
    };
    $timeout.cancel(showDropTimer);
    showDropTimer = $timeout(function(){
      $scope.dropVis={display: 'none'}
      showDropTimer = null;
    },3500);
  }

}


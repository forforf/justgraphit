var myApp = angular.module('myApp',['ngRoute']);


myApp.config(function($routeProvider) {
  $routeProvider
    .when('/input.html', {
      templateUrl: '/app/input/input.html',
      controller: InputCtrl
    })
    .when('/edit.html', {
      templateUrl: 'app/edit/edit.html',
      controller: EditCtrl
    })
    .when('/about.html', {
      templateUrl: 'app/about/about.html',
      controller: AboutCtrl
    })
    .otherwise({redirectTo : '/input.html'});

});

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.factory('browserStorage', function($window, $location){

  //ToDo: App Id belongs in App, not here
  var appId = 'jgi';

  var makeGraphKeyPrefix = function(appId){
    appId = appId || 'local-storage-prefix';
    return appId + '-' + $window.btoa($location.host());
  };

  // binding manually so it's easy to change the API in the future
  var getItem = $window.localStorage.getItem.bind($window.localStorage);
  var removeItem = $window.localStorage.removeItem.bind($window.localStorage);
  var setItem = $window.localStorage.setItem.bind($window.localStorage);
  return {

    appId: appId,

    // Need to call the native btoa function in the context of window
    encode: function(s){ return $window.btoa.call($window, s) },

    prefix: makeGraphKeyPrefix(appId),

    getItem: getItem,
    removeItem: removeItem,
    setItem: setItem

  };
});

myApp.factory('nav', function(){
  var pageName = '';

  return {
    pageName: pageName
  }
});

myApp.factory('graphInfo', function(){
  var input = {};
  var graphs = {};

  return {
    input: input,
    graphs: graphs
  }
});

//Abstracts the actual storage from the app
myApp.factory('store', function(browserStorage){

  var append = function(key, value){
    var updateValue = get(key) || [];
    if( !Array.isArray(updateValue) ){ updateValue = []; }
    updateValue.push(value);
    save(key, updateValue);
  };

  var clear = function(key){
    var re = RegExp(browserStorage.appId);
    if(key.match(re)){
      browserStorage.removeItem(key);
    } else {
      console.error('JustGraphIt tried to delete a key that had no matching App Id');
    }
  };

  var get = function(key){
    var str = browserStorage.getItem(key);
    return JSON.parse(str);
  };

  var getAll = function(prefix){
    var keys = getAllKeys(prefix);
    var all = {};
    keys.forEach(function(k){
      var val = browserStorage.getItem(k);
      all[k] = val;
    });
    return all;
  };

  var getAllKeys = function(prefix){
    var matcher = /^prefix/;
    var keys = []
    for (var key in browserStorage){
      if( key.match(matcher) ){
        keys.push(key);
      }
    }
    return keys;
  };

  var makeGraphKey = function(prefix, graphId){
    if(!prefix){ return null; }
    if(!graphId && graphId !== 0){ return null; }
    return ''+prefix+'-graphId-'+graphId;
  };

  var save = function(key, value){
    browserStorage.setItem(key, JSON.stringify(value));
  };

  var getStorageId = function(graphId){
    var prefix = browserStorage.prefix;
    return makeGraphKey(prefix, graphId);
  };

  return {
    append: append,
    clear: clear,
    get: get,
    getAll: getAll,
    getAllKeys: getAllKeys,
    getStorageId: getStorageId,
    makeGraphKey: makeGraphKey,
    save: save
  };
});

myApp.directive('lineGraph', function (browserStorage, store) {
  return {
    restrict: 'E',
    template: '',
    scope: {
      data: '=',
      graphInput: '='
    },
    link: function (scope, elem, attrs) {

      var STORAGE_PREFIX = browserStorage.prefix;
      var GRAPH_FACTOR = 0.1; // % graph should be larger than numbers

      function areClose(num1, num2, factor){
        if( (num1 < num2*(1+factor) ) && (num1 > num2*(1-factor) ) ){
          return true;
        }
        return false;
      }

      function graph(data){
        //remove previous
        elem.find("svg").remove();
        elem.find("div").remove();

        console.log('data', data);
        if(!data && data !== 0 ){
          return null;
        }

        data.forEach(function(i){i.dt = new Date(i.datetime) });

        if(data.length === 1){
          console.log('length is 1');
          d3.select(elem[0])
            .append("div")
            .attr("class","graph-one-datapoint")
            .selectAll("text")
            .data(data)
            .enter()
            .append("div")
            .text(function(d){ return d.number })
            .attr("class", "number")
            .append("div")
            .text(function(d){ return  moment(d.dt).fromNow()})
            .attr("class","datetime");
          return null;
        }

        var num = function(d){ return d.number};
        var minNum = d3.min(data, num);
        var maxNum = d3.max(data, num);

        //reset mins and maxs so all data fits inside graph
        minNum = minNum - Math.abs(minNum*GRAPH_FACTOR);
        maxNum = maxNum + Math.abs(maxNum*GRAPH_FACTOR);






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

      //ToDo: Refactor to use updated methods for getting Id (no prefix)
      function getGraphData(graphId){
        var graphKey = store.makeGraphKey(STORAGE_PREFIX, graphId );
        return store.get(graphKey);
      }

      //graph(data);
      scope.$watchCollection('[data.number, data.datetime, data.graphId]', function(newVal, oldVal){
        if(newVal){
          graph( getGraphData( scope.data.graphId) );
        }
      });
    }
  };
});

myApp.directive('passFocusTo', function ($timeout) {
  return {
    restrict: 'E',
    scope: {
      focusTo: '='
    },
    link: function (scope, element, attrs) {
      scope.$watch('focusTo', function(newVal){
        if(newVal) {
          $timeout(function(){
            $('body').find(newVal)[0].focus();
          });
        }
      });
    }
  };
});

function MainCtrl($scope, nav){
  $scope.nav = nav;
}

function AboutCtrl($scope, nav){
  $scope.nav = nav;
  nav.pageName = 'about';
  var faq = {};
  faq["Where is my data stored?"] = "The data is stored on the local device, the network never sees it.";
  faq["Do I need a network connection?"] = "Only to get to the initial page, after that no network is required.";
  faq["How much is it?"] = "Free.";
  faq["I don\'t see any ads?"] = "No Ads.";

  $scope.faq = faq;
}



function InputCtrl($scope, $timeout, browserStorage, store, graphInfo, nav) {

  //Constants
  var DROPDOWN_VISIBILITY_TIMER = 3500;
  var STORAGE_PREFIX = browserStorage.prefix;
  var DEFAULT_GRAPH_NAME = 'my first graph';

  //initialization
  $scope.input = graphInfo.input;
  $scope.note =  {};
  $scope.note.nan = false;
  $scope.graphs = graphInfo.graphs;
  $scope.focusTo = null;
  nav.pageName = 'input';

  //initialize graph meta
  var initMeta = graphMeta();
  $scope.graphs.list = $scope.graphs.list || initMeta.list || [];
  $scope.input.name = $scope.input.name || initMeta.currentGraph || DEFAULT_GRAPH_NAME;
  $scope.input.graphId = getSetGraphId($scope.input.name, $scope.graphs.list);


  // private functions

  function calculateGraphId(name){
    return browserStorage.encode(name);
  }

  function clearGraph(){
    //call digest to clear graph
    $timeout(function(){
      $scope.input.graphId = null;
    });
  }

  function getGraphId(name, list){
    var idx = list.indexOf(name);
    if (idx>-1) {
      return calculateGraphId(name);
    } else {
      return null;
    }
  }

  function getSetGraphId(name, list){

    var id = getGraphId(name, list);


    // return the id if we already have the graph in the list
    if ( id !== null ) { return id; }

    // otherwise add the name
    list.push(name);
    var meta = { list: list, currentGraph: name };

    saveGraphMeta(meta);

    return browserStorage.encode(name);
  }

  function graphMeta(){
    var meta = store.get(STORAGE_PREFIX);
    if(!meta){ meta = {}; }
    if(!meta.list){ meta.list=[] }
    return meta;
  }

  function isEmpty(item){
    if( typeof item === 'undefined'){ return true }
    if( item === null ){ return true }
    if( item.length === 0 ){ return true }
    return false;
  }

  function isNotEmpty(item){
    return !isEmpty(item);
  }

  function refreshGraph(graphId){
    $scope.input.graphId = null;
    $timeout(function(){
      $scope.input.graphId = graphId;
    });
  }

  function saveGraphMeta(meta){
    store.save(STORAGE_PREFIX, meta)
  }

  // watch function
  // [$scope.]graphs.filterList defined in html ng-repeat filter directive
  // We're watching the first two elements of the array to detect when the input.name
  // model coalesces to a single match.
  $scope.$watchCollection('[graphs.filterList[0], graphs.filterList[1], graphs.list[0]]', function(newVal, oldVal){

    //The name of the graph matches the id (id is used for getting the graph data)
    if( $scope.input.graphId === calculateGraphId($scope.input.name) ){
      // this refreshes the graph
      // might be able to get rid of this refresh if all corner cases where
      // the graph doesn't show up are taken care of
      refreshGraph( getGraphId($scope.input.name, $scope.graphs.list) );
      return false;  //break out fo watch
    }

    var currentId = $scope.input.graphId;

    // shouldn't happen
    if( isEmpty(newVal) ){ return currentId; }

    var nameNotMatchAny = isEmpty(newVal[0]) &&  isEmpty(newVal[1]);
    if( nameNotMatchAny ){
      //new graph name is not created until a data point is saved
      clearGraph();
      return false;  //break out fo watch
    }

    var justOneMatch = isNotEmpty(newVal[0]) && isEmpty(newVal[1]);
    if( justOneMatch ){
      $scope.input.graphId = getGraphId(newVal[0], $scope.graphs.list)
    } else {
      return false; //break out fo watch
    }
  });

  // scope functions

  //set the graph to the current name and save as current graph.
  $scope.setCurrentName = function(){
    $scope.input.graphId = getGraphId($scope.input.name, $scope.graphs.list);
    var meta = { list: $scope.graphs.list, currentGraph: $scope.input.name };

    saveGraphMeta(meta);
    $scope.focusTo = '#input-number';
    //reset so next change can retrigger focus
    $timeout(function(){ $scope.focusTo = null });
  };

  $scope.removeGraph = function(name){
    var id = getSetGraphId(name, $scope.graphs.list);

    var key = store.makeGraphKey(STORAGE_PREFIX, id);

    store.clear(key);
    clearGraph();

    //remove from list (array of names)
    var idx = $scope.graphs.list.indexOf(name);
    if (idx > -1) {
      $scope.graphs.list.splice(idx, 1);
    }

    // if removing the current graph reset graph to first in the list
    if (name == $scope.input.name){
      $scope.input.name = $scope.graphs.list[0];
      $scope.input.graphId = getGraphId($scope.input.name, $scope.graphs.list);
    }
    saveGraphMeta({ list: $scope.graphs.list, currentGraph: $scope.input.name });
  };

  $scope.save = function(){

    //validate input
    $scope.note.nan = isNaN( parseFloat($scope.input.number) );

    // ignore if we try to graph a non-number
    if ($scope.note.nan){ return !$scope.note.nan; }

    var id = getSetGraphId($scope.input.name, $scope.graphs.list);

    $scope.input.datetime = moment();
    var key = store.makeGraphKey(STORAGE_PREFIX, id);

    store.append(key, {number: $scope.input.number, datetime: $scope.input.datetime});

    //clear number
    $scope.input.number = '';
  };

  $scope.clear = function(){
    var id = getSetGraphId($scope.input.name, $scope.graphs.list);

    var key = store.makeGraphKey(STORAGE_PREFIX, id);

    store.clear(key);
    clearGraph();
    refreshGraph(id);
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
    },DROPDOWN_VISIBILITY_TIMER);
  }

}

function EditCtrl($scope, graphInfo, store, nav){
  nav.pageName = 'edit';

  $scope.input = graphInfo.input;
  //browserStorage.encode(name);
  var storageId = store.getStorageId($scope.input.graphId);
  console.log('storage Id', storageId);
  $scope.graphData = store.get(storageId);
  console.log('graphData', $scope.graphData);

  $scope.ago = function(datetime){
    return moment(datetime).fromNow();
  };

  $scope.localTime = function(datetime){
    return moment(datetime).format('llll');
  };

  $scope.saveGraphData = function(){
    store.save(storageId, $scope.graphData);
  };

  //Not implemented yet
//  $scope.clear = function(){
//    var id = getSetGraphId($scope.input.name, $scope.graphs.list);
//
//    var key = store.makeGraphKey(STORAGE_PREFIX, id);
//
//    store.clear(key);
//    clearGraph();
//    refreshGraph(id);
//  };

}
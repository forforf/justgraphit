import {Directive, ElementRef, Renderer, Input, OnInit} from 'angular2/core';
//import {BrowserStorageService} from 'app/services/browser-storage/browser-storage.service'
import {StoreService} from 'app/services/store/store.service'
import {GraphInfoService} from 'app/services/graph-info/graph-info.service'
import {AppMetadataService} from 'app/services/app-metadata/app-metadata.service'
import {Observable, Subject} from 'rxjs/Rx'

//noinspection TypeScriptCheckImport
import * as moment_ from 'moment';

//noinspection TypeScriptCheckImport
import * as d3 from 'd3';

console.log(d3);
// under systemjs, moment is actually exported as the default export, so we account for that
//noinspection TypeScriptUnresolvedVariable
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;


@Directive({
    selector: 'line-graph',
    //input: ['currentGraphId']
})

export class AppLineGraphComponent  {
    // % graph axis should extend past max y
    public graphFactor;
    public graphData;
    public currentGraphId;
    public onSaveSubscription;
    private _el;
    private _renderer;

    constructor(
        el: ElementRef,
        renderer: Renderer,
        private _store: StoreService,
        private _meta: AppMetadataService
    ){
        this._el = el;
        this._renderer = renderer;
        // % graph axis should extend past max y
        this.graphFactor = 0.1;
    }

    graph(data) {

        // ToDo: Using nativeElement is frowned upon as it binds the directive to the native DOM
        var elem:HTMLElement = this._el.nativeElement;
        //remove previous

        //elem.find("svg").remove();
        //elem.find("div").remove();
        //noinspection TypeScriptUnresolvedFunction
        d3.select(elem).selectAll("*").remove();

        if(!data && data !== 0 ){
            return null;
        }

        console.log('graph this data: ', data);
        data.forEach(function(i){i['dt'] = new Date(i.datetime) });

        console.log('data length: ', data.length);
        if(data.length ===0 ) { return null }
        if(data.length === 1){
            console.log('length is 1');
            d3.select(elem)
                .append("div")
                .attr("class","graph-one-datapoint")
                .selectAll("text")
                .data(data)
                .enter()
                .append("div")
                .text(function(d){ return d.number })
                .attr("class", "number")
                .append("div")
                .text(function(d){ //noinspection TypeScriptValidateTypes
                    return  moment(d.dt).fromNow()})
                .attr("class","datetime");
            return null;
        }

        var num = function(d){ return d.number};
        var minNum = d3.min(data, num);
        var maxNum = d3.max(data, num);

        //reset mins and maxs so all data fits inside graph
        minNum = minNum - Math.abs(minNum*this.graphFactor);
        maxNum = maxNum + Math.abs(maxNum*this.graphFactor);

        var startDt = data[0].dt;
        var endDt = data[data.length-1].dt;

        var w = 400;
        var h = 200;
        var margin = 20;

        var y = d3.scale.linear()
            .domain( [ minNum, maxNum ] )
            .range([0 + margin, h - margin]);


        //noinspection TypeScriptUnresolvedFunction
        var x = d3.time.scale()
            .domain( [ startDt, endDt ] )
            .range([0 + margin, w - margin]);


        var xVal = function(d) { //noinspection TypeScriptValidateTypes
            return x(d.dt); };
        var yVal = function(d) { //noinspection TypeScriptValidateTypes
            return -1 * y(d.number); };


        var vis = d3.select(elem)

            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)

        var g = vis.append("svg:g")
            .attr("transform", "translate(0, 200)");

        var line = d3.svg.line()
            .x(xVal)
            .y(yVal)

        g.append("svg:path").attr("d", line(data));

        //g.append("svg:line")
        //  .attr("x1", x(minNum))
        //  .attr("y1", -1 * y(startDt))
        //  .attr("x2", x(maxNum))
        //  .attr("y2", -1 * y(startDt))

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
            .text(function(d) { //noinspection TypeScriptValidateTypes
                return moment(d).fromNow();})
            .attr("x", function(d) { //noinspection TypeScriptValidateTypes
                return x(d) })
            .attr("y", 0)
            .attr("text-anchor", "middle");

        g.selectAll(".yLabel")
            .data(y.ticks(4))
            .enter().append("svg:text")
            .attr("class", "yLabel")
            .text(String)
            .attr("x", 0)
            .attr("y", function(d) { //noinspection TypeScriptValidateTypes
                return -1 * y(d) })
            .attr("text-anchor", "right")
            .attr("dy", 4);


        console.log("graph vis: ", vis, g);
    }

    getGraphData(storageKey) {
        console.log('getting Graph data from key: ', storageKey);

        // returns null if key does not exist
        return this._store.getVal( storageKey );
    }

    ngOnInit(){
        var self = this;

        this.onSaveSubscription = this._meta.appSubject
            .subscribe(
                function(graphId) { console.log('rx evt update graphId:', graphId); self.graph( self.getGraphData(graphId )) },
                function(error) { console.error('Error getting key from save operation: ', error)},
                function() { console.log('onSaveSubscription completed')}
            );
        // Filter the subject so we only get notified if our graph changed
        //noinspection TypeScriptValidateTypes
        this.onSaveSubscription = this._store.onSaveSubject
            .filter( function(evt, idx, obs){
                //STOPHERE
                //Figure out appId and how to retrieve it and generate it
                //Currently both store.service and browser-storage.service have
                //methods that are not exactly aligned
                //Once we have an appId we can trust, use that to filter the
                //onSave events so we only get notified for the graph we are interested in.
                console.log('rx filter: ', evt);
                //return evt;
                var re = RegExp(self._meta.appId);
                return evt.match(re)
            })
            .subscribe(
            function(key) { console.log('rx evt key:', key); self.graph( self.getGraphData(key) ) },
            function(error) { console.error('Error getting key from save operation: ', error)},
            function() { console.log('onSaveSubscription completed')}
        );
        //this.graph( this.getGraphData(this.currentGraphId) );
    }
}
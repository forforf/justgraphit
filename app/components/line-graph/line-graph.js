System.register(['angular2/core', 'app/services/store/store.service', 'app/services/app-metadata/app-metadata.service', 'moment', 'd3'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, store_service_1, app_metadata_service_1, moment_, d3;
    var moment, AppLineGraphComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_service_1_1) {
                store_service_1 = store_service_1_1;
            },
            function (app_metadata_service_1_1) {
                app_metadata_service_1 = app_metadata_service_1_1;
            },
            function (moment_1) {
                moment_ = moment_1;
            },
            function (d3_1) {
                d3 = d3_1;
            }],
        execute: function() {
            console.log(d3);
            // under systemjs, moment is actually exported as the default export, so we account for that
            //noinspection TypeScriptUnresolvedVariable
            moment = moment_['default'] || moment_;
            AppLineGraphComponent = (function () {
                function AppLineGraphComponent(el, renderer, _store, _meta) {
                    this._store = _store;
                    this._meta = _meta;
                    this._el = el;
                    this._renderer = renderer;
                    // % graph axis should extend past max y
                    this.graphFactor = 0.1;
                }
                AppLineGraphComponent.prototype.graph = function (data) {
                    // ToDo: Using nativeElement is frowned upon as it binds the directive to the native DOM
                    var elem = this._el.nativeElement;
                    //remove previous
                    //elem.find("svg").remove();
                    //elem.find("div").remove();
                    //noinspection TypeScriptUnresolvedFunction
                    d3.select(elem).selectAll("*").remove();
                    if (!data && data !== 0) {
                        return null;
                    }
                    console.log('graph this data: ', data);
                    data.forEach(function (i) { i['dt'] = new Date(i.datetime); });
                    console.log('data length: ', data.length);
                    if (data.length === 0) {
                        return null;
                    }
                    if (data.length === 1) {
                        console.log('length is 1');
                        d3.select(elem)
                            .append("div")
                            .attr("class", "graph-one-datapoint")
                            .selectAll("text")
                            .data(data)
                            .enter()
                            .append("div")
                            .text(function (d) { return d.number; })
                            .attr("class", "number")
                            .append("div")
                            .text(function (d) {
                            return moment(d.dt).fromNow();
                        })
                            .attr("class", "datetime");
                        return null;
                    }
                    var num = function (d) { return d.number; };
                    var minNum = d3.min(data, num);
                    var maxNum = d3.max(data, num);
                    //reset mins and maxs so all data fits inside graph
                    minNum = minNum - Math.abs(minNum * this.graphFactor);
                    maxNum = maxNum + Math.abs(maxNum * this.graphFactor);
                    var startDt = data[0].dt;
                    var endDt = data[data.length - 1].dt;
                    var w = 400;
                    var h = 200;
                    var margin = 20;
                    var y = d3.scale.linear()
                        .domain([minNum, maxNum])
                        .range([0 + margin, h - margin]);
                    //noinspection TypeScriptUnresolvedFunction
                    var x = d3.time.scale()
                        .domain([startDt, endDt])
                        .range([0 + margin, w - margin]);
                    var xVal = function (d) {
                        return x(d.dt);
                    };
                    var yVal = function (d) {
                        return -1 * y(d.number);
                    };
                    var vis = d3.select(elem)
                        .append("svg:svg")
                        .attr("width", w)
                        .attr("height", h);
                    var g = vis.append("svg:g")
                        .attr("transform", "translate(0, 200)");
                    var line = d3.svg.line()
                        .x(xVal)
                        .y(yVal);
                    g.append("svg:path").attr("d", line(data));
                    //g.append("svg:line")
                    //  .attr("x1", x(minNum))
                    //  .attr("y1", -1 * y(startDt))
                    //  .attr("x2", x(maxNum))
                    //  .attr("y2", -1 * y(startDt))
                    g.append("svg:line")
                        .attr("x1", 0 + margin)
                        .attr("y1", 0 - margin)
                        .attr("x2", w - margin)
                        .attr("y2", 0 - margin);
                    g.append("svg:line")
                        .attr("x1", 0 + margin)
                        .attr("y1", 0 - margin)
                        .attr("x2", 0 + margin)
                        .attr("y2", -h + margin);
                    g.selectAll(".xLabel")
                        .data(x.ticks(3))
                        .enter().append("svg:text")
                        .attr("class", "xLabel")
                        .text(function (d) {
                        return moment(d).fromNow();
                    })
                        .attr("x", function (d) {
                        return x(d);
                    })
                        .attr("y", 0)
                        .attr("text-anchor", "middle");
                    g.selectAll(".yLabel")
                        .data(y.ticks(4))
                        .enter().append("svg:text")
                        .attr("class", "yLabel")
                        .text(String)
                        .attr("x", 0)
                        .attr("y", function (d) {
                        return -1 * y(d);
                    })
                        .attr("text-anchor", "right")
                        .attr("dy", 4);
                    console.log("graph vis: ", vis, g);
                };
                AppLineGraphComponent.prototype.getGraphData = function (storageKey) {
                    console.log('getting Graph data from key: ', storageKey);
                    // returns null if key does not exist
                    return this._store.getVal(storageKey);
                };
                AppLineGraphComponent.prototype.ngOnInit = function () {
                    var self = this;
                    this.onSaveSubscription = this._meta.appSubject
                        .subscribe(function (graphId) { console.log('rx evt update graphId:', graphId); self.graph(self.getGraphData(graphId)); }, function (error) { console.error('Error getting key from save operation: ', error); }, function () { console.log('onSaveSubscription completed'); });
                    // Filter the subject so we only get notified if our graph changed
                    //noinspection TypeScriptValidateTypes
                    this.onSaveSubscription = this._store.onSaveSubject
                        .filter(function (evt, idx, obs) {
                        //STOPHERE
                        //Figure out appId and how to retrieve it and generate it
                        //Currently both store.service and browser-storage.service have
                        //methods that are not exactly aligned
                        //Once we have an appId we can trust, use that to filter the
                        //onSave events so we only get notified for the graph we are interested in.
                        console.log('rx filter: ', evt);
                        //return evt;
                        var re = RegExp(self._meta.appId);
                        return evt.match(re);
                    })
                        .subscribe(function (key) { console.log('rx evt key:', key); self.graph(self.getGraphData(key)); }, function (error) { console.error('Error getting key from save operation: ', error); }, function () { console.log('onSaveSubscription completed'); });
                    //this.graph( this.getGraphData(this.currentGraphId) );
                };
                AppLineGraphComponent = __decorate([
                    core_1.Directive({
                        selector: 'line-graph',
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, (typeof (_a = typeof store_service_1.StoreService !== 'undefined' && store_service_1.StoreService) === 'function' && _a) || Object, (typeof (_b = typeof app_metadata_service_1.AppMetadataService !== 'undefined' && app_metadata_service_1.AppMetadataService) === 'function' && _b) || Object])
                ], AppLineGraphComponent);
                return AppLineGraphComponent;
                var _a, _b;
            })();
            exports_1("AppLineGraphComponent", AppLineGraphComponent);
        }
    }
});
//# sourceMappingURL=line-graph.js.map
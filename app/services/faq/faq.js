System.register([], function(exports_1) {
    var qas, QAs;
    return {
        setters:[],
        execute: function() {
            qas = [];
            qas[0] = ["Where is my data stored?", "The data is stored on the local device, the network never sees it."];
            qas[1] = ["Do I need a network connection?", "Only to get to the initial page, after that no network is required."];
            qas[2] = ["How much is it?", "Free."];
            qas[3] = ["I don\'t see any ads?", "No Ads."];
            exports_1("QAs", QAs = qas);
        }
    }
});
//# sourceMappingURL=faq.js.map
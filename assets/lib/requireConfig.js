requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl : 'assets/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths : {
        src : '../src',
        build: '../../dist',
        jquery : 'jquery.min',
        jqueryui : 'jqueryui',
        NHLClockWidget : '../../dist/NHLClockWidget',
        bootstrap: 'bootstrap/js/bootstrap'
    },
    shim : {
        'jquery' : {
            exports : '$',
            init : function() {
                return this.$.noConflict(false);
            }
        },
        'jqueryui' : {
            deps : ['jquery'],
            exports : 'jqueryui',
            init : function() {
                return this.jQuery.ui;
            }
        },
        'NHLClockWidget' : {
            deps : ['jquery']
        },
        'bootstrap' : {
            deps : ['jquery']
        }
    }
});
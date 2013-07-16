requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl : 'assets/libs',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths : {
        src : '../src',
        build: '../../dist',
        jquery : 'jquery.min',
        NHLHeadlinesWidget : '../../dist/NHLClockWidget',
        bootstrap: 'bootstrap/js/bootstrap',
        text : 'text'
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

        'underscore' : {
            exports : '_'
        },
        'NHLClockWidget' : {
            deps : ['jquery', 'jqueryui', 'underscore']
        },
        'bootstrap' : {
            deps : ['jquery']
        }
    }
});
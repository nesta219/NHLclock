define('NHLClockWidget', ['jquery', 'jqueryui'], function($) {
    'use strict';

    return $.widget('custom.NHLclock', {
        options : {
        },
        _create : function() {
            debugger;
        },
        _attachResizeHandler : function(){
            var that = this;
          
            $(window).on('resize', function(){
                
            });
        },
        _setOption : function(key, value) { 
            
        },
        _destroy : function() {

        }
    });
});

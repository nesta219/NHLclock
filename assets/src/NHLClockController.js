define('NHLclock', ['jquery', 'src/NHLClockView'], 
    function($, NHLClockView) {
    'use strict';

    var NHLClockController = function($element, minutes, seconds, title){
        this.defaultMinutes = minutes;
        this.defaultSeconds = seconds;
        
        this.countdown = new Date((this.defaultMinutes * 60 * 1000) + (this.defaultSeconds * 1000));
        this.timer = null;
        
        title = title || 'Clock';
        
        this.view = new NHLClockView(this, $element, title);
        
        this.view.updateTime(this.getFormattedTime());
    };
    
    $.extend(NHLClockController.prototype, {
        getFormattedTime : function(){
            var minutes = this.countdown.getMinutes();
            var seconds = this.countdown.getSeconds();
            
            if(minutes < 10){
                minutes = '0' + minutes;
            }
            
            if(seconds < 10){
                seconds = '0' + seconds;
            }
            
            return minutes + ':' + seconds;
        },
        startTimer : function(){
            var that = this;
            this.timer = setInterval(function(){
                var millis = that.countdown.getTime();
                
                millis -= 1000;
                
                that.countdown = new Date(millis);
                
                that.view.updateTime(that.getFormattedTime());
                
                if(that.countdown.getSeconds() <= 10 && that.countdown.getSeconds() > 0 && that.countdown.getMinutes() === 0){
                    that.view.showNearEnd();
                }
                else if(that.countdown.getTime() <= 0){
                    clearInterval(that.timer);
                    that.view.showFinished();
                }      
            }, 1000);
        },
        stopTimer : function(){
            if(this.timer !== null){
                clearInterval(this.timer);
            }
        },
        resetTimer : function(){
            if(this.timer !== null){
                clearInterval(this.timer);
            }
            
            this.countdown = new Date((this.defaultMinutes * 60 * 1000) + (this.defaultSeconds * 1000));
            this.view.resetClock(this.getFormattedTime());
        }
    });
    
    return NHLClockController;
    
});

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

define(['jquery'], function($) {'use strict';

    var viewContainerMarkup = '<div class="clock-container"></div>'
    var titleMarkup = '<h2 class="clock-title"></h2>';
    var clockMarkup = '<h3><div class="clock"></h3>';
    var startButtonMarkup = '<button class="btn btn-success">Start</button>';
    var stopButtonMarkup = '<button class="btn btn-danger">Stop</button>';
    var resetButtonMarkup = '<button class="btn btn-inverse">Reset</button>';

    var NHLClockView = function(controller, $element, title) {
        this.controller = controller;
        this.$parentElement = $element;
        
        this.$parentElement.append(viewContainerMarkup);
        
        this.$viewContainer = this.$parentElement.find('.clock-container');
        this.$viewContainer.append(titleMarkup);
        this.$viewContainer.append(clockMarkup);
        this.$viewContainer.append(startButtonMarkup);
        this.$viewContainer.append(stopButtonMarkup);
        this.$viewContainer.append(resetButtonMarkup);
        
        this.$title = this.$viewContainer.find('h2');
        this.$clock = this.$viewContainer.find('.clock');
        this.$startButton = this.$viewContainer.find('.btn-success');
        this.$stopButton = this.$viewContainer.find('.btn-danger');
        this.$resetButton = this.$viewContainer.find('.btn-inverse');
        
        this.$title.append(title || 'Clock');
    
        this._attachEventHandlers();
    };

    $.extend(NHLClockView.prototype, {
        updateTime : function(time) {
            this.$clock.html(time);
        },
        resetClock : function(time){
            if(this.$clock.is('.finished')){
                this.$clock.removeClass('finished');    
            }
            
            if(this.$clock.is('.near-finished')){
                this.$clock.removeClass('near-finished');
            }
            
            this.updateTime(time);
        },
        showNearEnd : function(){
            this.$clock.addClass('near-finished');
        },
        showFinished : function(){
            this.$clock.removeClass('near-finished');
            this.$clock.addClass('finished');  
        },
        _attachEventHandlers : function() {
            var that = this;
            this.$startButton.on('click', function() {
                that.controller.startTimer();
            });

            this.$stopButton.on('click', function() {
                that.controller.stopTimer();
            });

            this.$resetButton.on('click', function() {
                that.controller.resetTimer();
            });
        }
    });

    return NHLClockView;

});

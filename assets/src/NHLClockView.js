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

var LeftMenu = (function() {
    'use strict';
    
    var isOpen = null,
        htmlContainer = null,
        iconContainer = null,
    
        open = function () {
            htmlContainer.className = 'open';
            iconContainer.innerHTML = '<';
            isOpen = true;
        },
        
        close = function () {
            htmlContainer.className = 'close';
            iconContainer.innerHTML = '>';
            isOpen = false;
        },
        
        toggle = function () {
            if (isOpen)
                close();
            else
                open();
        },
        
        initEventHandling = function () {
            document.getElementById('left-menu-slider').addEventListener('click', toggle);
        },
        
        init = function () {
            initEventHandling();
            htmlContainer = document.getElementById('left-menu');
            iconContainer = document.getElementById('left-menu-slider-icon');
            close();
        };
        
    init();
    return {
        toggle: toggle,
        open: open,
        close: close
    };
    
}());

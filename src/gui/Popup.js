var Popup = (function($){

    var $idleBackground,
        $popup,
        $popupTitle,
        $popupButtons;

    function init() {
        createHtmlStructure();
    }
    
    function open(message, buttons) {
        $popupTitle.html(message);
        
        buttons.forEach(function(button){
            var $button = $('<input type="button" />').attr('value', button.text);
            $button.on('click', function(e){
                e.preventDefault();
                if (button.click) button.click();
                close();
            });
            $popupButtons.append($button);
        });
        
        $idleBackground.show();
        $popup.show();
    }
    
    function close() {
        $idleBackground.hide();
        $popup.hide();
        
        $popupButtons.find('input').off('click');
        $popupButtons.html('');
        $popupTitle.html('');
    }
    
    function createHtmlStructure() {
        var $body = $('body');
        
        $idleBackground = $('<div>').attr('id', 'PopupIdleBackground').hide();
        $body.append($idleBackground);
        
        $popup = $('<div>').attr('id', 'Popup').hide();
        $body.append($popup);
        
        var $popupWrapper = $('<div>').attr('id', 'PopupWrapper');
        $popup.append($popupWrapper);
        
        $popupTitle = $('<div>').attr('id', 'PopupMessage');
        $popupWrapper.append($popupTitle);
        
        $popupButtons = $('<div>').attr('id', 'PopupButtons');
        $popupWrapper.append($popupButtons);
    }

    init();
    return {
        open: open,
        close: close
    };
}(jQuery));
(function ($) {

    var selectionTimeout,
        selection;

    $('.box-combinaison').on('touchstart', 'span', function(e) {
        e.preventDefault();
        
        if (selectionTimeout) clearTimeout(selectionTimeout);
        
        selection = $(this);
        selectionTimeout = setTimeout(openDeletionConfirmation, 500);
    });
    
    $('.box-combinaison').on('touchend', 'span', function(e) {
        e.preventDefault();
        $(this).trigger('click');
        
        if (selectionTimeout) clearTimeout(selectionTimeout);
    });
    
    function openDeletionConfirmation() {
        Popup.open(
            'Do you want to delete this combinaison?', 
            [
                { text: 'Delete combinaison', click: deleteSelectedCombinaison }, 
                { text: 'Cancel' }
            ]
        );
    }
    
    function deleteSelectedCombinaison() {
        var index = parseInt(selection.attr('data-combinaison-index')),
            isOpen = selection.attr('data-combinaison-concealed') !== 'true';
        viewModel.remove(index, isOpen);
    }

} (jQuery));
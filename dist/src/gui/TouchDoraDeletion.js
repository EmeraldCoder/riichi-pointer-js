(function ($) {

    var selectionTimeout,
        selection;

    $('.box-dora').on('touchstart', 'span', function(e) {
        e.preventDefault();
        
        if (selectionTimeout) clearTimeout(selectionTimeout);
        
        selection = $(this);
        selectionTimeout = setTimeout(openDeletionConfirmation, 500);
    });
    
    $('.box-dora').on('touchend', 'span', function(e) {
        e.preventDefault();
        if (selectionTimeout) clearTimeout(selectionTimeout);
    });
    
    function openDeletionConfirmation() {
        Popup.open(
            'Do you want to delete this dora?', 
            [
                { text: 'Delete dora', click: deleteSelectedDora }, 
                { text: 'Cancel' }
            ]
        );
    }
    
    function deleteSelectedDora() {
        var index = parseInt(selection.attr('data-index')),
            isUraDora = selection.parents('div').attr('id') === 'UraDora';
        viewModel.removeDora(index, isUraDora);
    }

} (jQuery));
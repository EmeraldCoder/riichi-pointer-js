(function ($) {

    function hideDeleteDrop () {
        $('#DeleteDrop').off('drop').hide();
    }

    $('.box-combinaison').on('dragstart', 'span', function(e) {
        var dragging = $(this);
        
        $('#DeleteDropMessage').html('Drag a tile here to delete the combinaison');
        
        $('#DeleteDrop').show().on('drop', function(e) {
            e.preventDefault();
            
            var index = parseInt(dragging.attr('data-combinaison-index')),
                isOpen = dragging.attr('data-combinaison-concealed') !== 'true';
                
            viewModel.remove(index, isOpen);
            
            hideDeleteDrop();
        });
    });
    
    $('.box-combinaison').on('dragend', 'span', hideDeleteDrop);

}(jQuery));

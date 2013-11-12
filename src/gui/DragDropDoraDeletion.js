(function ($) {

    function hideDeleteDrop () {
        $('#DeleteDrop').off('drop').hide();
    }

    $('.box-dora').on('dragstart', 'span', function(){
        var dragging = $(this);
        
        $('#DeleteDropMessage').html('Drag a tile here to delete the dora');
        
        $('#DeleteDrop').show().on('drop', function(e){
            e.preventDefault();
            
            var index = parseInt(dragging.attr('data-index')),
                isUraDora = dragging.parents('div').attr('id') === 'UraDora';
                
            viewModel.removeDora(index, isUraDora);
            
            hideDeleteDrop();
        });
    });
    
    $('.box-dora').on('dragend', 'span', hideDeleteDrop);

}(jQuery));

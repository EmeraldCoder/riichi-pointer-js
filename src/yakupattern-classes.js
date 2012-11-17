function YakuPattern() {}

function TanyaouChuu() {
    YakuPattern.call(this);
    
    this.check = function(tiles) {
        var result = true;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            if (! (tile instanceof NumberedTile && tile.number > 1 && tile.number < 9)) {
                result = false;            
            }
        }
        return result;
    };
}
TanyaouChuu.prototype = new YakuPattern();
TanyaouChuu.prototype.constructor = TanyaouChuu;

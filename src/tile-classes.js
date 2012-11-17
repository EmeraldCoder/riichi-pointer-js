/**
 * Tile base class
 * All tile inherit from this class
 */
function Tile() {}

/**
 * Honor tile base class
 * Wind and Dragon tile inherit from this class
 */
function HonorTile() {
    Tile.call(this);
}
HonorTile.prototype = new Tile();
HonorTile.prototype.constructor = HonorTile;

/**
 * Numbered tile base class
 * Dot, Character and Bamboo tile inherit from this class
 */
function NumberedTile(number) {
    Tile.call(this);
    this.number = number; // number 1 to 9
}
NumberedTile.prototype = new Tile();
NumberedTile.prototype.constructor = NumberedTile;

/**
 * Wind tile class
 * East, South, West and North tile
 */
function WindTile(direction) {
    HonorTile.call(this);
    this.direction = direction; // east, south, west, north
}
WindTile.prototype = new HonorTile();
WindTile.prototype.constructor = WindTile;

/**
 * Dragon tile class
 * Red, Green and White dragon tile
 */
function DragonTile(color) {
    HonorTile.call(this);
    this.color = color; // red, green, white
}
DragonTile.prototype = new HonorTile();
DragonTile.prototype.constructor = DragonTile;

/**
 * Dot tile class
 */
function DotTile(number) {
    NumberedTile.call(this, number);
}
DotTile.prototype = new NumberedTile();
DotTile.prototype.constructor = DotTile;

/**
 * Character tile class
 */
function CharacterTile(number) {
    NumberedTile.call(this, number);
}
CharacterTile.prototype = new NumberedTile();
CharacterTile.prototype.constructor = CharacterTile;

/**
 * Bamboo tile class
 */
function BambooTile(number) {
    NumberedTile.call(this, number);
}
BambooTile.prototype = new NumberedTile();
BambooTile.prototype.constructor = BambooTile;


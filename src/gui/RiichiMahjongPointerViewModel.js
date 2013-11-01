/**
 * View Model Class that handle the logic of the user interface for the application
 * Use the framework KnockoutJS to manage observable properties and view bindings.
 */
function RiichiMahjongPointerViewModel() {
    var self = this;
    
    /**
     * Id of the current active view on the interface
     * Main, TileSuitSelection, TileValueSelection, Result
     */
    self.currentView = ko.observable('Main');
    
    /**
     * name of the wind prevalent for the round
     * east, south, west, north
     */
    self.prevalentWind = ko.observable('east');
    
    /**
     * name of the wind of the player seat
     * east, south, west, north
     */
    self.seatWind = ko.observable('east');
    
    /**
     * indicate if the player won with a self-draw or discard
     * tsumo, ron
     */
    self.winningType = ko.observable('tsumo');
    
    /**
     * indicate if the player won with a particular circonstance
     * haitei raoyue, houtei raoyui, rinshan kaihou, chan kan
     */
    self.winningSecondaryType = ko.observable('');
    
    /**
     * indicate if the player won with a riichi
     */
    self.isRiichi = ko.observable(false);
    
    /**
     * indicate if the player riichi was put on the first round
     */
    self.isDoubleRiichi = ko.observable(false);
    
    /**
     * indicate if the player won in the first round after declaring his riichi
     */
    self.isIppatsu = ko.observable(false);
    
    /**
     * list of the dora tiles
     */
    self.doraTiles = ko.observableArray([]);
    
    /**
     * list of the ura-dora tiles
     */
    self.uraDoraTiles = ko.observableArray([]);
    
    /**
     * winning tile select by the user
     */
    self.winningTile = null;
    
    /**
     * list of the concealed combinaisons of the player
     */
    self.concealedCombinaisons = ko.observableArray([]);
    
    /**
     * list of the open combinaisons of the player
     */
    self.openCombinaisons = ko.observableArray([]);
    
    /**
     * indicate if the adding process is for dora or not (ex. : combinaison)
     */
    self.addForDora = null;
    
    /**
     * indicate if the combinaison that the user is currently adding is concealed or not
     */
    self.addIsConcealed = null
    
    /**
     * type of the combinaison that the user is currently adding
     * pair, pon, kan, chii
     */
    self.addType = ko.observable();
    
    /**
     * indicate if the dora that the user is currently adding is ura-dora or not
     */
    self.addIsUraDora = null;

    /**
     * list of all the yaku pattern valid for the player hand
     */
    self.pointsYakuDetails = ko.observableArray([]);
    
    /**
     * han total of the player hand
     */
    self.pointsYakuTotal = ko.observable(0);
    
    /**
     * list of all the fu valid for the player hand
     */
    self.pointsFuDetails = ko.observableArray([]);
    
    /**
     * fu total of the player hand
     */
    self.pointsFuTotal = ko.observable(0);
    
    /**
     * text that describe how much point the player win with his hand
     * ex. : 1000 points from each players
     * ex. : 500 points from non-dealer players / 1000 points from dealer player
     */
    self.pointsTotal = ko.observable('');
    
    /**
     * computed property that indicate if the player hand is in a finish state (complete)
     */
    self.handIsFinish = ko.computed(function(){
        var hand = new Hand(self.concealedCombinaisons(), self.openCombinaisons());
        return hand.isFinish();
    });
    
    /**
     * action to begin the process of adding a new dora
     * this open the TileSelection view on the interface
     *
     * @param bool isUraDora indicate if the dora is an ura-dora (under the dora for riichi win)
     */
    self.addDora = function(isUraDora) {
        self.addForDora = true;
        self.addIsUraDora = isUraDora;
        self.currentView('TileSelection');
    };
    
    /**
     * action to begin the process of adding a new combinaison
     * this open the TileSelection view on the interface
     *
     * @param bool isConcealed indicate if the new combinaison will be concealed or not
     * @param string type specify the combinaison type that will be add (pair, pon, kan, chii)
     */
    self.add = function(isConcealed, type) {
        self.addForDora = false;
        self.addIsConcealed = isConcealed;
        self.addType(type);
        self.currentView('TileSelection');
    };
    
    /**
     * action when the user select the tile value of the combinaison during the process of adding a new combinaison
     * this will finalize the adding process and return on the Main view on the interface
     *
     * @param string value specify the tile value of the combinaison that will be add ('red', 'east', 1, 9, ...)
     */
    self.selectTile = function(suit, value) {
    
        if (self.addForDora) {
            var tile = TileFactory.create(suit, value);
            if (self.addIsUraDora) {
                self.uraDoraTiles.push(tile);
            } else {
                self.doraTiles.push(tile);
            }
        } else {
            var firstCombinaisonTile = TileFactory.create(suit, value),
                combinaison = CombinaisonFactory.create(self.addType(), firstCombinaisonTile);
                
            for (var i = 0; i < combinaison.tiles.length; i++) {
                combinaison.tiles[i].isWinningTile = ko.observable(false);
            }

            if (self.addIsConcealed) {
                self.concealedCombinaisons.push(combinaison);
            } else {
                self.openCombinaisons.push(combinaison);
            }
        }
        
        self.addForDora = null;
        self.addIsConcealed = null;
        self.addType(null);
        self.addIsUraDora = null;
        self.currentView('Main');
    };
    
    /**
     * action when the user select the winning tile
     *
     * @param object tile
     */
    self.setWinningTile = function(tile) {
        if (self.winningTile) {
            self.winningTile.isWinningTile(false);
        }
        self.winningTile = tile;
        self.winningTile.isWinningTile(true);
    };
    
    /**
     * action when the user want to return to the Main view on the interface
     */
    self.returnToMain = function(){
        self.currentView('Main');
    };
    
    /**
     * action when the user want to calculate the points of his hand
     * this will calculate the hand values
     * and this will open the Result view on the interface
     */
    self.showPoints = function(){
        if (self.winningTile === null) {
            alert("You must select your waiting tile");
            return false;
        }
        
        var winningCombinaisonIndex = 0;
        var winningTileIndex = 0;
        
        var hand = new Hand(
            self.concealedCombinaisons(),
            self.openCombinaisons(),
            self.seatWind(),
            self.prevalentWind(),
            winningCombinaisonIndex,
            winningTileIndex,
            self.winningType(),
            self.winningSecondaryType(),
            self.doraTiles(),
            self.uraDoraTiles()
        );
        hand.isRiichi = self.isRiichi() || self.isDoubleRiichi();
        hand.isDoubleRiichi = self.isDoubleRiichi();
        hand.isIppatsu = self.isIppatsu();
        
        var patterns = [
            new TanyaouChuu(),
            new Honitsu(),
            new Chinitsu(),
            new Honroutou(),
            new Iipeikou(),
            new SanShokuDoujun(),
            new Itsu(),
            new Chanta(),
            new ChiiToitsu(),
            new SanShokuDokou(),
            new ToiToiHou(),
            new ShouSangen(),
            new RyanPeikou(),
            new JunchanTaiyai(),
            new FanpaiDragonPon(),
            new FanpaiRoundWind(),
            new FanpaiSeatWind(),
            new Pinfu(),
            new SanAnkou(),
            new SanKanTsu(),
            new MenzenTsumo(),
            new Riichi(),
            new DoubleRiichi(),
            new Ippatsu(),
            new HaiteiRaoyue(),
            new HouteiRaoyui(),
            new RinshanKaihou(),
            new ChanKan(),
            new Dora(),
            new UraDora()
        ];
        
        var result = [];
        var resultTotal = 0;
        for (var i = 0; i < patterns.length; i++) {
            var pattern = patterns[i];
            var checkResult = pattern.check(hand);
            if (checkResult > 0) {
                resultTotal += checkResult;
                result.push({ name: pattern.japaneseName + ' (' + pattern.englishName + ')', value: checkResult });
            }
        }
        self.pointsYakuDetails(result);
        self.pointsYakuTotal(resultTotal);
        
        var fuCalculator = new FuCalculator();
        var fuResult = fuCalculator.calculate(hand);
        self.pointsFuDetails(fuResult.details);
        self.pointsFuTotal(fuResult.total);
        
        var pointCalculator = new PointCalculator();
        var pointResult = pointCalculator.calculate(hand, resultTotal, fuResult.total);
        
        var pointHtml = '';
        if (hand.seatWind === 'east') { // dealer
            if (hand.winningType === 'tsumo') {
                pointHtml = pointResult + ' points from each player (' + (pointResult * 3) + ' points)';
            } else if (hand.winningType === 'ron') {
                pointHtml = pointResult + ' points from the discard player';
            }
        } else { // non-dealer
            if (hand.winningType === 'tsumo') {
                pointHtml = pointResult.dealer + ' points from dealer / ' + pointResult.nonDealer + ' points from others players (' + (pointResult.dealer + (pointResult.nonDealer * 2)) + ' points)';
            } else if (hand.winningType === 'ron') {
                pointHtml = pointResult + ' points from the discard player';
            }
        }
        self.pointsTotal(pointHtml);
        
        self.currentView('Result');
    };
    
}

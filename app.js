var appViewModel;

(function(){

    function AppViewModel() {
        var self = this;
        
        self.currentView = ko.observable('Main');
        
        self.prevalentWind = ko.observable('east');
        self.seatWind = ko.observable('east');
        
        self.winningType = ko.observable('tsumo');
        self.winningSecondaryType = ko.observable('');
        
        self.isRiichi = ko.observable(false);
        self.isDoubleRiichi = ko.observable(false);
        self.isIppatsu = ko.observable(false);
        
        self.concealedCombinaisons = ko.observableArray([]);
        self.openCombinaisons = ko.observableArray([]);
        
        self.addIsConcealed = ko.observable(true);
        self.addType = ko.observable('');
        self.addSuit = ko.observable('');
        self.addValue = ko.observable('');
        
        self.winningTileIsConcealed = ko.observable(false);
        self.winningTileCombinaisonIndex = ko.observable(-1);
        self.winningTileIndex = ko.observable(-1);
        
        self.pointsYakuDetails = ko.observableArray([]);
        self.pointsYakuTotal = ko.observable(0);
        self.pointsFuDetails = ko.observableArray([]);
        self.pointsFuTotal = ko.observable(0);
        self.pointsTotal = ko.observable('');

        self.add = function(isConcealed, type) {
            self.addIsConcealed(isConcealed);
            self.addType(type);
            
            self.currentView('TileSuitSelection');
        };
        
        self.selectSuit = function(suit) {
            self.addSuit(suit);
            self.currentView('TileValueSelection');
        };
        
        self.selectValue = function(value) {
            self.addValue(value);
            addCombinaison();
            self.currentView('Main');
        };
        
        function addCombinaison() {
            var suit = self.addSuit(),
                value = self.addValue();
                
            switch (self.addType()) {
                case 'pair':
                    var combinaison = new Pair(TileFactory.create(suit, value));
                    break;
                case 'pon':
                    var combinaison = new Pon(TileFactory.create(suit, value));
                    break;
                case 'kan':
                    var combinaison = new Kan(TileFactory.create(suit, value));
                    break;
                case 'chii':
                    var combinaison = new Chii(
                        TileFactory.create(suit, value), 
                        TileFactory.create(suit, value+1), 
                        TileFactory.create(suit, value+2)
                    );
                    break;
                default:
                    alert('combinaisonType not supported');
            }

            if (self.addIsConcealed()) {
                self.concealedCombinaisons.push(combinaison);    
            } else {
                self.openCombinaisons.push(combinaison);
            }
        };
        
        self.refreshConcealedHandTiles = ko.computed(function(){
            var html = '';
            for (var i = 0; i < self.concealedCombinaisons().length; i++) {
                for (var j = 0; j < self.concealedCombinaisons()[i].tiles.length; j++) {
                    var tile = self.concealedCombinaisons()[i].tiles[j];
                    
                    var cssClass = '';
                    if (self.winningTileIsConcealed() === true && self.winningTileCombinaisonIndex() === i && self.winningTileIndex() === j) {
                        cssClass = 'waiting';
                    }
                    if (j === self.concealedCombinaisons()[i].tiles.length - 1) {
                        cssClass += ' last';
                    }
                    
                    html += '<span class="' + cssClass + '" onclick="appViewModel.setWinningTile(true, ' + i + ', ' + j + ')"><img src="img/' + tile.suit + tile.value + '.png" /></span>';
                }
            }
            return html;
        });
        
        self.refreshOpenHandTiles = ko.computed(function(){
            var html = '';
            for (var i = 0; i < self.openCombinaisons().length; i++) {
                for (var j = 0; j < self.openCombinaisons()[i].tiles.length; j++) {
                    var tile = self.openCombinaisons()[i].tiles[j];
                    
                    var cssClass = '';
                    if (self.winningTileIsConcealed() === false && self.winningTileCombinaisonIndex() === i && self.winningTileIndex() === j) {
                        cssClass = 'waiting';
                    }
                    if (j === self.openCombinaisons()[i].tiles.length - 1) {
                        cssClass += ' last';
                    }
                    
                    html += '<span class="' + cssClass + '" onclick="appViewModel.setWinningTile(false, ' + i + ', ' + j + ')"><img src="img/' + tile.suit + tile.value + '.png" /></span>';
                }
            }
            return html;
        });
        
        self.setWinningTile = function(isConcealed, winningCombinaisonIndex, winningTileIndex) {
            self.winningTileIsConcealed(isConcealed);
            self.winningTileCombinaisonIndex(winningCombinaisonIndex);
            self.winningTileIndex(winningTileIndex);
        };
        
        self.handIsFinish = ko.computed(function(){
            var hand = new Hand(self.concealedCombinaisons(), self.openCombinaisons());
            return hand.isFinish();
        });
        
        self.showPoints = function(){
            if (self.winningTileCombinaisonIndex() === -1) {
                alert("You must select your waiting tile");
                return false;
            }
            
            var winningCombinaisonIndex = self.winningTileCombinaisonIndex();
            var winningTileIndex = self.winningTileIndex();
            if (self.winningTileIsConcealed() === false) {
                winningTileIndex += self.concealedCombinaisons().length;
            }
            
            var hand = new Hand(
                self.concealedCombinaisons(),
                self.openCombinaisons(),
                self.seatWind(),
                self.prevalentWind(),
                winningCombinaisonIndex,
                winningTileIndex,
                self.winningType(),
                self.winningSecondaryType()
            );
            hand.isRiichi = self.isRiichi() || self.isDoubleRiichi();
            hand.isDoubleRiichi = self.isDoubleRiichi();
            hand.isIppatsu = self.isIppatsu();
            
            var patterns = [
                { name: 'TanyaouChuu', checker: new TanyaouChuu() },
                { name: 'Honitsu', checker: new Honitsu() },
                { name: 'Chinitsu', checker: new Chinitsu() },
                { name: 'Honroutou', checker: new Honroutou() },
                { name: 'Iipeikou', checker: new Iipeikou() },
                { name: 'SanShokuDoujun', checker: new SanShokuDoujun() },
                { name: 'Itsu', checker: new Itsu() },
                { name: 'Chanta', checker: new Chanta() },
                { name: 'ChiiToitsu', checker: new ChiiToitsu() },
                { name: 'SanShokuDokou', checker: new SanShokuDokou() },
                { name: 'ToiToiHou', checker: new ToiToiHou() },
                { name: 'ShouSangen', checker: new ShouSangen() },
                { name: 'RyanPeikou', checker: new RyanPeikou() },
                { name: 'JunchanTaiyai', checker: new JunchanTaiyai() },
                { name: 'Fanpai (dragon pon)', checker: new FanpaiDragonPon() },
                { name: 'Fanpai (round wind pon)', checker: new FanpaiRoundWind() },
                { name: 'Fanpai (seat wind pon)', checker: new FanpaiSeatWind() },
                { name: 'Pinfu (all chii / no point)', checker: new Pinfu() },
                { name: 'SanAnkou (3 concealed pons)', checker: new SanAnkou() },
                { name: 'SanKanTsu (3 kans)', checker: new SanKanTsu() },
                { name: 'Menzen Tsumo (Fully Concealed Hand)', checker: new MenzenTsumo() },
                { name: 'Riichi', checker: new Riichi() },
                { name: 'Double Riichi', checker: new DoubleRiichi() },
                { name: 'Ippatsu (One Shot)', checker: new Ippatsu() },
                { name: 'HaiteiRaoyue', checker: new HaiteiRaoyue() },
                { name: 'HouteiRaoyui', checker: new HouteiRaoyui() },
                { name: 'RinshanKaihou', checker: new RinshanKaihou() },
                { name: 'ChanKan', checker: new ChanKan() }
            ];
            
            var result = [];
            var resultTotal = 0;
            for (var i = 0; i < patterns.length; i++) {
                var pattern = patterns[i];
                var checkResult = pattern.checker.check(hand);
                if (checkResult > 0) {
                    resultTotal += checkResult;
                    result.push({ name: pattern.checker.japaneseName + ' (' + pattern.checker.englishName + ')', value: checkResult });
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
        
        self.returnToMain = function(){
            self.currentView('Main');
        };
        
    }
    
    appViewModel = new AppViewModel();
    ko.applyBindings(appViewModel);
    
})();

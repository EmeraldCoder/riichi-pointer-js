Riichi Pointer JS
======================

Vue.js application to calculate the score of a winning hand at Riichi Mahjong (Japanese Mahjong).

## Links

* [Application](https://tools.phil.moe/riichi/pointer)

## Features

* Many options available to configure the application according to your ruleset
  * Allow Open Tanyao (all simples)
  * Allow Multiple Yakuman
  * Allow Double Yakuman
  * Allow Double Wind Fu
  * Renhou Value [Mangan / Yakuman]
  * Kazoe Yakuman Value [Sanbaiman / Yakuman]
  * Optionals Yaku
    * Open Riichi<br><br>
* Simple mode available for when you only need a quick reference to a score for a certain amount of fu/han without entering all your hand's combinations.<br><br>
* Supported Rulesets
  * WRC (4 players)
  * Custom (4 players)<br><br>
* Supported Yaku Patterns
  * Menzen Tsumo (fully concealed hand)
  * Riichi
  * Double Riichi
  * Open Riichi
  * Ippatsu
  * Haitei Raoyue (under the sea)
  * Houtei Raoyui (under the river)
  * Rinshan Kaihou (after a kan)
  * Chankan (robbing a kan)
  * Tanyao (all simples)
  * Honitsu (half flush)
  * Chinitsu (full flush)
  * Honroutou (all terminals and honours)
  * Iipeikou (pure double sequence)
  * Sanshoku Doujun (mixed triple sequence)
  * Sanshoku Dokou (triple triplets)
  * Ittsuu (pure straight)
  * Chanta (half outside hand)
  * Chiitoitsu (seven pairs)
  * Toitoi (all triplets)
  * Shousangen (little three dragons)
  * Ryanpeikou (twice pure double sequence)
  * Junchan (fully outside hand)
  * Yakuhai (Seat Wind | Prevalent Wind | Dragon)
  * Pinfu
  * Sanankou (three concealed triplets)
  * Sankantsu (three quads)
  * Renhou (blessing of man)<br><br>
* Supported Yakuman Patterns
  * Kazoe Yakuman (counted yakuman)
  * Suuankou (four concealed triplets)
  * Suukantsu (four quads)
  * Ryuuiisou (all green)
  * Chinroutou (all terminals)
  * Tsuuiisou (all honours)
  * Daisangen (big three dragons)
  * Shousuushii (four little winds)
  * Daisuushii (four big winds)
  * Chuuren Poutou (nine gates)
  * Kokushi Musou (thirteen orphans)
  * Tenhou (blessing of heaven)
  * Chiihou (blessing of earth)

## Development

The project is a standard Vue.js (3.x) application using vue-cli services and Yarn (1.x) to manage dependencies.

After cloning the project, you'll need to install dependencies by running the command:

``` bash
yarn
```

After that you can build the application by running the command:

```bash
yarn build
```

Or start the application in development mode by using the command:

```bash
yarn serve
```

Other useful commands:

```bash
yarn test:unit # run unit tests
yarn lint # run linter on the code
```

The project structure is a standard Vue.js application created with vue-cli.

* `/.github/workflows`: .yml configuration for Github Actions.
* `/deploy`: Contains Kubernetes .yml configuration for production deployment.
* `/dist`: Build output folder.
* `/public`: Static assets that need to be copied during the build.
* `/src`: Application code.
  * `/assets`: Application assets.
  * `/components`: Vue components.
  * `/core`: Riichi Mahjong business logic code (yaku, tile, combination, calculator, etc...).
    * `/fu-calculation`: Fu calculation related code.
    * `/han-calculation`: Han calculation related code.
    * `/point-calculation`: Point calculation related code.
    * `/waits`: Waits checker helper functions.
    * `/wrc`: WRC ruleset implementation code.
  * `/filters`: Formatting filter functions.
  * `/locales`: I18N localisation resources.
  * `/rulesets`: Mahjong ruleset configurations.
* `/tests`: Application tests.
  * `/fixtures`: Preset data to be used during the tests.
  * `/integration`: Preset ruleset (WRC) integration tests.
  * `/unit`: Standard unit tests.

## Github Actions

### Continuous Integration

Action that is triggered by all commit or pull request on the master branch.

Check that the project can build correctly, that the code is standard to the linter specification and that the integration/unit tests passed.

### Publish

Action that is triggered by the creation of a release.

Build the application inside a Docker image, push it on the image repository and update the Kubernetes cluster for the new release to be deployed automatically.

## Credits

Tiles images are from https://github.com/FluffyStuff/riichi-mahjong-tiles

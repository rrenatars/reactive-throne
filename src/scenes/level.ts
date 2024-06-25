import level1JSON from '../assets/map/level1/level1.json'
import {LAYERS, SIZES, SPRITES, TILES} from "../utils/constants.ts";
import {Player} from "../entities/player.ts";

export class Level extends Phaser.Scene {
    private player?: Player

    constructor() {
        super('Level')
    }

    preload () {
        this.load.image(TILES.LEVEL, 'src/assets/map/level1.png');
        this.load.tilemapTiledJSON('map', 'src/assets/map/level1/level1.json')

        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/frog-sprite.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT,
        })

        this.load.image(SPRITES.BULLET, 'src/assets/bullets/bullet.png')
        this.load.image(SPRITES.REVOLVER, 'src/assets/weapons/revolver.png')
    }

    create () {
        const map = this.make.tilemap({ key: "map" })
        const tileset = map.addTilesetImage(level1JSON.tilesets[0].name, TILES.LEVEL, SIZES.TILE.WIDTH, SIZES.TILE.HEIGHT)
        const sandLayer = map.createLayer(LAYERS.SAND, tileset, 0, 0)
        const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0)

        this.player = new Player(this, 400, 300, SPRITES.PLAYER);

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    }

    update(_: number, delta: number) {
        this.player?.update(delta)
    }
}

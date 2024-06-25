import {SPRITES} from "../utils/constants.ts";

export class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, SPRITES.BULLET)
        this.setScale(2)

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setActive(false)
        this.setVisible(false)
    }

    fire(x: number, y: number, angle: number, speed: number) {
        this.setPosition(x, y)
        this.setActive(true)
        this.setVisible(true)
        this.setRotation(angle)
        this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity)
    }
}

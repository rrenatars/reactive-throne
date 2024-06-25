import {SPRITES} from "../utils/constants.ts";
import {Bullet} from "./bullet.ts";

export class Weapon extends Phaser.GameObjects.Sprite {
    bullets: Phaser.Physics.Arcade.Group;
    fireRate: number
    bulletSpeed: number
    nextFire: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture);
        this.setScale(2.5)

        this.fireRate = 100
        this.bulletSpeed = 1000
        this.nextFire = 0
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,
            defaultKey: SPRITES.BULLET,
            maxSize: 1000,
            runChildUpdate: true
        })

        this.scene.add.existing(this)
    }

    fire(x: number, y: number, angle: number) {
        if (this.scene.time.now > this.nextFire) {
            const bullet = this.bullets.get(x, y, SPRITES.BULLET) as Bullet
            if (bullet) {
                bullet.fire(x, y, angle, this.bulletSpeed)
                this.nextFire = this.scene.time.now + this.fireRate
            }
        }
    }
}

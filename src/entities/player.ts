import {Entity} from "./entity.ts";
import {SPRITES} from "../utils/constants.ts";

export class Player extends Entity {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture || SPRITES.PLAYER);
    }

    update(delta: number) {
        const keys = this.scene.input.keyboard.createCursorKeys()

        if (keys.up.isDown) {
            this.setPosition(this.x, this.y - delta * 0.25)
        } else if (keys.down.isDown) {
            this.setPosition(this.x, this.y + delta * 0.25)
        } else if (keys.left.isDown) {
            this.setPosition(this.x - delta * 0.25, this.y)
        } else if (keys.right.isDown) {
            this.setPosition(this.x + delta * 0.25, this.y)
        }
    }
}

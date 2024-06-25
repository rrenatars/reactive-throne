import {Entity} from "./entity.ts";
import {SPRITES} from "../utils/constants.ts";
import {Weapon} from "../weapons/weapon.ts";

export class Player extends Entity {
    private moveSpeed: number

    textureKey: string
    wasd: {
        W: Phaser.Input.Keyboard.Key
        A: Phaser.Input.Keyboard.Key
        S: Phaser.Input.Keyboard.Key
        D: Phaser.Input.Keyboard.Key
    }
    weapon: Weapon
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, type?: string) {
        super(scene, x, y, texture, SPRITES.PLAYER);
        this.setScale(2.0)

        const anims = this.scene.anims
        const animsFrameRate = 12
        this.textureKey = texture
        this.moveSpeed = 25

        anims.create({
            key: 'walk',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 0,
                end: 4
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        anims.create({
            key: 'stand',
            frames: anims.generateFrameNumbers(this.textureKey, {
                start: 10,
                end: 12
            }),
            frameRate: animsFrameRate,
            repeat: -1
        })

        this.wasd = {
            W: this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        }

        this.weapon = new Weapon(this.scene, x, y, SPRITES.REVOLVER)

        this.scene.add.existing(this.weapon)
    }

    update(delta: number) {
        const cursorKeys = this.scene.input.keyboard.createCursorKeys()
        const pointer = this.scene.input.activePointer

        const cursorOffsetX = 35; // Смещение центра курсора по X
        const cursorOffsetY = 35;

        const playerAngle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX + cursorOffsetX, pointer.worldY + cursorOffsetY)

        if (pointer.worldX + cursorOffsetX > this.x) {
            this.setFlipX(false)
            this.weapon.setFlipY(false)
            this.weapon.setPosition(this.x + 30, this.y + 5)
            this.weapon.setRotation(playerAngle)
        } else {
            this.setFlipX(true)
            this.weapon.setFlipY(true)
            this.weapon.setPosition(this.x - 30, this.y + 5)
            this.weapon.setRotation(playerAngle)
        }

        if (pointer.worldY + 50 < this.y) {
            this.setDepth(1)
            this.weapon.setDepth(0)
        } else {
            this.setDepth(0)
            this.weapon.setDepth(1)
        }

        if (cursorKeys.up.isDown || this.wasd.W.isDown) {
            this.play('walk', true)
            this.setVelocity(0, -delta * this.moveSpeed)
        } else if (cursorKeys.down.isDown || this.wasd.S.isDown) {
            this.play('walk', true)
            this.setVelocity(0, delta * this.moveSpeed)
        } else if (cursorKeys.left.isDown || this.wasd.A.isDown) {
            this.play('walk', true)
            this.setVelocity(-delta * this.moveSpeed, 0)
        } else if (cursorKeys.right.isDown || this.wasd.D.isDown) {
            this.play('walk', true)
            this.setVelocity(delta * this.moveSpeed, 0)
        } else {
            this.setVelocity(0, 0)
            this.play('stand', true)
        }

        if (pointer.isDown) {
            const weaponAngle = Phaser.Math.Angle.Between(this.weapon.x, this.weapon.y, pointer.worldX + cursorOffsetX, pointer.worldY + cursorOffsetY)
            this.weapon.fire(this.weapon.x, this.weapon.y, weaponAngle)
        }
    }
}

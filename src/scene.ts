import Phaser from "phaser"

new Phaser.Game({
    width: 800,
    height: 600,
    title: 'Reactive Throne',
    url: import.meta.env.URL || '',
    version: import.meta.env.VERSION || '0.0.1',
    backgroundColor: '#000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
})

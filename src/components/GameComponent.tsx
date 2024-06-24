import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import {scenes} from "../scenes";

const GameComponent = () => {
    const gameContainerRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: gameContainerRef.current,
            width: 800,
            height: 600,
            title: 'Reactive Throne',
            scene: scenes,
            url: import.meta.env.URL || '',
            version: import.meta.env.VERSION || '0.0.1',
            backgroundColor: '#000',
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
            scale: {
                // mode: Phaser.Scale.FIT,
                // autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            pixelArt: true,
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref={gameContainerRef} />;
};

export { GameComponent }

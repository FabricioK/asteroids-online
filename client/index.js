import './index.css';
import { JoinOrCreate, sendMessage } from './colyseus/actions';
import { init, initKeys, GameLoop } from 'kontra';

import { keyMapper, mouseMapper } from './Controls';

import {
    players,
    bullets,
    asteroids
} from './TileEngine';

import {
    onAddAsteroids,
    onAddShip,
    onAddBullets,
    onRemoveBullets,
    onRemoveShip,
    onRemoveAsteroids,

} from './Entities';


const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;


document.body.appendChild(canvas);

init()
initKeys();

JoinOrCreate("room").then(room => {
    keyMapper([
        (buffer) => {
            sendMessage(room, {
                type: 'keybinding',
                buffer
            })
        }
    ]);
    
    room.state.players.onAdd = onAddShip;
    room.state.players.onRemove = onRemoveShip;

    room.state.asteroids.onRemove = onRemoveAsteroids;
    room.state.asteroids.onAdd = onAddAsteroids;

    room.state.bullets.onAdd = onAddBullets;
    room.state.bullets.onRemove = onRemoveBullets;

    let loop = GameLoop({
        update: function () {},
        render: function () {
            for (let id in players)
                players[id].render(room.sessionId);
            for (let id in asteroids)
                asteroids[id].render();
            for (let id in bullets)
                bullets[id].render(room.sessionId);
        }
    });
    loop.start();
});
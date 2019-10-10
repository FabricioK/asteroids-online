import './index.css'
import { init, initKeys, load, GameLoop, keyPressed } from 'kontra';

import {
    onAddAsteroids,
    onAddPlayers,
    onAddBullets,
    onAddArena,
    arena,
    players,
    asteroids,
    bullets,
    onRemoveBullets,
    onRemovePlayers,
    onRemoveAsteroids,
    startArena
} from './mappers';
import { JoinOrCreate, sendMessage } from './colyseus/actions';

function component() {
    const element = document.createElement('canvas');
    element.width = 600;
    element.height = 600;
    return element;
}

document.body.appendChild(component());

let up_pressed = false;

init()
initKeys();
const foto = require('../assets/imgs/space.png');
load(foto)
    .then(assets => {
        startArena(foto);
        JoinOrCreate("room").then(room => {
            room.state.arena.onAdd = onAddArena;

            room.state.players.onAdd = onAddPlayers;
            room.state.players.onRemove = onRemovePlayers;

            room.state.asteroids.onRemove = onRemoveAsteroids;
            room.state.asteroids.onAdd = onAddAsteroids;

            room.state.bullets.onAdd = onAddBullets;
            room.state.bullets.onRemove = onRemoveBullets;

            let loop = GameLoop({
                update: function () {

                    for (let id in players) {
                        if (id == room.sessionId) {
                            arena.sx = (players[id].x - 300);
                            arena.sy = (players[id].y - 300);
                        }
                    }

                    if (keyPressed('left')) {
                        sendMessage(room, 'left');
                    }
                    else if (keyPressed('right')) {
                        sendMessage(room, 'right');
                    }

                    if (keyPressed('up') && !up_pressed) {
                        up_pressed = true;
                        sendMessage(room, 'up_pressed');
                    } else if (!keyPressed('up') && up_pressed) {
                        up_pressed = false;
                        sendMessage(room, 'up_released');
                    }

                    if (keyPressed('space'))
                        sendMessage(room, 'fire');

                    if (keyPressed('r'))
                        sendMessage(room, 'reset');
                },
                render: function () { // render the game state

                    arena.render();

                    for (let id in players)
                        players[id].render(room.sessionId);
                    for (let id in asteroids)
                        asteroids[id].render();
                    for (let id in bullets)
                        bullets[id].render(room.sessionId);
                }
            });
            loop.start();    // start the game
        });
    });
